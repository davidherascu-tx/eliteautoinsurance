import { Resend } from "resend";

import { readEnv } from "@/lib/env";
import { site } from "@/lib/site";

/** Resend's sandbox sender: always accepted, needs no DNS records of our own. */
export const SANDBOX_FROM = `${site.name} <onboarding@resend.dev>`;

/** `person@host.tld` */
const ADDRESS = /^[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+$/;
/** `person@host.tld` or `Display Name <person@host.tld>` */
const SENDER =
  /^(?:[^<>]+<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>|[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)$/;

export type MailConfig = {
  apiKey?: string;
  from: string;
  to: string;
  debug: boolean;
  /** Unusable values that were replaced with a working default. */
  warnings: string[];
};

/**
 * Resolves the mail settings once, so the quote form and the /api/quote-check
 * diagnostics can never disagree about what this deployment is using.
 */
export function resolveMailConfig(): MailConfig {
  const warnings: string[] = [];
  const rawFrom = readEnv("QUOTE_FROM_EMAIL");
  const rawTo = readEnv("QUOTE_TO_EMAIL");

  if (rawFrom && !SENDER.test(rawFrom)) {
    warnings.push(
      `QUOTE_FROM_EMAIL is not a usable sender ("${rawFrom}") — sending as ${SANDBOX_FROM} instead.`,
    );
  }

  if (rawTo && !ADDRESS.test(rawTo)) {
    warnings.push(
      `QUOTE_TO_EMAIL is not a usable address ("${rawTo}") — delivering to ${site.email} instead.`,
    );
  }

  return {
    apiKey: readEnv("RESEND_API_KEY"),
    from: rawFrom && SENDER.test(rawFrom) ? rawFrom : SANDBOX_FROM,
    to: rawTo && ADDRESS.test(rawTo) ? rawTo : site.email,
    debug: readEnv("QUOTE_DEBUG") === "1",
    warnings,
  };
}

/** The domain of `Display Name <person@host.tld>` or `person@host.tld`. */
export function senderDomain(sender: string) {
  return sender.split("@").pop()?.replace(">", "").trim().toLowerCase() ?? "";
}

export type Message = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

export type MailFailure = {
  name: string;
  message: string;
  statusCode: number | null;
};

/**
 * Provider errors a different sender address cannot fix — retrying those from
 * the sandbox address would only fail a second time.
 */
const SENDER_IRRELEVANT: ReadonlySet<string> = new Set([
  "missing_api_key",
  "invalid_api_key",
  "restricted_api_key",
  "rate_limit_exceeded",
  "daily_quota_exceeded",
  "monthly_quota_exceeded",
  "internal_server_error",
  "request_failed",
]);

async function attempt(
  resend: Resend,
  message: Message,
  from: string,
): Promise<MailFailure | null> {
  try {
    const { error } = await resend.emails.send({ from, ...message });

    return error
      ? { name: error.name, message: error.message, statusCode: error.statusCode }
      : null;
  } catch (thrown) {
    // The SDK returns errors rather than throwing, but the network can still fail.
    return {
      name: "request_failed",
      message: thrown instanceof Error ? thrown.message : String(thrown),
      statusCode: null,
    };
  }
}

/**
 * Sends `message`, retrying from the sandbox sender when the configured one is
 * refused. An unverified sending domain is a branding problem, and must never
 * cost the agency a lead.
 */
export async function sendEmail(
  resend: Resend,
  message: Message,
  from: string,
): Promise<{ failure: MailFailure | null; from: string }> {
  const failure = await attempt(resend, message, from);

  if (!failure) return { failure: null, from };
  if (from === SANDBOX_FROM || SENDER_IRRELEVANT.has(failure.name)) {
    return { failure, from };
  }

  console.warn(
    `Sender ${from} was refused (${failure.name}: ${failure.message}) — retrying as ${SANDBOX_FROM}. ` +
      `Verify ${senderDomain(from)} at https://resend.com/domains to send under your own domain.`,
  );

  return { failure: await attempt(resend, message, SANDBOX_FROM), from: SANDBOX_FROM };
}

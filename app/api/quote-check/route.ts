import { Resend } from "resend";

import { resolveMailConfig, senderDomain } from "@/lib/mailer";

/**
 * Reports what this deployment actually sees, so a failing quote form can be
 * diagnosed from the browser instead of the host's function logs.
 *
 * Answers only when QUOTE_DEBUG=1, and never returns the API key itself.
 */
export async function GET() {
  const config = resolveMailConfig();

  if (!config.debug) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (!config.apiKey) {
    return Response.json({
      ok: false,
      problem: "RESEND_API_KEY is not set on this deployment.",
      fix: "Add it, scope it to Functions/Runtime, then redeploy — variables are read at build time.",
      from: config.from,
      to: config.to,
      warnings: config.warnings,
    });
  }

  const apiKey = {
    preview: `${config.apiKey.slice(0, 6)}…${config.apiKey.slice(-4)}`,
    length: config.apiKey.length,
    looksLikeResendKey: config.apiKey.startsWith("re_"),
  };

  let domains: { name: string; status: string }[] = [];
  let account: {
    reachable: boolean;
    rejected?: { name: string; message: string };
    error?: string;
  };

  try {
    const { data, error } = await new Resend(config.apiKey).domains.list();

    if (error) {
      account = {
        reachable: true,
        rejected: { name: error.name, message: error.message },
      };
    } else {
      domains = (data?.data ?? []).map((entry) => ({
        name: entry.name,
        status: entry.status,
      }));
      account = { reachable: true };
    }
  } catch (thrown) {
    account = {
      reachable: false,
      error: thrown instanceof Error ? thrown.message : String(thrown),
    };
  }

  const domain = senderDomain(config.from);
  const verified =
    domain === "resend.dev" ||
    domains.some(
      (entry) => entry.name.toLowerCase() === domain && entry.status === "verified",
    );

  return Response.json({
    ok: verified && !account.rejected,
    sender: {
      from: config.from,
      domain,
      verified,
      note: verified
        ? "This sender is usable."
        : `${domain} is not verified in this Resend account, so mail from it is refused. The form falls back to onboarding@resend.dev, and you can verify the domain at https://resend.com/domains.`,
    },
    recipient: config.to,
    apiKey,
    account: { ...account, domains },
    warnings: config.warnings,
    reminder: "Unset QUOTE_DEBUG once the form works — it disables this endpoint.",
  });
}

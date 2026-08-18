"use server";

import { Resend } from "resend";

import { resolveMailConfig, sendEmail } from "@/lib/mailer";
import { recordSubmission } from "@/lib/rate-limit";
import {
  coverageLabel,
  parseQuoteForm,
  type ParsedQuote,
  type QuoteState,
} from "@/lib/quote";
import { site } from "@/lib/site";

/** Escapes user input before it is interpolated into the HTML email body. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildInternalEmail(values: ParsedQuote) {
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["ZIP code", values.zip || "—"],
    ["Coverage requested", coverageLabel(values.coverage)],
    ["Preferred contact", values.preferredContact],
    ["Language", values.language === "spanish" ? "Español" : "English"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0d1522;max-width:640px">
      <h2 style="margin:0 0 4px">New quote request</h2>
      <p style="margin:0 0 20px;color:#475569">Submitted from ${escapeHtml(site.url)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:bold;width:190px">${escapeHtml(label)}</td>
            <td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        values.message
          ? `<h3 style="margin:24px 0 8px">Message</h3>
             <p style="white-space:pre-wrap;margin:0;padding:12px;background:#f8fafc;border:1px solid #e2e8f0">${escapeHtml(values.message)}</p>`
          : ""
      }
    </div>`;

  const text = [
    "New quote request",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    values.message ? `Message:\n${values.message}` : "",
  ]
    .join("\n")
    .trim();

  return { html, text };
}

export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Hidden field that real users never fill in.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return {
      status: "success",
      message: "Thanks! Your request has been sent.",
      errors: {},
      values: {},
    };
  }

  const { values, errors } = parseQuoteForm(formData);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const config = resolveMailConfig();

  for (const warning of config.warnings) {
    console.error(warning);
  }

  if (!config.apiKey) {
    console.error("RESEND_API_KEY is not set — quote email was not sent.");
    return {
      status: "error",
      message: `Our online form is temporarily unavailable. Please call us at ${site.phone} or email ${site.email}.`,
      errors: {},
      values,
    };
  }

  // Checked here rather than on arrival, so a customer mistyping their email
  // does not spend their own allowance on attempts that were never sent.
  const limit = await recordSubmission();

  if (!limit.allowed) {
    console.warn("Quote request refused by rate limit:", limit.reason);
    return {
      status: "error",
      message: `We have already received a request from you. Please call us at ${site.phone} if it is urgent.`,
      errors: {},
      values,
    };
  }

  const resend = new Resend(config.apiKey);
  const internal = buildInternalEmail(values);

  const { failure } = await sendEmail(
    resend,
    {
      to: config.to,
      replyTo: values.email,
      subject: `Quote request — ${coverageLabel(values.coverage)} — ${values.name}`,
      html: internal.html,
      text: internal.text,
    },
    config.from,
  );

  if (failure) {
    console.error(
      "Quote request could not be delivered:",
      JSON.stringify({ ...failure, from: config.from, to: config.to }),
    );
    // The customer is told to call, but the lead itself must survive: these
    // details stay in the logs so the request can still be followed up.
    console.error("UNDELIVERED LEAD:", JSON.stringify(values));

    const message = `We could not send your request. Please call us at ${site.phone} or email ${site.email}.`;

    return {
      status: "error",
      message: config.debug
        ? `${message} [${failure.name}: ${failure.message}]`
        : message,
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message:
      values.language === "spanish"
        ? "¡Gracias! Recibimos su solicitud y un agente le contactará pronto."
        : "Thank you! We received your request and an agent will contact you shortly.",
    errors: {},
    values: {},
  };
}

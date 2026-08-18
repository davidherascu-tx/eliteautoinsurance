import { coverageLines } from "@/lib/site";

export type QuoteFieldName =
  | "name"
  | "email"
  | "phone"
  | "zip"
  | "coverage"
  | "preferredContact"
  | "language"
  | "message";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level validation messages, keyed by input name. */
  errors: Partial<Record<QuoteFieldName, string>>;
  /** Values echoed back so the form is not cleared on a failed submit. */
  values: Partial<Record<QuoteFieldName, string>>;
};

export const initialQuoteState: QuoteState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

export const coverageOptions = [
  ...coverageLines.map((line) => ({ value: line.slug, label: line.name })),
  { value: "multiple", label: "Several of the above / not sure yet" },
];

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
];

export const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Español" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Control characters, keeping tab, newline and carriage return. Stripped from
 * every field so nothing exotic reaches the email we build from them.
 */
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Ceiling applied while reading, before any field is even looked at. */
const MAX_INPUT = 4000;

export type ParsedQuote = Record<QuoteFieldName, string>;

/**
 * Validates the submitted form. Runs on the server — the browser's `required`
 * attributes are a convenience, not a guarantee.
 */
export function parseQuoteForm(formData: FormData): {
  values: ParsedQuote;
  errors: Partial<Record<QuoteFieldName, string>>;
} {
  const read = (field: QuoteFieldName) =>
    String(formData.get(field) ?? "")
      .slice(0, MAX_INPUT)
      .replace(CONTROL, "")
      .trim();

  /** Single-line fields additionally lose newlines — one of them is a subject. */
  const readLine = (field: QuoteFieldName) => read(field).replace(/[\r\n]+/g, " ");

  /** Falls back rather than erroring: only a tampered form can miss the list. */
  const readChoice = (
    field: QuoteFieldName,
    allowed: { value: string }[],
  ) => {
    const value = readLine(field);
    return allowed.some((option) => option.value === value)
      ? value
      : allowed[0].value;
  };

  const values: ParsedQuote = {
    name: readLine("name"),
    email: readLine("email"),
    phone: readLine("phone"),
    zip: readLine("zip"),
    coverage: readLine("coverage"),
    preferredContact: readChoice("preferredContact", contactMethods),
    language: readChoice("language", languageOptions),
    message: read("message"),
  };

  const errors: Partial<Record<QuoteFieldName, string>> = {};

  if (values.name.length < 2 || values.name.length > 80) {
    errors.name = "Please enter your full name.";
  }

  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Please enter a 10-digit phone number.";
  }

  if (values.zip && !/^\d{5}(-\d{4})?$/.test(values.zip)) {
    errors.zip = "Please enter a 5-digit ZIP code.";
  }

  if (!coverageOptions.some((option) => option.value === values.coverage)) {
    errors.coverage = "Please choose the coverage you need.";
  }

  if (values.message.length > 2000) {
    errors.message = "Please keep your message under 2000 characters.";
  }

  return { values, errors };
}

export function coverageLabel(value: string) {
  return (
    coverageOptions.find((option) => option.value === value)?.label ?? value
  );
}

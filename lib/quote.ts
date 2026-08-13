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
    String(formData.get(field) ?? "").trim();

  const values: ParsedQuote = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    zip: read("zip"),
    coverage: read("coverage"),
    preferredContact: read("preferredContact") || "phone",
    language: read("language") || "english",
    message: read("message"),
  };

  const errors: Partial<Record<QuoteFieldName, string>> = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) {
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

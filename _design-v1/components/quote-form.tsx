"use client";

import { useActionState, useId } from "react";

import { submitQuote } from "@/lib/actions";
import {
  contactMethods,
  coverageOptions,
  initialQuoteState,
  languageOptions,
  type QuoteFieldName,
  type QuoteState,
} from "@/lib/quote";
import { CheckIcon } from "@/components/ui";

const inputClass =
  "block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function QuoteForm({ defaultCoverage }: { defaultCoverage?: string }) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(
    submitQuote,
    initialQuoteState,
  );
  const formId = useId();

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-600">
          <CheckIcon className="size-8 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-ink-900">
          Request received
        </h3>
        <p className="mt-3 text-slate-700">{state.message}</p>
      </div>
    );
  }

  const value = (field: QuoteFieldName) => state.values[field];

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      {/* Honeypot — hidden from users, catches naive bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Full name"
          required
          autoComplete="name"
          placeholder="Maria Garcia"
          defaultValue={value("name")}
          error={state.errors.name}
        />
        <Field
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          required
          autoComplete="tel"
          placeholder="(713) 555-0134"
          defaultValue={value("phone")}
          error={state.errors.phone}
        />
        <Field
          id={`${formId}-email`}
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={value("email")}
          error={state.errors.email}
        />
        <Field
          id={`${formId}-zip`}
          name="zip"
          label="ZIP code"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="77017"
          defaultValue={value("zip")}
          error={state.errors.zip}
        />
      </div>

      <div>
        <Label htmlFor={`${formId}-coverage`} required>
          What do you need covered?
        </Label>
        <select
          id={`${formId}-coverage`}
          name="coverage"
          required
          defaultValue={value("coverage") ?? defaultCoverage ?? ""}
          aria-invalid={state.errors.coverage ? true : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Select coverage…
          </option>
          {coverageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError message={state.errors.coverage} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${formId}-preferred`}>
            Best way to reach you
          </Label>
          <select
            id={`${formId}-preferred`}
            name="preferredContact"
            defaultValue={value("preferredContact") ?? "phone"}
            className={inputClass}
          >
            {contactMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor={`${formId}-language`}>Preferred language</Label>
          <select
            id={`${formId}-language`}
            name="language"
            defaultValue={value("language") ?? "english"}
            className={inputClass}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor={`${formId}-message`}>
          Anything else we should know?
        </Label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Vehicle year and model, current carrier, renewal date, questions…"
          defaultValue={value("message")}
          aria-invalid={state.errors.message ? true : undefined}
          className={inputClass}
        />
        <FieldError message={state.errors.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Request my free quote"}
      </button>

      <p className="text-center text-sm text-slate-500">
        No obligation. We never sell your information.
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-ink-900"
    >
      {children}
      {required ? <span className="ml-1 text-red-600">*</span> : null}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: QuoteFieldName;
  label: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        className={inputClass}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

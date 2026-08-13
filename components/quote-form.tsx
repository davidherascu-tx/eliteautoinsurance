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
import { ArrowIcon, CheckIcon } from "@/components/ui";

const fieldClass =
  "block w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-white transition-colors placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/25 aria-[invalid=true]:border-red-400/50";

export function QuoteForm({ defaultCoverage }: { defaultCoverage?: string }) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(
    submitQuote,
    initialQuoteState,
  );
  const formId = useId();

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-400/25 bg-brand-500/10 p-10 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-600 shadow-lg shadow-brand-600/40">
          <CheckIcon className="size-9 text-white" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">Request received</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{state.message}</p>
      </div>
    );
  }

  const value = (field: QuoteFieldName) => state.values[field];

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
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
          className={fieldClass}
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
          <Label htmlFor={`${formId}-preferred`}>Best way to reach you</Label>
          <select
            id={`${formId}-preferred`}
            name="preferredContact"
            defaultValue={value("preferredContact") ?? "phone"}
            className={fieldClass}
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
            className={fieldClass}
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
          className={fieldClass}
        />
        <FieldError message={state.errors.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {pending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            Request my free quote
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-500">
        No obligation. We never sell your information.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 animate-spin"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
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
      className="mb-2 block text-sm font-semibold text-slate-200"
    >
      {children}
      {required ? <span className="ml-1 text-brand-400">*</span> : null}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-sm text-red-300">
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
        className={fieldClass}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

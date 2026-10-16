"use client";

import { ResumeData } from "@/lib/types";
import { Strings } from "@/lib/i18n";
import PhotoUpload from "../PhotoUpload";
import PhoneInput from "../PhoneInput";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
            : "border-zinc-300 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:focus:border-zinc-300",
        ].join(" ")}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

export default function StepPersonal({
  data,
  update,
  t,
  errors,
}: {
  data: ResumeData;
  update: (patch: Partial<ResumeData>) => void;
  t: Strings;
  errors: Record<string, string>;
}) {
  const inputCls =
    "w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300";
  return (
    <div className="step-enter space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.fullName} value={data.fullName} onChange={(v) => update({ fullName: v })} placeholder={t.fullNamePh} error={errors.fullName} />
        <Field
          label={t.position}
          value={data.position}
          onChange={(v) => update({ position: v })}
          placeholder={t.positionPh}
          error={errors.position}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.city} value={data.city} onChange={(v) => update({ city: v })} placeholder={t.cityPh} />
        <PhoneInput label={t.phone} value={data.phone} onChange={(v) => update({ phone: v })} error={errors.phone} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.telegram} value={data.telegram} onChange={(v) => update({ telegram: v })} placeholder="@username" />
        <Field label={t.email} value={data.email} onChange={(v) => update({ email: v })} placeholder="you@mail.com" type="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.github} value={data.github} onChange={(v) => update({ github: v })} placeholder="https://github.com/..." />
        <Field label={t.linkedin} value={data.linkedin} onChange={(v) => update({ linkedin: v })} placeholder="https://linkedin.com/in/..." />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.portfolio} value={data.portfolio} onChange={(v) => update({ portfolio: v })} placeholder="https://..." />
        <Field
          label={t.extra}
          value={data.extraLink}
          onChange={(v) => update({ extraLink: v })}
          placeholder="https://youtube.com/@..."
        />
      </div>
      <PhotoUpload photo={data.photo} onChange={(photo) => update({ photo })} t={t} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">{t.aboutLabel}</span>
        <textarea
          value={data.summary}
          onChange={(e) => update({ summary: e.target.value })}
          placeholder={t.aboutPh}
          rows={4}
          className={`${inputCls} resize-y`}
        />
        <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{t.aboutHint}</span>
      </label>
    </div>
  );
}

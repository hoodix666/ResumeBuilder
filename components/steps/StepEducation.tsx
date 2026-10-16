"use client";

import { ResumeData } from "@/lib/types";
import { Strings } from "@/lib/i18n";

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <input
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

export default function StepEducation({
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
  return (
    <div className="step-enter space-y-4">
      <Field
        label={t.institution}
        value={data.institution}
        onChange={(v) => update({ institution: v })}
        placeholder={t.institutionPh}
        error={errors.institution}
      />
      <Field
        label={t.specialty}
        value={data.specialty}
        onChange={(v) => update({ specialty: v })}
        placeholder={t.specialtyPh}
        error={errors.specialty}
      />
      <Field
        label={t.years}
        value={data.studyYears}
        onChange={(v) => update({ studyYears: v })}
        placeholder={t.yearsPh}
      />
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
        <p className="font-medium text-zinc-800 dark:text-zinc-100">{t.eduTipTitle}</p>
        <p className="mt-1 text-[13px] leading-relaxed">{t.eduTipText}</p>
      </div>
    </div>
  );
}

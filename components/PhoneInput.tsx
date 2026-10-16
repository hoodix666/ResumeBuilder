"use client";

import { formatPhone } from "@/lib/phone";

/** Строгий ввод телефона по маске +7 (777) 123-45-67. */
export default function PhoneInput({
  label,
  value,
  onChange,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </span>
      <input
        value={value}
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        onChange={(e) => {
          // Разрешаем только цифры и форматируем под маску; пустое поле — очистка
          const raw = e.target.value;
          if (raw.trim() === "") {
            onChange("");
            return;
          }
          onChange(formatPhone(raw));
        }}
        onKeyDown={(e) => {
          // Backspace по закрывающей скобке/дефису удаляет цифру, а не символ маски
          if (e.key === "Backspace") {
            const el = e.currentTarget;
            const pos = el.selectionStart ?? value.length;
            const prev = value[pos - 1];
            if (prev && /\D/.test(prev)) {
              e.preventDefault();
              const digits = value.replace(/\D/g, "").slice(0, -1);
              onChange(digits ? formatPhone(digits) : "");
            }
          }
        }}
        className={[
          "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm tracking-wide outline-none transition placeholder:text-zinc-400 dark:bg-zinc-900 dark:placeholder:text-zinc-500",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
            : "border-zinc-300 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:focus:border-zinc-300",
        ].join(" ")}
      />
      {error ? (
        <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>
      ) : null}
    </label>
  );
}

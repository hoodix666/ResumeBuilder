"use client";

import { useState } from "react";

export default function TagInput({
  label,
  hint,
  values,
  onChange,
  suggestions = [],
  placeholder = "Введите и нажмите Enter",
  removeLabel = "Удалить",
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (v: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  removeLabel?: string;
}) {
  const [input, setInput] = useState("");

  function add(raw: string) {
    const val = raw.trim().replace(/,+$/, "");
    if (!val) return;
    if (values.some((v) => v.toLowerCase() === val.toLowerCase())) {
      setInput("");
      return;
    }
    onChange([...values, val]);
    setInput("");
  }

  function remove(idx: number) {
    onChange(values.filter((_, i) => i !== idx));
  }

  const filtered = suggestions.filter(
    (s) =>
      input.trim().length > 0 &&
      s.toLowerCase().includes(input.trim().toLowerCase()) &&
      !values.some((v) => v.toLowerCase() === s.toLowerCase())
  );

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</label>
      {hint && <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>}
      <div className="rounded-xl border border-zinc-300 bg-white p-2 transition focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-zinc-300">
        <div className="flex flex-wrap gap-1.5">
          {values.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-900 py-1 pl-3 pr-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`${removeLabel} ${tag}`}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/40 dark:bg-zinc-900/10 dark:hover:bg-zinc-900/25"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                add(input);
              } else if (e.key === "Backspace" && input === "" && values.length > 0) {
                remove(values.length - 1);
              }
            }}
            onBlur={() => {
              if (input.trim()) add(input);
            }}
            placeholder={values.length === 0 ? placeholder : ""}
            className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>
      </div>
      {filtered.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {filtered.slice(0, 8).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

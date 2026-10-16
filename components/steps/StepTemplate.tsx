"use client";

import { ResumeData, TemplateId } from "@/lib/types";
import { Strings } from "@/lib/i18n";

const SIMPLE: TemplateId[] = ["minimal", "simple"];
const FANCY: TemplateId[] = ["modern", "creative", "gradient", "elegant"];

export const ACCENTS = [
  "#111827",
  "#1f2937",
  "#2563eb",
  "#4f46e5",
  "#0891b2",
  "#0d9488",
  "#059669",
  "#7c3aed",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#b45309",
];

function MiniThumb({ id, accent }: { id: TemplateId; accent: string }) {
  if (id === "modern") {
    return (
      <div className="flex h-24 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="w-1/3" style={{ backgroundColor: accent }} />
        <div className="flex-1 space-y-1.5 bg-white p-2">
          <div className="h-2 w-3/4 rounded bg-zinc-800" />
          <div className="h-1.5 w-1/2 rounded bg-zinc-300" />
          <div className="h-1.5 w-full rounded bg-zinc-200" />
          <div className="h-1.5 w-full rounded bg-zinc-200" />
        </div>
      </div>
    );
  }
  if (id === "minimal") {
    return (
      <div className="h-24 space-y-1.5 rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700">
        <div className="mx-auto h-2 w-1/2 rounded bg-zinc-800" />
        <div className="mx-auto h-px w-full bg-zinc-300" />
        <div className="h-1.5 w-full rounded bg-zinc-200" />
        <div className="h-1.5 w-full rounded bg-zinc-200" />
        <div className="h-1.5 w-2/3 rounded bg-zinc-200" />
      </div>
    );
  }
  if (id === "simple") {
    return (
      <div className="h-24 space-y-1.5 rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-zinc-700">
        <div className="h-2 w-2/3 rounded bg-zinc-800" />
        <div className="h-1 w-1/3 rounded bg-zinc-300" />
        <div className="mt-1 flex gap-1">
          <div className="h-3.5 w-10 rounded-full border border-zinc-300" />
          <div className="h-3.5 w-10 rounded-full border border-zinc-300" />
          <div className="h-3.5 w-10 rounded-full border border-zinc-300" />
        </div>
        <div className="h-1.5 w-full rounded bg-zinc-100" />
      </div>
    );
  }
  if (id === "gradient") {
    return (
      <div className="h-24 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="h-3/5 p-2" style={{ background: `linear-gradient(135deg, ${accent}, #0f172a)` }}>
          <div className="h-2 w-1/2 rounded bg-white" />
          <div className="mt-1.5 flex gap-1">
            <div className="h-3 w-8 rounded bg-white/40" />
            <div className="h-3 w-8 rounded bg-white/40" />
            <div className="h-3 w-8 rounded bg-white/40" />
          </div>
        </div>
        <div className="space-y-1 bg-white p-2">
          <div className="h-1.5 rounded bg-zinc-200" style={{ borderLeft: `3px solid ${accent}` }} />
          <div className="h-1.5 w-2/3 rounded bg-zinc-200" />
        </div>
      </div>
    );
  }
  if (id === "elegant") {
    return (
      <div className="h-24 rounded-lg border bg-white p-1.5 dark:border-zinc-700" style={{ borderColor: accent }}>
        <div className="flex h-full flex-col items-center justify-center gap-1 border px-2" style={{ borderColor: accent }}>
          <div className="font-serif text-[11px] font-bold">Aa</div>
          <div className="h-px w-10" style={{ backgroundColor: accent }} />
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-2/3 rounded bg-zinc-200" />
        </div>
      </div>
    );
  }
  // creative
  return (
    <div className="h-24 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="h-1/2 bg-[#0f172a] p-2">
        <div className="h-2 w-1/2 rounded bg-white" />
        <div className="mt-1.5 flex gap-1">
          <div className="h-3 w-8 rounded" style={{ backgroundColor: accent }} />
          <div className="h-3 w-8 rounded bg-zinc-700" />
          <div className="h-3 w-8 rounded bg-zinc-700" />
        </div>
      </div>
      <div className="space-y-1 bg-white p-2">
        <div className="h-1.5 w-full rounded bg-zinc-200" />
        <div className="h-1.5 w-2/3 rounded bg-zinc-200" />
      </div>
    </div>
  );
}

function TemplateCard({
  id,
  name,
  selected,
  accent,
  onPick,
  choose,
  chosen,
}: {
  id: TemplateId;
  name: string;
  selected: boolean;
  accent: string;
  onPick: () => void;
  choose: string;
  chosen: string;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={[
        "rounded-2xl border-2 bg-white p-3 text-left transition active:scale-[0.98] dark:bg-zinc-900",
        selected
          ? "border-zinc-900 shadow-lg dark:border-zinc-100"
          : "border-zinc-200 hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:hover:border-zinc-500",
      ].join(" ")}
    >
      <MiniThumb id={id} accent={accent} />
      <p className="mt-2.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">{name}</p>
      <p
        className={[
          "mt-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold",
          selected ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
        ].join(" ")}
      >
        {selected ? chosen : choose}
      </p>
    </button>
  );
}

export default function StepTemplate({
  data,
  update,
  t,
}: {
  data: ResumeData;
  update: (patch: Partial<ResumeData>) => void;
  t: Strings;
}) {
  const names: Record<TemplateId, string> = {
    modern: t.tplModernName,
    minimal: t.tplMinimalName,
    creative: t.tplCreativeName,
    simple: t.tplSimpleName,
    gradient: t.tplGradientName,
    elegant: t.tplElegantName,
  };

  function group(ids: TemplateId[], title: string, desc: string) {
    return (
      <div>
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mb-2.5 text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ids.map((id) => (
            <TemplateCard
              key={id}
              id={id}
              name={names[id]}
              selected={data.template === id}
              accent={data.accent}
              onPick={() => update({ template: id })}
              choose={t.choose}
              chosen={t.chosen}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="step-enter space-y-6">
      {group(SIMPLE, t.groupSimple, t.groupSimpleDesc)}
      {group(FANCY, t.groupFancy, t.groupFancyDesc)}

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{t.accent}</p>
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ accent: c })}
              title={c}
              aria-label={c}
              className={[
                "h-9 w-9 rounded-full transition hover:scale-110 active:scale-95",
                data.accent === c
                  ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100 dark:ring-offset-zinc-900"
                  : "ring-1 ring-zinc-300 dark:ring-zinc-600",
              ].join(" ")}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{t.accentNote}</p>
      </div>
    </div>
  );
}

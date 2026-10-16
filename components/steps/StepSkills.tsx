"use client";

import { ResumeData } from "@/lib/types";
import { Strings } from "@/lib/i18n";
import TagInput from "../TagInput";
import { HARD_SKILL_SUGGESTIONS, SOFT_SKILL_SUGGESTIONS, SOFT_SKILL_SUGGESTIONS_KK } from "@/lib/sampleData";

export default function StepSkills({
  data,
  update,
  t,
  lang,
}: {
  data: ResumeData;
  update: (patch: Partial<ResumeData>) => void;
  t: Strings;
  lang: "ru" | "kk";
}) {
  return (
    <div className="step-enter space-y-6">
      <TagInput
        label={t.hardLabel}
        hint={t.hardHint}
        values={data.hardSkills}
        onChange={(hardSkills) => update({ hardSkills })}
        suggestions={HARD_SKILL_SUGGESTIONS}
        placeholder={t.hardPh}
        removeLabel={t.tagRemove}
      />
      <TagInput
        label={t.softLabel}
        hint={t.softHint}
        values={data.softSkills}
        onChange={(softSkills) => update({ softSkills })}
        suggestions={lang === "kk" ? SOFT_SKILL_SUGGESTIONS_KK : SOFT_SKILL_SUGGESTIONS}
        placeholder={t.softPh}
        removeLabel={t.tagRemove}
      />
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-[13px] leading-relaxed text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
        {t.skillsNote}
      </div>
    </div>
  );
}

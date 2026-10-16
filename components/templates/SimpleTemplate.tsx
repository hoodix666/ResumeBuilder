"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

/** 4. Simple — простой и воздушный: одна колонка, ничего лишнего. Всегда строгий. */
export default function SimpleTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());
  const links = [data.github, data.linkedin, data.portfolio, data.extraLink].filter((v) => v.trim());

  return (
    <div className="min-h-[1123px] w-full bg-white px-12 py-10" style={{ color: "#27272a" }}>
      <header className="flex items-start gap-6">
        {data.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.photo}
            alt={data.fullName}
            className="h-24 w-24 shrink-0 rounded-2xl border border-zinc-200 object-cover"
          />
        )}
        <div className="min-w-0">
          <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-zinc-900">
            {val(data.fullName, r.yourName)}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-zinc-500">
            {val(data.position, r.yourPosition)}
          </p>
          {contacts.length > 0 && (
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">{contacts.join("  ·  ")}</p>
          )}
          {links.length > 0 && (
            <p className="mt-1 text-[11.5px] text-zinc-500">
              {links.map((l, i) => (
                <span key={i}>
                  <a href={l.trim()} className="underline underline-offset-2">
                    {l.trim().replace(/^https?:\/\//, "")}
                  </a>
                  {i < links.length - 1 ? "  ·  " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </header>

      <div className="my-6 h-px w-full bg-zinc-200" />

      <section>
        <h2 className="text-[13px] font-bold text-zinc-900">{r.about}</h2>
        <p className="mt-1.5 max-w-[62ch] text-[12.5px] leading-relaxed text-zinc-600">
          {val(data.summary, r.goalFallback)}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-[13px] font-bold text-zinc-900">{r.hard}</h2>
        {data.hardSkills.length === 0 ? (
          <p className="mt-1.5 text-[12px] text-zinc-400">{r.dash}</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {data.hardSkills.map((s, i) => (
              <span
                key={i}
                className="rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {data.softSkills.length > 0 && (
          <p className="mt-2 text-[12px] text-zinc-500">{data.softSkills.join(" · ")}</p>
        )}
      </section>

      <div className="my-6 h-px w-full bg-zinc-200" />

      <section>
        <h2 className="text-[13px] font-bold text-zinc-900">{r.projectsMinimal}</h2>
        {data.projects.length === 0 ? (
          <p className="mt-1.5 text-[12px] text-zinc-400">{r.addProjectsNote}</p>
        ) : (
          <div className="mt-3 space-y-5">
            {data.projects.map((p, i) => (
              <div key={p.id} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="text-[13px] font-bold text-zinc-900">{val(p.title, r.dash)}</h3>
                    {p.link.trim() && (
                      <a href={p.link.trim()} className="text-[11px] text-zinc-500 underline underline-offset-2">
                        {p.link.trim().replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  {p.stack.trim() && <p className="mt-0.5 text-[11px] text-zinc-500">{p.stack}</p>}
                  {p.description.trim() && (
                    <p className="mt-1 max-w-[62ch] text-[12px] leading-relaxed text-zinc-600">{p.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="my-6 h-px w-full bg-zinc-200" />

      <section>
        <h2 className="text-[13px] font-bold text-zinc-900">{r.education}</h2>
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[13px] font-semibold text-zinc-800">{val(data.institution, r.dash)}</p>
          <p className="text-[11.5px] text-zinc-500">{val(data.studyYears, r.dash)}</p>
        </div>
        <p className="mt-0.5 text-[12px] text-zinc-600">{val(data.specialty, r.dash)}</p>
      </section>
    </div>
  );
}

"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

/** 2. Minimal — строгий классический стиль для официальной подачи. */
export default function MinimalTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());
  const links = [data.github, data.linkedin, data.portfolio, data.extraLink].filter((v) => v.trim());

  return (
    <div className="min-h-[1123px] w-full bg-white p-10" style={{ color: "#18181b" }}>
      {/* Header */}
      <header className="border-b-2 border-zinc-900 pb-4 text-center">
        <div className="flex items-center justify-center gap-5">
          {data.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt={data.fullName}
              className="h-20 w-20 rounded-full border border-zinc-300 object-cover"
            />
          )}
          <div className={data.photo ? "text-left" : "text-center"}>
            <h1 className="text-[26px] font-bold leading-tight tracking-tight">
              {val(data.fullName, r.yourName)}
            </h1>
            <p className="mt-1 text-[14px] font-medium text-zinc-700">
              {val(data.position, r.yourPosition)}
            </p>
          </div>
        </div>
        {contacts.length > 0 && (
          <p className="mt-3 text-[11.5px] text-zinc-700">{contacts.join("  •  ")}</p>
        )}
        {links.length > 0 && (
          <p className="mt-1 text-[11px] text-zinc-600">
            {links.map((l, i) => {
              const short = l.trim().replace(/^https?:\/\//, "");
              return (
                <span key={i}>
                  <a href={l.trim()} className="underline">
                    {short}
                  </a>
                  {i < links.length - 1 ? "  •  " : ""}
                </span>
              );
            })}
          </p>
        )}
      </header>

      <section className="mt-6">
        <h2 className="border-b border-zinc-300 pb-1 text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-900">
          {r.about}
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-800">
          {val(data.summary, r.goalFallback)}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="border-b border-zinc-300 pb-1 text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-900">
          {r.education}
        </h2>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <p className="text-[13px] font-semibold">{val(data.institution, r.dash)}</p>
          <p className="shrink-0 text-[11.5px] text-zinc-600">{val(data.studyYears, r.dash)}</p>
        </div>
        <p className="mt-0.5 text-[12px] text-zinc-700">{val(data.specialty, r.dash)}</p>
      </section>

      <section className="mt-6">
        <h2 className="border-b border-zinc-300 pb-1 text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-900">
          {r.hard} / {r.soft}
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase text-zinc-500">{r.hard}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-zinc-800">
              {data.hardSkills.length ? data.hardSkills.join(", ") : r.dash}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-zinc-500">{r.soft}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-zinc-800">
              {data.softSkills.length ? data.softSkills.join(", ") : r.dash}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="border-b border-zinc-300 pb-1 text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-900">
          {r.projectsMinimal}
        </h2>
        {data.projects.length === 0 ? (
          <p className="mt-2 text-[12px] text-zinc-500">{r.addProjectsNote}</p>
        ) : (
          <div className="mt-2 space-y-4">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[13px] font-bold">{val(p.title, r.dash)}</h3>
                  {p.link.trim() && (
                    <a href={p.link.trim()} className="text-[11px] text-zinc-600 underline">
                      {p.link.trim().replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
                {p.stack.trim() && (
                  <p className="mt-0.5 text-[11px] italic text-zinc-600">{p.stack}</p>
                )}
                {p.description.trim() && (
                  <p className="mt-1 text-[12px] leading-relaxed text-zinc-800">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

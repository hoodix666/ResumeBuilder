"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

/** 6. Elegant — премиальный: serif-типографика, тонкая двойная рамка, сдержанная роскошь. */
export default function ElegantTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const accent = data.accent && data.accent !== "#111827" ? data.accent : "#b45309";
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());
  const links = [data.github, data.linkedin, data.portfolio, data.extraLink].filter((v) => v.trim());

  return (
    <div className="min-h-[1123px] w-full bg-white p-8" style={{ color: "#292524" }}>
      <div className="border p-1.5" style={{ borderColor: accent }}>
        <div className="border px-8 py-8" style={{ borderColor: accent }}>
          <header className="text-center">
            {data.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photo}
                alt={data.fullName}
                className="mx-auto h-24 w-24 rounded-full border-2 object-cover"
                style={{ borderColor: accent }}
              />
            )}
            <h1 className="mt-3 font-serif text-[32px] font-bold leading-tight tracking-wide">
              {val(data.fullName, r.yourName)}
            </h1>
            <p className="mt-1 font-serif text-[15px] italic" style={{ color: accent }}>
              {val(data.position, r.yourPosition)}
            </p>
            <div className="mx-auto mt-3 flex max-w-[220px] items-center gap-2">
              <span className="h-px flex-1" style={{ backgroundColor: accent }} />
              <span className="text-[10px]" style={{ color: accent }}>◆</span>
              <span className="h-px flex-1" style={{ backgroundColor: accent }} />
            </div>
            {contacts.length > 0 && (
              <p className="mt-3 text-[11.5px] tracking-wide text-stone-600">{contacts.join("  ·  ")}</p>
            )}
            {links.length > 0 && (
              <p className="mt-1 text-[11px] text-stone-500">
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
          </header>

          <section className="mt-6">
            <h2
              className="text-center font-serif text-[13px] font-bold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {r.about}
            </h2>
            <p className="mx-auto mt-2 max-w-[60ch] text-center font-serif text-[12.5px] italic leading-relaxed text-stone-600">
              {val(data.summary, r.goalFallback)}
            </p>
          </section>

          <div className="mt-6 grid grid-cols-[1fr_200px] gap-8">
            <main>
              <h2
                className="font-serif text-[13px] font-bold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {r.projectsMinimal}
              </h2>
              {data.projects.length === 0 ? (
                <p className="mt-2 text-[12px] text-stone-400">{r.addProjectsNote}</p>
              ) : (
                <div className="mt-3 space-y-4">
                  {data.projects.map((p) => (
                    <div key={p.id} className="border-l-2 pl-3" style={{ borderColor: accent }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-[13.5px] font-bold">{val(p.title, r.dash)}</h3>
                        {p.link.trim() && (
                          <a href={p.link.trim()} className="text-[10.5px] text-stone-500 underline">
                            {p.link.trim().replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                      {p.stack.trim() && (
                        <p className="mt-0.5 font-serif text-[11px] italic text-stone-500">{p.stack}</p>
                      )}
                      {p.description.trim() && (
                        <p className="mt-1 text-[12px] leading-relaxed text-stone-600">{p.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </main>

            <aside className="space-y-5">
              <div>
                <h3
                  className="font-serif text-[12px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: accent }}
                >
                  {r.education}
                </h3>
                <p className="mt-1.5 font-serif text-[12.5px] font-bold leading-snug">
                  {val(data.institution, r.dash)}
                </p>
                <p className="mt-1 text-[11px] text-stone-600">{val(data.specialty, r.dash)}</p>
                <p className="mt-1 text-[11px] italic text-stone-400">{val(data.studyYears, r.dash)}</p>
              </div>
              <div>
                <h3
                  className="font-serif text-[12px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: accent }}
                >
                  {r.hard}
                </h3>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-stone-600">
                  {data.hardSkills.length ? data.hardSkills.join(" · ") : r.dash}
                </p>
              </div>
              <div>
                <h3
                  className="font-serif text-[12px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: accent }}
                >
                  {r.soft}
                </h3>
                <p className="mt-1.5 text-[11.5px] italic leading-relaxed text-stone-600">
                  {data.softSkills.length ? data.softSkills.join(" · ") : r.dash}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

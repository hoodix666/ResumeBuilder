"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

/** 5. Gradient Pro — навороченный: градиентный hero, стеклянные теги, карточки проектов. */
export default function GradientTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const accent = data.accent && data.accent !== "#111827" ? data.accent : "#4f46e5";
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());
  const links = [
    { label: "GitHub", v: data.github },
    { label: "LinkedIn", v: data.linkedin },
    { label: "Portfolio", v: data.portfolio },
    { label: "Video", v: data.extraLink },
  ].filter((l) => l.v.trim());

  return (
    <div className="min-h-[1123px] w-full bg-white" style={{ color: "#18181b" }}>
      <header
        className="relative overflow-hidden p-8 text-white"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, #0f172a 90%)` }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
        <div className="relative flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              {r.graduateBadge}
            </p>
            <h1 className="mt-3 text-[30px] font-black leading-none tracking-tight">
              {val(data.fullName, r.yourName)}
            </h1>
            <p className="mt-2 text-[14px] font-medium text-white/85">
              {val(data.position, r.yourPosition)}
            </p>
            {contacts.length > 0 && (
              <p className="mt-2 text-[11.5px] text-white/75">{contacts.join("  •  ")}</p>
            )}
            {links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {links.map((l, i) => (
                  <a
                    key={i}
                    href={l.v.trim()}
                    className="rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-medium backdrop-blur transition hover:bg-white/30"
                  >
                    {l.label}: {l.v.trim().replace(/^https?:\/\//, "")}
                  </a>
                ))}
              </div>
            )}
          </div>
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt={data.fullName}
              className="h-28 w-28 shrink-0 rounded-3xl border-2 border-white/60 object-cover shadow-2xl"
            />
          ) : (
            <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-2 border-dashed border-white/40 text-xs text-white/60 sm:flex">
              Фото
            </div>
          )}
        </div>

        <div className="relative mt-5">
          {data.hardSkills.length === 0 ? (
            <p className="text-[11px] text-white/60">{r.creativeSkillsHint}</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {data.hardSkills.map((s, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white shadow backdrop-blur transition hover:bg-white/30"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_230px] gap-6 p-8">
        <main>
          <h2 className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.18em]">
            <span className="inline-block h-4 w-1.5 rounded-full" style={{ background: accent }} />
            <span style={{ color: accent }}>{r.projects}</span>
          </h2>
          {data.projects.length === 0 ? (
            <p className="mt-2 text-[12px] text-zinc-500">{r.addProjectsNote}</p>
          ) : (
            <div className="mt-3 space-y-3">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50 to-white p-4 shadow-sm"
                  style={{ borderLeft: `4px solid ${accent}` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-extrabold text-zinc-900">{val(p.title, r.dash)}</h3>
                    {p.link.trim() && (
                      <a href={p.link.trim()} className="text-[11px] font-semibold underline" style={{ color: accent }}>
                        ↗ {p.link.trim().replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  {p.stack.trim() && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {p.stack.split(",").map((chip, i) => (
                        <span
                          key={i}
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {chip.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.description.trim() && (
                    <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-700">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2 className="mt-6 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.18em]">
            <span className="inline-block h-4 w-1.5 rounded-full" style={{ background: accent }} />
            <span style={{ color: accent }}>{r.about}</span>
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-700">
            {val(data.summary, r.aboutFallback)}
          </p>
        </main>

        <aside className="space-y-4">
          <div
            className="rounded-2xl p-4 text-white shadow-lg"
            style={{ background: `linear-gradient(160deg, ${accent}, #0f172a)` }}
          >
            <h3 className="text-[11px] font-black uppercase tracking-widest text-white/80">{r.education}</h3>
            <p className="mt-1.5 text-[12px] font-bold leading-snug">{val(data.institution, r.dash)}</p>
            <p className="mt-1 text-[11px] text-white/85">{val(data.specialty, r.dash)}</p>
            <p className="mt-1 text-[11px] font-semibold text-white/70">{val(data.studyYears, r.dash)}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500">{r.soft}</h3>
            {data.softSkills.length === 0 ? (
              <p className="mt-1.5 text-[11px] text-zinc-400">{r.dash}</p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.softSkills.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border px-2 py-0.5 text-[10.5px] font-semibold"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

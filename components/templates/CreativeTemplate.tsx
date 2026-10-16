"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

/** 3. Creative / IT — тёмная контрастная тема с тегами и акцентом на навыки. */
export default function CreativeTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const accent = data.accent && data.accent !== "#111827" ? data.accent : "#2563eb";
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());
  const links = [
    { label: "GitHub", v: data.github },
    { label: "LinkedIn", v: data.linkedin },
    { label: "Portfolio", v: data.portfolio },
    { label: "Video", v: data.extraLink },
  ].filter((l) => l.v.trim());

  return (
    <div className="min-h-[1123px] w-full bg-white" style={{ color: "#18181b" }}>
      {/* Dark hero */}
      <header className="p-7 text-white" style={{ backgroundColor: "#0f172a" }}>
        <div className="flex items-center justify-between gap-5">
          <div className="min-w-0">
            <p
              className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: accent, color: "#ffffff" }}
            >
              {r.graduateBadge}
            </p>
            <h1 className="mt-2 truncate text-[26px] font-extrabold leading-tight">
              {val(data.fullName, r.yourName)}
            </h1>
            <p className="mt-1 text-[14px] font-medium text-zinc-300">
              {val(data.position, r.yourPosition)}
            </p>
            {contacts.length > 0 && (
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-300">{contacts.join("  •  ")}</p>
            )}
            {links.length > 0 && (
              <p className="mt-1 text-[11px]">
                {links.map((l, i) => (
                  <span key={i} className="mr-3">
                    <span className="text-zinc-400">{l.label}: </span>
                    <a href={l.v.trim()} className="underline" style={{ color: "#ffffff" }}>
                      {l.v.trim().replace(/^https?:\/\//, "")}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt={data.fullName}
              className="h-24 w-24 shrink-0 rounded-2xl border-2 object-cover"
              style={{ borderColor: accent }}
            />
          ) : (
            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-600 text-xs text-zinc-400 sm:flex">
              Фото
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4">
          {data.hardSkills.length === 0 ? (
            <p className="text-[11px] text-zinc-500">{r.creativeSkillsHint}</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {data.hardSkills.map((s, i) => (
                <span
                  key={i}
                  className="rounded-md px-2 py-1 text-[10.5px] font-semibold"
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#ffffff",
                    border: `1px solid ${accent}`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_220px] gap-6 p-7">
        <main>
          <h2
            className="text-[12px] font-bold uppercase tracking-[0.15em]"
            style={{ color: accent }}
          >
            {"// " + r.projects.toLowerCase()}
          </h2>
          {data.projects.length === 0 ? (
            <p className="mt-2 text-[12px] text-zinc-500">{r.addProjectsNote}</p>
          ) : (
            <div className="mt-3 space-y-3">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold">{val(p.title, r.dash)}</h3>
                    {p.link.trim() && (
                      <a
                        href={p.link.trim()}
                        className="text-[11px] font-medium underline"
                        style={{ color: accent }}
                      >
                        {p.link.trim().replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  {p.stack.trim() && (
                    <p
                      className="mt-1 inline-block rounded px-1.5 py-0.5 font-mono text-[10.5px]"
                      style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                    >
                      {p.stack}
                    </p>
                  )}
                  {p.description.trim() && (
                    <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-800">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2
            className="mt-6 text-[12px] font-bold uppercase tracking-[0.15em]"
            style={{ color: accent }}
          >
            {"// " + r.about.toLowerCase()}
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-800">
            {val(data.summary, r.aboutFallback)}
          </p>
        </main>

        <aside className="space-y-5">
          <div className="rounded-xl bg-zinc-100 p-3.5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">{r.education}</h3>
            <p className="mt-1.5 text-[12px] font-bold leading-snug">{val(data.institution, r.dash)}</p>
            <p className="mt-1 text-[11px] text-zinc-700">{val(data.specialty, r.dash)}</p>
            <p className="mt-1 text-[11px] text-zinc-500">{val(data.studyYears, r.dash)}</p>
          </div>
          <div className="rounded-xl bg-zinc-100 p-3.5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">{r.soft}</h3>
            {data.softSkills.length === 0 ? (
              <p className="mt-1.5 text-[11px] text-zinc-500">{r.dash}</p>
            ) : (
              <ul className="mt-1.5 space-y-1">
                {data.softSkills.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[11.5px] font-medium">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

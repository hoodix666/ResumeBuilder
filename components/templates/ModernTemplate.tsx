"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";

function val(v: string, fallback: string) {
  return v.trim() ? v : fallback;
}

function LinkRow({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  const isUrl = /^https?:\/\//i.test(value.trim());
  return (
    <div className="break-all text-[11px] leading-relaxed">
      <span className="opacity-70">{label}: </span>
      {isUrl ? (
        <a href={value.trim()} className="underline">
          {value.trim().replace(/^https?:\/\//, "")}
        </a>
      ) : (
        <span>{value.trim()}</span>
      )}
    </div>
  );
}

/** 1. Modern — акцентный цвет + боковая панель. */
export default function ModernTemplate({ data, r }: { data: ResumeData; r: ResumeStrings }) {
  const accent = data.accent || "#111827";
  const contacts = [data.city, data.phone, data.email, data.telegram].filter((v) => v.trim());

  return (
    <div className="flex min-h-[1123px] w-full bg-white text-left" style={{ color: "#18181b" }}>
      {/* Sidebar */}
      <aside className="w-[32%] shrink-0 p-6 text-white" style={{ backgroundColor: accent }}>
        <div className="mb-5 flex justify-center">
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt={data.fullName}
              className="h-28 w-28 rounded-full border-2 border-white/60 object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-white/50 text-xs text-white/70">
              Фото
            </div>
          )}
        </div>

        <div className="mb-5">
          <h3 className="mb-2 border-b border-white/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/90">
            {r.contacts}
          </h3>
          {contacts.length === 0 && <p className="text-[11px] text-white/60">{r.dash}</p>}
          {contacts.map((c, i) => (
            <p key={i} className="break-all text-[11px] leading-relaxed">
              {c}
            </p>
          ))}
        </div>

        <div className="mb-5">
          <h3 className="mb-2 border-b border-white/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/90">
            {r.links}
          </h3>
          <div className="space-y-1 text-white">
            <LinkRow label="GitHub" value={data.github} />
            <LinkRow label="LinkedIn" value={data.linkedin} />
            <LinkRow label="Portfolio" value={data.portfolio} />
            <LinkRow label="Video" value={data.extraLink} />
            {!data.github.trim() && !data.linkedin.trim() && !data.portfolio.trim() && !data.extraLink.trim() && (
              <p className="text-[11px] text-white/60">{r.dash}</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="mb-2 border-b border-white/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/90">
            {r.hard}
          </h3>
          {data.hardSkills.length === 0 ? (
            <p className="text-[11px] text-white/60">{r.dash}</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {data.hardSkills.map((s, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold"
                  style={{ color: accent }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5">
          <h3 className="mb-2 border-b border-white/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/90">
            {r.soft}
          </h3>
          {data.softSkills.length === 0 ? (
            <p className="text-[11px] text-white/60">{r.dash}</p>
          ) : (
            <ul className="list-disc space-y-0.5 pl-4 text-[11px] leading-relaxed">
              {data.softSkills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-2 border-b border-white/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/90">
            {r.education}
          </h3>
          <p className="text-[12px] font-semibold leading-snug">{val(data.institution, r.dash)}</p>
          <p className="mt-0.5 text-[11px] text-white/85">{val(data.specialty, r.dash)}</p>
          <p className="mt-0.5 text-[11px] text-white/70">{val(data.studyYears, r.dash)}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-7">
        <h1 className="text-[28px] font-extrabold leading-tight">{val(data.fullName, r.yourName)}</h1>
        <p className="mt-1 text-[14px] font-semibold" style={{ color: accent }}>
          {val(data.position, r.yourPosition)}
        </p>
        {data.city.trim() && <p className="mt-1 text-[12px] text-zinc-600">{data.city}</p>}

        <section className="mt-5">
          <h2
            className="border-b-2 pb-1 text-[13px] font-bold uppercase tracking-wide"
            style={{ borderColor: accent }}
          >
            {r.about}
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-800">
            {val(data.summary, r.goalFallback)}
          </p>
        </section>

        <section className="mt-5">
          <h2
            className="border-b-2 pb-1 text-[13px] font-bold uppercase tracking-wide"
            style={{ borderColor: accent }}
          >
            {r.projects}
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
                      <a href={p.link.trim()} className="text-[11px] underline" style={{ color: accent }}>
                        {p.link.trim().replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  {p.stack.trim() && (
                    <p className="mt-0.5 text-[11px] font-medium text-zinc-600">{r.stackPrefix} {p.stack}</p>
                  )}
                  {p.description.trim() && (
                    <p className="mt-1 text-[12px] leading-relaxed text-zinc-800">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

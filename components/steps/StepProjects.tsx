"use client";

import { ResumeData, uid } from "@/lib/types";
import { Strings } from "@/lib/i18n";

export default function StepProjects({
  data,
  update,
  t,
}: {
  data: ResumeData;
  update: (patch: Partial<ResumeData>) => void;
  t: Strings;
}) {
  function addProject() {
    update({
      projects: [
        ...data.projects,
        { id: uid(), title: "", stack: "", description: "", link: "" },
      ],
    });
  }

  function updateProject(id: string, patch: Partial<(typeof data.projects)[number]>) {
    update({
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function removeProject(id: string) {
    update({ projects: data.projects.filter((p) => p.id !== id) });
  }

  const inputCls =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300";

  return (
    <div className="step-enter space-y-4">
      {data.projects.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{t.projEmptyTitle}</p>
          <p className="mx-auto mt-1 max-w-sm text-[13px] text-zinc-500 dark:text-zinc-400">
            {t.projEmptyText}
          </p>
        </div>
      )}

      {data.projects.map((p, idx) => (
        <div
          key={p.id}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
              {t.projectN} {idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeProject(p.id)}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
            >
              {t.delete}
            </button>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.fTitle}</span>
              <input
                value={p.title}
                onChange={(e) => updateProject(p.id, { title: e.target.value })}
                placeholder={t.fTitlePh}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.fStack}</span>
              <input
                value={p.stack}
                onChange={(e) => updateProject(p.id, { stack: e.target.value })}
                placeholder={t.fStackPh}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.fDesc}</span>
              <textarea
                value={p.description}
                onChange={(e) => updateProject(p.id, { description: e.target.value })}
                placeholder={t.fDescPh}
                rows={3}
                className={`${inputCls} resize-y`}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.fLink}</span>
              <input
                value={p.link}
                onChange={(e) => updateProject(p.id, { link: e.target.value })}
                placeholder="https://github.com/..."
                className={inputCls}
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="w-full rounded-xl border-2 border-dashed border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white active:scale-[0.99] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
      >
        {t.addProject}
      </button>
    </div>
  );
}

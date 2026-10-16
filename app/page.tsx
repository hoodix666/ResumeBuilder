"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Stepper from "@/components/Stepper";
import ResumePreview from "@/components/ResumePreview";
import StepPersonal from "@/components/steps/StepPersonal";
import StepEducation from "@/components/steps/StepEducation";
import StepSkills from "@/components/steps/StepSkills";
import StepProjects from "@/components/steps/StepProjects";
import StepTemplate from "@/components/steps/StepTemplate";
import { EMPTY_RESUME, ResumeData } from "@/lib/types";
import { SAMPLE_RESUME, SAMPLE_RESUME_KK } from "@/lib/sampleData";
import { clearResume, loadResume, saveResume } from "@/lib/storage";
import { buildShareUrl, readResumeFromUrl } from "@/lib/share";
import { exportResumeToPdf, printResume } from "@/lib/pdf";
import { Lang, STRINGS } from "@/lib/i18n";
import { isPhoneComplete } from "@/lib/phone";
import { canEnterStep, isStep1Valid, isStep2Valid } from "@/lib/validation";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const LANG_KEY = "it-resume-lang";
const THEME_KEY = "it-resume-theme";

function loadLang(): Lang {
  if (typeof window === "undefined") return "ru";
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "kk" ? "kk" : "ru";
  } catch {
    return "ru";
  }
}

function loadTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function Home() {
  // Ленивая инициализация с защитой: данные подтягиваются сразу (ссылка ?r= → localStorage),
  // при любой ошибке — пустая форма, но НЕ вечный загрузчик
  const [data, setData] = useState<ResumeData>(() => {
    try {
      if (typeof window !== "undefined") {
        const fromUrl = readResumeFromUrl();
        if (fromUrl) return { ...EMPTY_RESUME, ...fromUrl };
        return loadResume();
      }
    } catch {
      // ignore — отдаём пустую форму
    }
    return { ...EMPTY_RESUME };
  });
  const [step, setStep] = useState(1);
  const [ready, setReady] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [lang, setLang] = useState<Lang>(() => loadLang());
  const [theme, setTheme] = useState<"light" | "dark">(() => loadTheme());
  const [errors, setErrors] = useState<Record<string, string>>({});
  // На время экспорта принудительно показываем светлый лист, чтобы PDF был чисто белым A4
  const [forceLight, setForceLight] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = STRINGS[lang];

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  }

  // Первичная инициализация: класс темы на <html>, тост про загрузку по ссылке.
  // setReady(true) — в finally, чтобы загрузчик гас при любом раскладе
  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", theme === "dark");
      if (readResumeFromUrl()) showToast(STRINGS[loadLang()].toastLoadedLink);
    } catch {
      // ignore
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Страховка от вечной загрузки: если что-то пошло не так — гасим принудительно
  useEffect(() => {
    if (ready) return;
    const id = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(id);
  }, [ready]);

  // Автосохранение в localStorage при каждом изменении
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => saveResume(data), 300);
    return () => clearTimeout(id);
  }, [data, ready]);

  useEffect(() => {
    document.title =
      lang === "kk" ? "Түйіндеме конструкторы — IT түлектерге" : "Конструктор резюме для IT-выпускников";
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    // Плавное «перетекание»: временно включаем transition на все цвета
    document.documentElement.classList.add("theme-anim");
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore
    }
    setTimeout(() => document.documentElement.classList.remove("theme-anim"), 650);
  }

  const update = useCallback((patch: Partial<ResumeData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    // Снимаем ошибку с поля, как только пользователь начал его исправлять
    const keys = Object.keys(patch);
    setErrors((prev) => {
      const next = { ...prev };
      for (const k of keys) delete next[k];
      if ("phone" in patch) delete next["phone"];
      return next;
    });
  }, []);

  function stepErrors(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.fullName.trim()) e.fullName = t.fieldRequired;
      if (!data.position.trim()) e.position = t.fieldRequired;
      if (!data.phone.trim()) e.phone = t.fieldRequired;
      else if (!isPhoneComplete(data.phone)) e.phone = t.phoneInvalid;
    }
    if (s === 2) {
      if (!data.institution.trim()) e.institution = t.fieldRequired;
      if (!data.specialty.trim()) e.specialty = t.fieldRequired;
    }
    return e;
  }

  function blockedReason(target: number): string {
    if (target >= 2 && !isStep1Valid(data)) return t.step1Need;
    if (target >= 3 && !isStep2Valid(data)) return t.step2Need;
    return t.stepBlocked;
  }

  function goToStep(s: number) {
    if (s === step) return;
    if (s < step) {
      // Назад — всегда можно
      setErrors({});
      setStep(s);
      return;
    }
    if (!canEnterStep(data, s)) {
      showToast(blockedReason(s));
      // Подсвечиваем ошибки текущего шага, чтобы было видно что чинить
      const e = step === 1 || step === 2 ? stepErrors(step) : stepErrors(!isStep1Valid(data) ? 1 : 2);
      if (Object.keys(e).length > 0) setErrors(e);
      return;
    }
    setErrors({});
    setStep(s);
  }

  function handleNext() {
    const e = stepErrors(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      showToast(step === 1 ? t.step1Need : step === 2 ? t.step2Need : t.stepBlocked);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(5, s + 1));
  }

  function handleFillSample() {
    const sample = lang === "kk" ? SAMPLE_RESUME_KK : SAMPLE_RESUME;
    setData({ ...sample, template: data.template, accent: data.accent });
    setErrors({});
    showToast(t.toastSample);
  }

  function handleReset() {
    if (!window.confirm(t.resetConfirm)) return;
    setData({ ...EMPTY_RESUME });
    clearResume();
    setStep(1);
    setErrors({});
    showToast(t.toastReset);
  }

  async function handleDownloadPdf() {
    // Перед экспортом требуем валидные обязательные шаги
    if (!isStep1Valid(data)) {
      setStep(1);
      setErrors(stepErrors(1));
      showToast(t.step1Need);
      return;
    }
    if (!isStep2Valid(data)) {
      setStep(2);
      setErrors(stepErrors(2));
      showToast(t.step2Need);
      return;
    }
    try {
      setPdfBusy(true);
      // Убираем тёмную инверсию preview и даём браузеру перерисовать лист белым
      setForceLight(true);
      await new Promise((res) => setTimeout(res, 250));
      const base = data.fullName.trim()
        ? `Резюме_${data.fullName.trim().replace(/\s+/g, "_")}`
        : "resume";
      await exportResumeToPdf(base);
      showToast(t.toastPdfSaved);
    } catch (e) {
      console.error(e);
      showToast(t.toastPdfFailed);
    } finally {
      setForceLight(false);
      setPdfBusy(false);
    }
  }

  async function handleCopyLink() {
    try {
      const url = buildShareUrl(data);
      await navigator.clipboard.writeText(url);
      showToast(t.toastLinkCopied);
    } catch {
      try {
        const url = buildShareUrl(data);
        window.prompt(url, url);
      } catch {
        showToast(t.toastPdfFailed);
      }
    }
  }

  if (!ready) {
    // Нейтральный спиннер без текста: серверный и клиентский HTML всегда совпадают,
    // гидратация не падает и загрузчик не может зависнуть
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100">
        <span className="block h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-300 border-t-zinc-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-zinc-100">
      {/* ===== Header ===== */}
      <header className="no-print sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:gap-2.5">
          <div className="mr-auto flex items-center gap-2.5">
            <Logo className="h-10 w-10 text-zinc-900 transition-colors duration-500 dark:text-zinc-100" />
            <div className="leading-tight">
              <p className="text-[15px] font-bold">{t.appTitle}</p>
              <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Переключатель языка RU | KZ */}
          <div
            className="flex rounded-lg border border-zinc-300 p-0.5 text-[13px] font-semibold dark:border-zinc-700"
            role="group"
            aria-label="Language / Тіл"
          >
            {(["ru", "kk"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={[
                  "rounded-md px-2.5 py-1.5 uppercase transition-all duration-300 active:scale-95",
                  lang === l
                    ? "bg-zinc-900 text-white shadow dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                ].join(" ")}
              >
                {l === "ru" ? "RU" : "KZ"}
              </button>
            ))}
          </div>

          {/* Ползунок темы как на референсе */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            type="button"
            onClick={handleFillSample}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800"
          >
            {t.fillSample}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-800 transition hover:border-red-400 hover:bg-red-50 hover:text-red-700 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-red-950"
          >
            {t.reset}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800"
          >
            {t.copyLink}
          </button>
          <button
            type="button"
            onClick={() => printResume()}
            className="hidden rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800 sm:block"
          >
            {t.print}
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={pdfBusy}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-semibold text-white shadow transition hover:bg-zinc-700 active:scale-95 disabled:cursor-wait disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {pdfBusy ? t.creating : t.download}
          </button>
        </div>
      </header>

      {/* ===== Main ===== */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid items-start gap-6 lg:grid-cols-[460px_1fr]">
          {/* Левая колонка: степпер + форма */}
          <section className="no-print rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <Stepper step={step} labels={t.stepsShort} canEnter={(s) => canEnterStep(data, s)} onGo={goToStep} />

            <div className="mt-5">
              <h2 className="text-lg font-bold">
                {t.stepTitles[step - 1]}
              </h2>
              <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">{t.stepHints[step - 1]}</p>
            </div>

            <div key={`${step}-${lang}`} className="mt-5">
              {step === 1 && <StepPersonal data={data} update={update} t={t} errors={errors} />}
              {step === 2 && <StepEducation data={data} update={update} t={t} errors={errors} />}
              {step === 3 && <StepSkills data={data} update={update} t={t} lang={lang} />}
              {step === 4 && <StepProjects data={data} update={update} t={t} />}
              {step === 5 && <StepTemplate data={data} update={update} t={t} />}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => goToStep(step - 1)}
                className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-900 hover:bg-zinc-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:border-zinc-400 dark:hover:bg-zinc-800"
              >
                {t.back}
              </button>
              <span className="text-xs text-zinc-400">
                {step} / 5 • {t.autosave}
              </span>
              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  {t.next}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={pdfBusy}
                  className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-95 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  {pdfBusy ? t.creatingShort : t.download}
                </button>
              )}
            </div>
          </section>

          {/* Правая колонка: live preview */}
          <section className="lg:sticky lg:top-[72px]">
            <div className="no-print mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {t.livePreview} • {data.template}
              </h2>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {t.liveBadge}
              </span>
            </div>
            <ResumePreview data={data} r={t.r} darkPreview={theme === "dark" && !forceLight} watermark={t.watermark} />
            <p className="no-print mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
              {t.scaleNote}
            </p>
          </section>
        </div>

        <footer className="no-print mx-auto mt-10 max-w-3xl pb-6 text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          <p>{t.footer}</p>
        </footer>
      </main>

      {/* Toast */}
      {toast && (
        <div className="no-print fixed bottom-6 left-1/2 z-50 max-w-[92vw] -translate-x-1/2">
          <div className="step-enter rounded-full bg-zinc-900 px-5 py-2.5 text-center text-sm font-medium text-white shadow-xl dark:bg-zinc-100 dark:text-zinc-900">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

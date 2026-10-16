"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Stepper({
  step,
  labels,
  canEnter,
  onGo,
}: {
  step: number;
  labels: [string, string, string, string, string];
  canEnter: (s: number) => boolean;
  onGo: (s: number) => void;
}) {
  const ids = [1, 2, 3, 4, 5];
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lastRef = useRef({ x: 0, y: 0, placed: false });
  const [travel, setTravel] = useState({ x: 0, y: 0, show: false });
  const [anim, setAnim] = useState(false);
  const progress = ((step - 1) / (ids.length - 1)) * 100;

  function measure() {
    const wrap = wrapRef.current;
    const badge = badgeRefs.current[step - 1];
    if (!wrap || !badge) return;
    const wr = wrap.getBoundingClientRect();
    const br = badge.getBoundingClientRect();
    const nx = br.left - wr.left;
    const ny = br.top - wr.top;
    const last = lastRef.current;
    if (last.placed && Math.abs(nx - last.x) < 0.5 && Math.abs(ny - last.y) < 0.5) return;
    lastRef.current = { x: nx, y: ny, placed: true };
    setTravel({ x: nx, y: ny, show: true });
  }

  // Замер до первой отрисовки — бегунок сразу встаёт на место без слайда из угла
  useIsoLayoutEffect(() => {
    measure();
    // Анимацию перелёта включаем только после постановки на место
    const t = setTimeout(() => setAnim(true), 60);
    return () => clearTimeout(t);
  }, [step, labels]);

  // Перезамер при ресайзе, смене шрифтов и поздней вёрстке
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, 700);
    let done = false;
    try {
      const doc = document as unknown as { fonts?: { ready?: Promise<unknown> } };
      const ready = doc.fonts?.ready;
      if (ready && typeof (ready as Promise<unknown>).then === "function") {
        (ready as Promise<unknown>)
          .then(() => {
            if (!done) {
              done = true;
              measure();
            }
          })
          .catch(() => {});
      }
    } catch {
      // ignore — document.fonts есть не везде
    }
    return () => {
      done = true;
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step, labels]);

  return (
    <div ref={wrapRef} className="no-print relative w-full">
      {/* Бегунок активного шага — один в один как кнопка темы:
          внешняя обёртка скользит (тот же easing и 0.5с), внутренняя сжимается squish */}
      <span
        aria-hidden="true"
        className="step-traveler pointer-events-none absolute left-0 top-0 z-0 block h-8 w-8"
        style={{
          transform: `translate3d(${travel.x}px, ${travel.y}px, 0)`,
          transition: anim ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          opacity: travel.show ? 1 : 0,
        }}
      >
        <span
          key={step}
          className="knob-squish block h-8 w-8 rounded-full bg-zinc-900 shadow-lg transition-colors duration-500 dark:bg-zinc-100"
        />
      </span>

      {/* Прогресс-бар */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all duration-500 ease-out dark:bg-zinc-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="flex items-start justify-between gap-1 sm:gap-2">
        {ids.map((id) => {
          const active = id === step;
          const done = id < step;
          const allowed = canEnter(id);
          return (
            <li key={id} className="flex min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onGo(id)}
                disabled={!allowed}
                title={allowed ? labels[id - 1] : undefined}
                className={[
                  "group flex w-full flex-col items-center gap-1.5 rounded-xl p-1 transition sm:flex-row sm:gap-2.5 sm:p-2",
                  allowed ? "hover:bg-zinc-100 dark:hover:bg-zinc-800" : "cursor-not-allowed opacity-50",
                ].join(" ")}
              >
                <span
                  ref={(el) => {
                    badgeRefs.current[id - 1] = el;
                  }}
                  className={[
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                    active
                      ? "text-white dark:text-zinc-900"
                      : done
                        ? "bg-zinc-900/10 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-100/10 dark:text-zinc-100 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900"
                        : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400",
                  ].join(" ")}
                >
                  {!allowed ? (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  ) : done ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.5L6.5 12L13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    id
                  )}
                </span>
                <span
                  className={[
                    "truncate text-center text-[11px] leading-tight sm:text-left sm:text-[13px]",
                    active
                      ? "font-semibold text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400",
                  ].join(" ")}
                >
                  {labels[id - 1]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

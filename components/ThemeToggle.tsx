"use client";

/**
 * Ползунок темы точь-в-точь как на референсе:
 * - светлый режим: белый трек, белая круглая кнопка СЛЕВА, серая иконка солнца СПРАВА;
 * - тёмный режим: чёрный трек, тёмная кнопка СПРАВА, луна + звёзды СЛЕВА;
 * - при нажатии кнопка плавно перетекает (слайд), по пути искажается (squish)
 *   и возвращается в ровный круг в конце.
 */
export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={[
        "theme-toggle relative h-10 w-[76px] shrink-0 rounded-full transition-colors duration-500",
        "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        "active:scale-[0.97]",
        dark
          ? "border border-black bg-[#14161c] shadow-[inset_0_2px_8px_rgba(0,0,0,0.65),0_2px_10px_rgba(0,0,0,0.35)]"
          : "border border-[#e3e5ee] bg-[#f2f3f7] shadow-[inset_0_2px_6px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      {/* Солнце справа — видно в светлом режиме */}
      <span
        className={[
          "absolute right-[9px] top-1/2 -translate-y-1/2 transition-opacity duration-500",
          dark ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[#c2c6d6]">
          <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4L19 19M19 5l-1.6 1.6M6.6 17.4L5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Луна + звёзды слева — видно в тёмном режиме */}
      <span
        className={[
          "absolute left-[7px] top-1/2 flex -translate-y-1/2 items-center gap-[3px] transition-opacity duration-500",
          dark ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <svg width="15" height="22" viewBox="0 0 15 22" fill="none" className="text-[#8f96ac]">
          <mask id="theme-moon-cut">
            <rect x="0" y="0" width="15" height="22" fill="white" />
            <circle cx="10.5" cy="5.5" r="6" fill="black" />
          </mask>
          <circle cx="7" cy="12.5" r="7" fill="currentColor" mask="url(#theme-moon-cut)" />
        </svg>
        <span className="relative inline-block h-[22px] w-[12px] text-[#8f96ac]">
          <svg viewBox="0 0 12 22" className="h-full w-full" fill="currentColor">
            <path className="twinkle" d="M6 3l.9 2.1L9 6l-2.1.9L6 9l-.9-2.1L3 6l2.1-.9z" />
            <path d="M1.5 0h.8v2.6h-.8zM.2 1h2.6v.7H.2z" opacity="0.9" />
            <path d="M10.5 12h.9v2.8h-.9zM9.2 13.1h2.8v.7H9.2z" opacity="0.9" />
            <path className="twinkle" d="M3 15l.7 1.6 1.6.7-1.6.7L3 19.6l-.7-1.6-1.6-.7 1.6-.7z" opacity="0.8" />
          </svg>
        </span>
      </span>

      {/* Кнопка: внешняя обёртка — слайд строго внутри трека (без overshoot за края),
          внутренняя — искажение squish */}
      <span
        className={[
          "theme-toggle-knob absolute left-1 top-1 block h-8 w-8 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          dark ? "translate-x-9" : "translate-x-0",
        ].join(" ")}
      >
        <span
          key={theme}
          className={[
            "knob-squish block h-8 w-8 rounded-full transition-colors duration-500",
            dark
              ? "bg-[#3b404d] shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)]"
              : "bg-white shadow-[0_3px_10px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,1)]",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

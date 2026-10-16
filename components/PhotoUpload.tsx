"use client";

import { useRef, useState } from "react";
import { Strings } from "@/lib/i18n";

/** Загрузка фото с предпросмотром + сжатие до 512px, чтобы не переполнить localStorage. */
export default function PhotoUpload({
  photo,
  onChange,
  t,
}: {
  photo: string;
  onChange: (dataUrl: string) => void;
  t: Strings;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  function downscale(img: HTMLImageElement, maxSize = 512): string {
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return img.src;
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.85);
  }

  function handleFile(file: File | undefined) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(t.photoBadType);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError(t.photoTooBig);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          onChange(downscale(img));
        } catch {
          onChange(String(reader.result || ""));
        }
      };
      img.onerror = () => onChange(String(reader.result || ""));
      img.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Фото</span>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Фото для резюме" className="h-full w-full object-cover" />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-zinc-400">
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.6-6 8-6s8 2 8 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {photo ? t.photoChange : t.photoUpload}
          </button>
          {photo && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg border border-zinc-300 px-3.5 py-2 text-sm text-zinc-700 transition hover:border-zinc-900 hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:bg-zinc-800"
            >
              {t.photoRemove}
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{t.photoHint}</p>
    </div>
  );
}

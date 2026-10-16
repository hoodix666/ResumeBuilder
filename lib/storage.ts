import { EMPTY_RESUME, ResumeData } from "./types";

const KEY = "it-resume-builder-v1";

export function loadResume(): ResumeData {
  if (typeof window === "undefined") return { ...EMPTY_RESUME };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY_RESUME };
    const parsed = JSON.parse(raw) as Partial<ResumeData>;
    return { ...EMPTY_RESUME, ...parsed };
  } catch {
    return { ...EMPTY_RESUME };
  }
}

export function saveResume(data: ResumeData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // localStorage переполнен (обычно из-за фото) — сохраняем без фото
    try {
      const { photo, ...rest } = data;
      void photo;
      localStorage.setItem(KEY, JSON.stringify(rest));
    } catch {
      // ignore
    }
  }
}

export function clearResume() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

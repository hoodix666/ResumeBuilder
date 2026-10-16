import LZString from "lz-string";
import { ResumeData } from "./types";

/** Упаковка резюме в компактную строку для URL (?r=...) — «уникальная ссылка» без бэкенда. */
export function encodeResume(data: ResumeData): string {
  const json = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeResume(encoded: string): ResumeData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as ResumeData;
  } catch {
    return null;
  }
}

export function buildShareUrl(data: ResumeData): string {
  if (typeof window === "undefined") return "";
  const encoded = encodeResume(data);
  const url = new URL(window.location.href);
  url.searchParams.set("r", encoded);
  return url.toString();
}

export function readResumeFromUrl(): ResumeData | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("r");
    if (!encoded) return null;
    return decodeResume(encoded);
  } catch {
    return null;
  }
}

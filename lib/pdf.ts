"use client";

/**
 * Экспорт резюме в PDF без бэкенда.
 * Используем html2pdf.js (html2canvas + jsPDF) с настройками под A4.
 * Важно: шаблоны используют только HEX/RGB цвета (Tailwind v3),
 * чтобы html2canvas не падал на oklch.
 */
export async function exportResumeToPdf(filename = "resume.pdf"): Promise<void> {
  const element = document.getElementById("resume-a4");
  if (!element) throw new Error("Элемент резюме не найден");

  // Динамический импорт — только на клиенте
  const html2pdfModule = await import("html2pdf.js");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2pdf = (html2pdfModule as any).default ?? html2pdfModule;

  const safeName =
    (filename || "resume").trim().replace(/[\\/:*?"<>|]+/g, "") || "resume";

  const opt = {
    margin: 0,
    filename: safeName.endsWith(".pdf") ? safeName : `${safeName}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    },
    jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
    pagebreak: { mode: ["css", "legacy"] as unknown as string[] },
  };

  await html2pdf().set(opt).from(element).save();
}

/** Печать через диалог браузера (альтернативный «чистый» PDF без обрезания). */
export function printResume(): void {
  window.print();
}

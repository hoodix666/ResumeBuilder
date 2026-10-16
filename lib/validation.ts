import { ResumeData } from "./types";
import { isPhoneComplete } from "./phone";

/** Шаг 1 валиден: ФИО + должность + телефон строго по маске. */
export function isStep1Valid(d: ResumeData): boolean {
  return d.fullName.trim().length > 0 && d.position.trim().length > 0 && isPhoneComplete(d.phone);
}

/** Шаг 2 валиден: заведение + специальность. */
export function isStep2Valid(d: ResumeData): boolean {
  return d.institution.trim().length > 0 && d.specialty.trim().length > 0;
}

/** Можно ли открыть шаг N: все предыдущие обязательные шаги валидны. */
export function canEnterStep(d: ResumeData, target: number): boolean {
  if (target >= 2 && !isStep1Valid(d)) return false;
  if (target >= 3 && !isStep2Valid(d)) return false;
  return true;
}

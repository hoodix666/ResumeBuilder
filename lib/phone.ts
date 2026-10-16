/** Строгая маска казахстанского/российского номера: +7 (777) 123-45-67 */

export const PHONE_MASK_HINT = "+7 (___) ___-__-__";

export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  // Если цифр больше 10 — первый символ это код страны (7/8), отбрасываем его
  if (d.length > 10 && (d[0] === "7" || d[0] === "8")) d = d.slice(1);
  // Остаток — цифры абонента (макс. 10)
  d = d.slice(0, 10);

  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);

  let out = "+7";
  if (p1) out += " (" + p1;
  if (d.length >= 3) out += ")";
  if (p2) out += " " + p2;
  if (p3) out += "-" + p3;
  if (p4) out += "-" + p4;
  return out;
}

export function isPhoneComplete(value: string): boolean {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value.trim());
}

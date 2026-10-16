/** Логотип по референсу (документ со ступенями), но в тёмно-белом монохроме.
 *  Использует currentColor: тёмный в светлой теме, белый в тёмной. */
export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Контур документа со «щитом» снизу */}
      <path
        d="M14 4.5H28L39.5 16V29.5C39.5 37 33 41.5 24 44.5C15 41.5 8.5 37 8.5 29.5V11C8.5 7 10 4.5 14 4.5Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Сгиб уголка */}
      <path
        d="M28 4.5V16H39.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Верхняя полоса (выступает вправо, как в оригинале) */}
      <rect x="18.5" y="20.5" width="25" height="6" rx="1" fill="currentColor" />
      {/* Ступени */}
      <rect x="14.5" y="29" width="15" height="6" rx="1" fill="currentColor" />
      <rect x="6" y="37" width="15" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}

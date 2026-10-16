# Конструктор / Генератор резюме для IT-выпускников

Single Page Application на **Next.js (App Router) + React + Tailwind CSS** — как на Vercel.
Для студентов и выпускников **без коммерческого опыта**: пошаговый мастер со строгой валидацией, live-preview A4,
6 CSS-шаблонов (простые и навороченные), экспорт в PDF **без бэкенда**, автосохранение в `localStorage`, языки RU/KZ, тёмная тема, шаринг по уникальной ссылке.

## Возможности

- **Языки RU / KZ:** переключатель в шапке, весь интерфейс + тестовые данные + заголовки секций резюме на двух языках. Выбор сохраняется.
- **Строгий степпер:** назад — всегда можно, вперёд — только через валидацию. Незаполненные обязательные поля подсвечиваются красным + тост с подсказкой. Недоступные шаги закрыты замком.
  - Шаг 1 обязательно: ФИО, желаемая должность, телефон строго по маске `+7 (777) 123-45-67` (8 → +7, вставка любого формата нормализуется).
  - Шаг 2 обязательно: учебное заведение и специальность.
- **Stepper / Wizard (5 шагов):**
  1. Личные данные — ФИО, должность, город, телефон, Telegram, Email, GitHub/LinkedIn/Portfolio/TikTok-YouTube, фото с предпросмотром, «О себе».
  2. Образование — заведение, специальность, годы (2022–2026).
  3. Навыки — Tag Input для hard skills + поле soft skills (подсказки, Enter/запятая, Backspace).
  4. Проекты — «+ Добавить проект»: название, стек, описание, ссылка. Добавление/удаление.
  5. Шаблон — Modern / Minimal / Creative-IT + акцентный цвет + Live Preview.
- **6 встроенных шаблонов в 2 группах:** Простые — Minimal, Simple (строгие, для официальной подачи); Навороченные — Modern, Creative/IT, Gradient Pro, Elegant (чтобы выделиться). 12 акцентных цветов на шаге 5.
- **Тёмная/светлая тема сайта:** уникальная кнопка-«планета» день/ночь в шапке, плавное перетекание цветов (~0.5с). Лист резюме всегда белый (бумага для PDF).
- **Кнопки:** «Скачать PDF» (A4, без обрезки), «Печать / PDF» (через диалог браузера), «Заполнить тестовыми данными», «Сбросить форму», «Скопировать ссылку».
- **Сохранение:** каждое изменение → `localStorage` (ключ `it-resume-builder-v1`), данные не теряются при перезагрузке. Фото сжимается до 512px JPEG.
- **Уникальная ссылка:** состояние сжимается `lz-string` в `?r=...` — можно отправлять комиссии, бэкенд не нужен.
- **Дизайн:** белый/серый/чёрный минимализм, адаптив desktop/mobile, анимации переходов шагов, hover-анимации, липкий preview.

## Технологии

- Next.js 14 (App Router, SPA — вся логика в client-компоненте `app/page.tsx`)
- React 18 + Tailwind CSS 3 (HEX/RGB-палитра — совместимо с html2canvas)
- PDF: `html2pdf.js` (html2canvas + jsPDF) локально + `@media print` для чистого A4
- Шаринг: `lz-string`

> Про `index.html / styles.css / app.js`: в Next.js их заменяют `app/layout.tsx` (HTML-каркас),
> `app/globals.css` (стили) и `app/page.tsx` + `components/*` (логика). Отдельные файлы не нужны —
> Next собирает оптимизированный `index.html` сам.

## Структура

```
app/
  layout.tsx        # <html lang="ru"> + metadata
  page.tsx          # Главная: язык, тема, строгая валидация, toolbar, live preview
  globals.css       # Tailwind + стили A4 + @media print + theme-anim
components/
  Stepper.tsx       # шаги с замками недоступных
  PhoneInput.tsx    # строгая маска +7 (___) ___-__-__
  TagInput.tsx
  PhotoUpload.tsx
  ResumePreview.tsx # <div id="resume-a4"> + выбор шаблона
  templates/
    ModernTemplate.tsx / MinimalTemplate.tsx / CreativeTemplate.tsx
    SimpleTemplate.tsx / GradientTemplate.tsx / ElegantTemplate.tsx
  steps/
    StepPersonal.tsx
    StepEducation.tsx
    StepSkills.tsx
    StepProjects.tsx
    StepTemplate.tsx
lib/
  types.ts          # ResumeData, EMPTY_RESUME
  sampleData.ts     # Тестовый IT-студент + подсказки навыков
  storage.ts        # localStorage load/save/clear
  share.ts          # encode/decode ?r=, buildShareUrl
  pdf.ts            # exportResumeToPdf (html2pdf.js), printResume
  i18n.ts           # словарь RU/KK (интерфейс + секции резюме)
  phone.ts          # маска +7 (___) ___-__-__
  validation.ts     # isStep1Valid / isStep2Valid / canEnterStep
```

## Запуск

Требуется **Node.js 18+**.

```bash
# 1. Установка
npm install

# 2. Разработка (http://localhost:3000)
npm run dev

# 3. Продакшн-сборка + запуск
npm run build
npm start
```

На Windows (PowerShell с запретом скриптов) используйте `cmd`:

```cmd
cmd /c "npm install && npm run dev"
```

## Деплой на Vercel

1. Запушьте репозиторий в GitHub.
2. На [vercel.com](https://vercel.com) → Add New Project → Import репозиторий.
3. Framework Preset: **Next.js**, Build Command: `npm run build`, Output: `.next`. Переменные окружения не нужны.
4. Deploy → получите ссылку вида `https://resume-builder-xxx.vercel.app`.

## Как пользоваться

1. Заполните шаги 1–4 (или нажмите «Заполнить тестовыми данными»).
2. На шаге 5 выберите шаблон и акцентный цвет.
3. Справа — Live Preview (лист A4). На mobile — ниже формы.
4. «Скачать PDF» — прямой экспорт активного шаблона. Если html2canvas упрётся в лимит — используйте «Печать / PDF» → «Сохранить как PDF».
5. «Скопировать ссылку» — генерирует URL с `?r=...` для отправки работодателю/комиссии.

## Примечания по PDF без обрезки

- Резюме рендерится в контейнере `#resume-a4` (max 794px ≈ A4@96dpi).
- Экспорт: `html2pdf.js` с `scale: 2, format: a4, margin: 0, pagebreak: [css, legacy]`.
- Дополнительно: `@page { size: A4; margin: 0 }` + `.no-print` скрывает редактор при печати.
- Все цвета шаблонов — HEX/RGB (Tailwind v3), т.к. html2canvas не парсит `oklch` из Tailwind v4.

## Лицензия

См. `LICENSE`.

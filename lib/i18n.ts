export type Lang = "ru" | "kk";

/** Строки самого резюме (заголовки секций внутри шаблонов A4). */
export interface ResumeStrings {
  about: string;
  education: string;
  contacts: string;
  links: string;
  hard: string;
  soft: string;
  projects: string;
  projectsMinimal: string;
  stackPrefix: string;
  yourName: string;
  yourPosition: string;
  dash: string;
  addProjectsNote: string;
  creativeSkillsHint: string;
  goalFallback: string;
  graduateBadge: string;
  aboutFallback: string;
}

export interface Strings {
  appTitle: string;
  appSubtitle: string;
  fillSample: string;
  reset: string;
  resetConfirm: string;
  copyLink: string;
  print: string;
  download: string;
  creating: string;
  creatingShort: string;
  stepsShort: [string, string, string, string, string];
  stepTitles: [string, string, string, string, string];
  stepHints: [string, string, string, string, string];
  back: string;
  next: string;
  autosave: string;
  livePreview: string;
  liveBadge: string;
  scaleNote: string;
  footer: string;
  loading: string;
  toastLoadedLink: string;
  toastSample: string;
  toastReset: string;
  toastPdfSaved: string;
  toastPdfFailed: string;
  toastLinkCopied: string;
  stepBlocked: string;
  step1Need: string;
  step2Need: string;
  fieldRequired: string;
  phoneInvalid: string;
  // Шаг 1
  fullName: string;
  fullNamePh: string;
  position: string;
  positionPh: string;
  city: string;
  cityPh: string;
  phone: string;
  telegram: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  extra: string;
  aboutLabel: string;
  aboutPh: string;
  aboutHint: string;
  photoUpload: string;
  photoChange: string;
  photoRemove: string;
  photoHint: string;
  photoBadType: string;
  photoTooBig: string;
  // Шаг 2
  institution: string;
  institutionPh: string;
  specialty: string;
  specialtyPh: string;
  years: string;
  yearsPh: string;
  eduTipTitle: string;
  eduTipText: string;
  // Шаг 3
  hardLabel: string;
  hardHint: string;
  hardPh: string;
  softLabel: string;
  softHint: string;
  softPh: string;
  skillsNote: string;
  tagRemove: string;
  // Шаг 4
  projEmptyTitle: string;
  projEmptyText: string;
  projectN: string;
  delete: string;
  fTitle: string;
  fTitlePh: string;
  fStack: string;
  fStackPh: string;
  fDesc: string;
  fDescPh: string;
  fLink: string;
  addProject: string;
  // Шаг 5
  accent: string;
  accentNote: string;
  groupSimple: string;
  groupSimpleDesc: string;
  groupFancy: string;
  groupFancyDesc: string;
  choose: string;
  chosen: string;
  tplModernName: string;
  tplModernDesc: string;
  tplMinimalName: string;
  tplMinimalDesc: string;
  tplCreativeName: string;
  tplCreativeDesc: string;
  tplSimpleName: string;
  tplSimpleDesc: string;
  tplGradientName: string;
  tplGradientDesc: string;
  tplElegantName: string;
  tplElegantDesc: string;
  r: ResumeStrings;
}

const RU: Strings = {
  appTitle: "Конструктор резюме",
  appSubtitle: "для IT-выпускников без опыта",
  fillSample: "Заполнить тестовыми данными",
  reset: "Сбросить форму",
  resetConfirm: "Сбросить форму? Все введённые данные будут удалены.",
  copyLink: "Скопировать ссылку",
  print: "Печать / PDF",
  download: "Скачать PDF",
  creating: "Создание PDF…",
  creatingShort: "Создание…",
  stepsShort: ["Личные данные", "Образование", "Навыки", "Проекты", "Шаблон"],
  stepTitles: [
    "Личные данные",
    "Образование и специальность",
    "Навыки и стек технологий",
    "Учебные проекты и опыт",
    "Выбор шаблона",
  ],
  stepHints: [
    "ФИО, желаемая должность, город, контакты, ссылки и фото. Поля со * обязательны для перехода дальше.",
    "Колледж / ВУЗ, специальность и годы обучения. Поля со * обязательны для перехода дальше.",
    "Hard skills тегами и soft skills — то, что реально использовали.",
    "Курсовые, дипломные и личные проекты — главный блок без опыта.",
    "Выберите 1 из 6 шаблонов: простые или навороченные. Предпросмотр обновляется в реальном времени.",
  ],
  back: "← Назад",
  next: "Далее →",
  autosave: "autosave",
  livePreview: "Live preview",
  liveBadge: "обновляется при вводе",
  scaleNote: "Предпросмотр в масштабе экрана. При экспорте — чистый A4.",
  footer:
    "Данные хранятся только в вашем браузере (localStorage) и в ссылке (?r=…) — бэкенда нет. PDF создаётся локально из выбранного шаблона в формате A4.",
  loading: "Загрузка конструктора…",
  toastLoadedLink: "Резюме загружено по ссылке",
  toastSample: "Заполнено тестовыми данными IT-студента",
  toastReset: "Форма сброшена",
  toastPdfSaved: "PDF сохранён",
  toastPdfFailed: "Не удалось создать PDF. Попробуйте «Печать / PDF»",
  toastLinkCopied: "Уникальная ссылка скопирована",
  stepBlocked: "Сначала заполните обязательные поля предыдущих шагов",
  step1Need: "Шаг 1: заполните ФИО, желаемую должность и телефон",
  step2Need: "Шаг 2: заполните учебное заведение и специальность",
  fieldRequired: "Обязательное поле",
  phoneInvalid: "Введите телефон полностью: +7 (___) ___-__-__",
  fullName: "ФИО *",
  fullNamePh: "Иван Петров",
  position: "Желаемая должность *",
  positionPh: "Junior Frontend Developer",
  city: "Город",
  cityPh: "Москва",
  phone: "Телефон *",
  telegram: "Telegram",
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  extra: "TikTok / YouTube (при наличии)",
  aboutLabel: "О себе / Цель",
  aboutPh: "Студент 4 курса, ищу стажировку Junior-разработчика. 5 учебных проектов на React...",
  aboutHint:
    "2–4 предложения: кто вы, что умеете, какую позицию ищете. Важно при отсутствии коммерческого опыта.",
  photoUpload: "Загрузить фото",
  photoChange: "Заменить фото",
  photoRemove: "Удалить",
  photoHint: "JPG/PNG до 8 МБ. Фото сжимается автоматически.",
  photoBadType: "Выберите файл-изображение (JPG/PNG).",
  photoTooBig: "Файл слишком большой (макс. 8 МБ).",
  institution: "Учебное заведение (Колледж / ВУЗ) *",
  institutionPh: "Московский колледж связи №54",
  specialty: "Специальность / Направление *",
  specialtyPh: "Информационные системы и программирование (09.02.07)",
  years: "Годы обучения",
  yearsPh: "2022 – 2026",
  eduTipTitle: "Совет для выпускников без опыта",
  eduTipText:
    "Укажите точное название специальности и годы — комиссия смотрит на профиль. Курсовые и дипломные проекты добавьте на шаге «Проекты»: это компенсирует отсутствие коммерческого стажа.",
  hardLabel: "Hard skills / Стек технологий",
  hardHint: "Например: JavaScript, 1С:Предприятие, PHP, HTML/CSS, Git, MySQL. Вводите через Enter.",
  hardPh: "Например: JavaScript + Enter",
  softLabel: "Soft skills",
  softHint: "Например: Ответственность, Работа в команде, Быстрая обучаемость.",
  softPh: "Например: Ответственность + Enter",
  skillsNote: "Укажите только то, что реально использовали в проектах. 6–10 hard skills — оптимально для junior-резюме.",
  tagRemove: "Удалить",
  projEmptyTitle: "Пока нет проектов",
  projEmptyText:
    "Добавьте курсовые, дипломные или личные проекты — для выпускника без опыта это главный блок резюме.",
  projectN: "Проект",
  delete: "Удалить",
  fTitle: "Название проекта *",
  fTitlePh: "Например: Сайт колледжа / TaskFlow / Бот расписания",
  fStack: "Использованный стек",
  fStackPh: "Например: React, Tailwind CSS, REST API",
  fDesc: "Краткое описание (что сделано, какая задача решена)",
  fDescPh: "Что сделано, какая задача решена, ваша роль, результат...",
  fLink: "Ссылка на код / проект",
  addProject: "+ Добавить проект",
  accent: "Акцентный цвет",
  accentNote: "Применяется в цветных шаблонах. Minimal и Simple всегда строгие чёрно-белые.",
  groupSimple: "Простые",
  groupSimpleDesc: "Спокойные, строгие — для официальной подачи",
  groupFancy: "Навороченные",
  groupFancyDesc: "Яркие, с характером — чтобы выделиться",
  choose: "Выбрать",
  chosen: "✓ Выбран",
  tplModernName: "Modern",
  tplModernDesc: "Современный, акцент + боковая панель",
  tplMinimalName: "Minimal",
  tplMinimalDesc: "Строгий классический для официальной подачи",
  tplCreativeName: "Creative / IT",
  tplCreativeDesc: "Тёмная контрастная тема, акцент на навыки",
  tplSimpleName: "Simple",
  tplSimpleDesc: "Простой и воздушный: одна колонка, ничего лишнего",
  tplGradientName: "Gradient Pro",
  tplGradientDesc: "Навороченный: градиент, карточки проектов, стеклянные теги",
  tplElegantName: "Elegant",
  tplElegantDesc: "Премиальный: serif-типографика и тонкая рамка",
  r: {
    about: "О себе",
    education: "Образование",
    contacts: "Контакты",
    links: "Ссылки",
    hard: "Hard skills",
    soft: "Soft skills",
    projects: "Учебные проекты",
    projectsMinimal: "Учебные проекты и опыт",
    stackPrefix: "Стек:",
    yourName: "Ваше ФИО",
    yourPosition: "Желаемая должность",
    dash: "—",
    addProjectsNote: "Добавьте курсовые, дипломные или личные проекты на шаге 4.",
    creativeSkillsHint: "Добавьте hard skills на шаге 3 — они появятся здесь тегами.",
    goalFallback: "Без коммерческого опыта. Укажите цель, курс, направление и чем можете быть полезны.",
    graduateBadge: "IT • Выпускник",
    aboutFallback:
      "Без коммерческого опыта: расскажите о цели, мотивации и готовности к стажировке.",
  },
};

const KK: Strings = {
  appTitle: "Түйіндеме конструкторы",
  appSubtitle: "тәжірибесіз IT түлектерге арналған",
  fillSample: "Тест деректермен толтыру",
  reset: "Форманы тазалау",
  resetConfirm: "Форманы тазалау керек пе? Барлық енгізілген деректер жойылады.",
  copyLink: "Сілтемені көшіру",
  print: "Басып шығару / PDF",
  download: "PDF жүктеу",
  creating: "PDF жасалуда…",
  creatingShort: "Жасалуда…",
  stepsShort: ["Жеке деректер", "Білім", "Дағдылар", "Жобалар", "Үлгі"],
  stepTitles: [
    "Жеке деректер",
    "Білім және мамандық",
    "Дағдылар мен технологиялар",
    "Оқу жобалары мен тәжірибе",
    "Үлгіні таңдау",
  ],
  stepHints: [
    "Аты-жөні, қалаған лауазым, қала, байланыстар, сілтемелер және фото. * өрістер әрі қарай өту үшін міндетті.",
    "Колледж / ЖОО, мамандық және оқу жылдары. * өрістер әрі қарай өту үшін міндетті.",
    "Hard skills тегтермен және soft skills — шынымен қолданғандарыңыз.",
    "Курстық, дипломдық және жеке жобалар — тәжірибесіз түлектің басты бөлімі.",
    "6 үлгінің 1-еуін таңдаңыз: қарапайым немесе сәнді. Алдын ала көру нақты уақытта жаңарады.",
  ],
  back: "← Артқа",
  next: "Алға →",
  autosave: "автосақтау",
  livePreview: "Live preview",
  liveBadge: "енгізу кезінде жаңарады",
  scaleNote: "Экран масштабында алдын ала көру. Экспортта — таза A4.",
  footer:
    "Деректер тек сіздің браузеріңізде (localStorage) және сілтемеде (?r=…) сақталады — бэкенд жоқ. PDF таңдалған үлгіден жергілікті түрде A4 форматында жасалады.",
  loading: "Конструктор жүктелуде…",
  toastLoadedLink: "Түйіндеме сілтеме арқылы жүктелді",
  toastSample: "IT студентінің тест деректерімен толтырылды",
  toastReset: "Форма тазаланды",
  toastPdfSaved: "PDF сақталды",
  toastPdfFailed: "PDF жасау сәтсіз. «Басып шығару / PDF» батырмасын көріңіз",
  toastLinkCopied: "Уникалды сілтеме көшірілді",
  stepBlocked: "Алдымен алдыңғы қадамдардың міндетті өрістерін толтырыңыз",
  step1Need: "1-қадам: аты-жөніңізді, қалаған лауазымды және телефонды толтырыңыз",
  step2Need: "2-қадам: оқу орны мен мамандықты толтырыңыз",
  fieldRequired: "Міндетті өріс",
  phoneInvalid: "Телефонды толық енгізіңіз: +7 (___) ___-__-__",
  fullName: "Аты-жөні *",
  fullNamePh: "Айдын Нұрланов",
  position: "Қалаған лауазым *",
  positionPh: "Junior Frontend Developer",
  city: "Қала",
  cityPh: "Алматы",
  phone: "Телефон *",
  telegram: "Telegram",
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  extra: "TikTok / YouTube (бар болса)",
  aboutLabel: "Өзіңіз туралы / Мақсат",
  aboutPh: "4-курс студенті, Junior әзірлеуші тағылымдамасын іздеймін. React-те 5 оқу жобасы...",
  aboutHint:
    "2–4 сөйлем: кімсіз, не білесіз, қандай лауазым іздейсіз. Коммерциялық тәжірибе болмағанда маңызды.",
  photoUpload: "Фото жүктеу",
  photoChange: "Фотаны ауыстыру",
  photoRemove: "Жою",
  photoHint: "JPG/PNG 8 МБ-қа дейін. Фото автоматты түрде сығылады.",
  photoBadType: "Сурет файлын таңдаңыз (JPG/PNG).",
  photoTooBig: "Файл тым үлкен (макс. 8 МБ).",
  institution: "Оқу орны (Колледж / ЖОО) *",
  institutionPh: "Алматы байланыс колледжі",
  specialty: "Мамандық / Бағыт *",
  specialtyPh: "Ақпараттық жүйелер және бағдарламалау",
  years: "Оқу жылдары",
  yearsPh: "2022 – 2026",
  eduTipTitle: "Тәжірибесіз түлектерге кеңес",
  eduTipText:
    "Мамандықтың нақты атауы мен жылдарын көрсетіңіз — комиссия бейінге қарайды. Курстық және дипломдық жобаларды «Жобалар» қадамында қосыңыз: бұл коммерциялық өтілдің жоқтығын толтырады.",
  hardLabel: "Hard skills / Технологиялар",
  hardHint: "Мысалы: JavaScript, 1С:Кәсіпорын, PHP, HTML/CSS, Git, MySQL. Enter арқылы енгізіңіз.",
  hardPh: "Мысалы: JavaScript + Enter",
  softLabel: "Soft skills",
  softHint: "Мысалы: Жауапкершілік, Топта жұмыс, Тез үйрену.",
  softPh: "Мысалы: Жауапкершілік + Enter",
  skillsNote: "Жобаларда шынымен қолданғандарыңызды ғана көрсетіңіз. 6–10 hard skills — junior түйіндемеге оңтайлы.",
  tagRemove: "Жою",
  projEmptyTitle: "Әзірге жобалар жоқ",
  projEmptyText:
    "Курстық, дипломдық немесе жеке жобаларды қосыңыз — тәжірибесіз түлек үшін бұл түйіндеменің басты бөлімі.",
  projectN: "Жоба",
  delete: "Жою",
  fTitle: "Жоба атауы *",
  fTitlePh: "Мысалы: Колледж сайты / TaskFlow / Сабақ кестесі боты",
  fStack: "Қолданылған стек",
  fStackPh: "Мысалы: React, Tailwind CSS, REST API",
  fDesc: "Қысқаша сипаттама (не жасалды, қандай мәселе шешілді)",
  fDescPh: "Не жасалды, қандай мәселе шешілді, сіздің рөліңіз, нәтиже...",
  fLink: "Кодқа / жобаға сілтеме",
  addProject: "+ Жоба қосу",
  accent: "Акцент түсі",
  accentNote: "Түрлі-түсті үлгілерде қолданылады. Minimal және Simple әрқашан қатаң ақ-қара.",
  groupSimple: "Қарапайым",
  groupSimpleDesc: "Сабырлы, қатаң — ресми тапсыруға",
  groupFancy: "Сәнді",
  groupFancyDesc: "Ашық, мінезді — ерекшелену үшін",
  choose: "Таңдау",
  chosen: "✓ Таңдалды",
  tplModernName: "Modern",
  tplModernDesc: "Заманауи, акцент + бүйірлік панель",
  tplMinimalName: "Minimal",
  tplMinimalDesc: "Ресми тапсыруға арналған қатаң классика",
  tplCreativeName: "Creative / IT",
  tplCreativeDesc: "Қараңғы контрасты тема, дағдыларға акцент",
  tplSimpleName: "Simple",
  tplSimpleDesc: "Қарапайым әрі жеңіл: бір баған, артық ештеңе жоқ",
  tplGradientName: "Gradient Pro",
  tplGradientDesc: "Сәнді: градиент, жоба карточкалары, шыны тегтер",
  tplElegantName: "Elegant",
  tplElegantDesc: "Премиум: serif типографика және жіңішке жиек",
  r: {
    about: "Өзі туралы",
    education: "Білім",
    contacts: "Байланыстар",
    links: "Сілтемелер",
    hard: "Hard skills",
    soft: "Soft skills",
    projects: "Оқу жобалары",
    projectsMinimal: "Оқу жобалары мен тәжірибе",
    stackPrefix: "Стек:",
    yourName: "Сіздің аты-жөніңіз",
    yourPosition: "Қалаған лауазым",
    dash: "—",
    addProjectsNote: "4-қадамда курстық, дипломдық немесе жеке жобаларды қосыңыз.",
    creativeSkillsHint: "3-қадамда hard skills қосыңыз — олар мұнда тегтермен шығады.",
    goalFallback: "Коммерциялық тәжірибе жоқ. Мақсатыңызды, курсты, бағытты және қандай пайда әкелетініңізді көрсетіңіз.",
    graduateBadge: "IT • Түлек",
    aboutFallback: "Коммерциялық тәжірибе жоқ: мақсатыңыз, ынтаңыз және тағылымдамаға дайындығыңыз туралы жазыңыз.",
  },
};

export const STRINGS: Record<Lang, Strings> = { ru: RU, kk: KK };

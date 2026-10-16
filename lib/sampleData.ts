import { ResumeData } from "./types";

export const SAMPLE_RESUME: ResumeData = {
  fullName: "Иван Петров",
  position: "Junior Frontend Developer",
  city: "Москва",
  phone: "+7 (900) 123-45-67",
  telegram: "@ivanpetrov_dev",
  email: "ivan.petrov.junior@gmail.com",
  github: "https://github.com/ivanpetrov-dev",
  linkedin: "https://linkedin.com/in/ivanpetrov-dev",
  portfolio: "https://ivanpetrov.dev",
  extraLink: "https://youtube.com/@ivanpetrov-dev",
  photo: "",
  summary:
    "Студент 4 курса колледжа связи, frontend-направление. Без коммерческого опыта, но с 5 завершёнными учебными и личными проектами на React. Быстро обучаюсь, умею работать с чужим кодом и Git, ищу стажировку или позицию Junior Frontend Developer.",
  institution: "Московский колледж связи №54",
  specialty: "Информационные системы и программирование (09.02.07)",
  studyYears: "2022 – 2026",
  hardSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS",
    "Git",
    "REST API",
    "MySQL",
  ],
  softSkills: ["Ответственность", "Работа в команде", "Быстрая обучаемость", "Коммуникабельность"],
  projects: [
    {
      id: "p1",
      title: "Учебный трекер задач — TaskFlow",
      stack: "React, Tailwind CSS, LocalStorage",
      description:
        "SPA для учёта учебных задач: канбан-доска, фильтры, дедлайны. Реализовал drag-and-drop, сохранение в localStorage, адаптив под mobile.",
      link: "https://github.com/ivanpetrov-dev/taskflow",
    },
    {
      id: "p2",
      title: "Дипломный проект — сайт колледжа",
      stack: "Next.js, TypeScript, REST API",
      description:
        "Переработал сайт колледжа в команде из 3 человек: каталог специальностей, новости, форма обратной связи. Отвечал за верстку и интеграцию API.",
      link: "https://github.com/ivanpetrov-dev/college-site",
    },
    {
      id: "p3",
      title: "Бот расписания в Telegram",
      stack: "Node.js, Telegraf, MySQL",
      description:
        "Бот показывает расписание группы, рассылает напоминания о парах. Парсинг Excel-расписания, 120+ активных пользователей в группе.",
      link: "https://github.com/ivanpetrov-dev/schedule-bot",
    },
  ],
  template: "modern",
  accent: "#111827",
};

export const SAMPLE_RESUME_KK: ResumeData = {
  fullName: "Айдын Нұрланов",
  position: "Junior Frontend Developer",
  city: "Алматы",
  phone: "+7 (707) 123-45-67",
  telegram: "@aidyn_dev",
  email: "aidyn.nurlanov.junior@gmail.com",
  github: "https://github.com/aidynnurlanov-dev",
  linkedin: "https://linkedin.com/in/aidynnurlanov-dev",
  portfolio: "https://aidynnurlanov.dev",
  extraLink: "https://youtube.com/@aidynnurlanov-dev",
  photo: "",
  summary:
    "Байланыс колледжінің 4-курс студенті, frontend-бағыт. Коммерциялық тәжірибе жоқ, бірақ React-те 5 аяқталған оқу және жеке жобам бар. Тез үйренемін, бөтен кодпен және Git-пен жұмыс істей аламын, Junior Frontend Developer лауазымына тағылымдама іздеймін.",
  institution: "Алматы байланыс колледжі",
  specialty: "Ақпараттық жүйелер және бағдарламалау",
  studyYears: "2022 – 2026",
  hardSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS",
    "Git",
    "REST API",
    "MySQL",
  ],
  softSkills: ["Жауапкершілік", "Топта жұмыс", "Тез үйрену", "Қарым-қатынас"],
  projects: [
    {
      id: "p1",
      title: "Оқу тапсырмаларының трекері — TaskFlow",
      stack: "React, Tailwind CSS, LocalStorage",
      description:
        "Оқу тапсырмаларын есепке алуға арналған SPA: канбан-тақта, сүзгілер, дедлайндар. Drag-and-drop, localStorage-та сақтау, mobile-ге бейімделу жасалды.",
      link: "https://github.com/aidynnurlanov-dev/taskflow",
    },
    {
      id: "p2",
      title: "Дипломдық жоба — колледж сайты",
      stack: "Next.js, TypeScript, REST API",
      description:
        "3 адамнан тұратын топта колледж сайтын қайта жасадық: мамандықтар каталогы, жаңалықтар, кері байланыс формасы. Верстка мен API интеграциясына жауап бердім.",
      link: "https://github.com/aidynnurlanov-dev/college-site",
    },
    {
      id: "p3",
      title: "Telegram-да сабақ кестесі боты",
      stack: "Node.js, Telegraf, MySQL",
      description:
        "Бот топтың сабақ кестесін көрсетеді, сабақтар туралы ескерту жібереді. Excel-кестені парсингтеу, топта 120+ белсенді қолданушы.",
      link: "https://github.com/aidynnurlanov-dev/schedule-bot",
    },
  ],
  template: "modern",
  accent: "#111827",
};

export const HARD_SKILL_SUGGESTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "HTML/CSS",
  "Tailwind CSS",
  "1С:Предприятие",
  "PHP",
  "Python",
  "Node.js",
  "Git",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Linux",
  "REST API",
  "Figma",
];

export const SOFT_SKILL_SUGGESTIONS = [
  "Ответственность",
  "Работа в команде",
  "Быстрая обучаемость",
  "Коммуникабельность",
  "Внимательность к деталям",
  "Тайм-менеджмент",
];

export const SOFT_SKILL_SUGGESTIONS_KK = [
  "Жауапкершілік",
  "Топта жұмыс",
  "Тез үйрену",
  "Қарым-қатынас",
  "Ұқыптылық",
  "Уақытты басқару",
];

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Конструктор резюме для IT-выпускников",
  description:
    "SPA для студентов без коммерческого опыта: пошаговая форма со строгой валидацией, 6 шаблонов, live-preview A4, экспорт в PDF без бэкенда, RU/KZ, тёмная тема, сохранение в localStorage и шаринг по ссылке.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans">
        {/* Тема до первой отрисовки: без мигания и зависимости от React */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('it-resume-theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}

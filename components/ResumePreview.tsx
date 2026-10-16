"use client";

import { ResumeData } from "@/lib/types";
import { ResumeStrings } from "@/lib/i18n";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import SimpleTemplate from "./templates/SimpleTemplate";
import GradientTemplate from "./templates/GradientTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

export default function ResumePreview({
  data,
  r,
  darkPreview,
}: {
  data: ResumeData;
  r: ResumeStrings;
  darkPreview: boolean;
}) {
  return (
    <div className={["print-container w-full", darkPreview ? "preview-dark" : ""].join(" ")}>
      <div
        id="resume-a4"
        className="mx-auto overflow-hidden rounded-lg bg-white shadow-a4 ring-1 ring-zinc-200 dark:ring-zinc-700"
      >
        {data.template === "modern" && <ModernTemplate data={data} r={r} />}
        {data.template === "minimal" && <MinimalTemplate data={data} r={r} />}
        {data.template === "creative" && <CreativeTemplate data={data} r={r} />}
        {data.template === "simple" && <SimpleTemplate data={data} r={r} />}
        {data.template === "gradient" && <GradientTemplate data={data} r={r} />}
        {data.template === "elegant" && <ElegantTemplate data={data} r={r} />}
      </div>
    </div>
  );
}

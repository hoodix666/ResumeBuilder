export type TemplateId = "modern" | "minimal" | "creative" | "simple" | "gradient" | "elegant";

export interface Project {
  id: string;
  title: string;
  stack: string;
  description: string;
  link: string;
}

export interface ResumeData {
  fullName: string;
  position: string;
  city: string;
  phone: string;
  telegram: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  extraLink: string;
  photo: string; // dataURL or ""
  summary: string;
  institution: string;
  specialty: string;
  studyYears: string;
  hardSkills: string[];
  softSkills: string[];
  projects: Project[];
  template: TemplateId;
  accent: string; // hex
}

export const EMPTY_RESUME: ResumeData = {
  fullName: "",
  position: "",
  city: "",
  phone: "",
  telegram: "",
  email: "",
  github: "",
  linkedin: "",
  portfolio: "",
  extraLink: "",
  photo: "",
  summary: "",
  institution: "",
  specialty: "",
  studyYears: "",
  hardSkills: [],
  softSkills: [],
  projects: [],
  template: "modern",
  accent: "#111827",
};

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

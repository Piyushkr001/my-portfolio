export type ExperienceCategory =
  | "qa-maintenance"
  | "fullstack"
  | "internship"
  | "data-analytics"
  | "frontend";

export type EmploymentType =
  | "Professional Experience"
  | "Project Engagement"
  | "Internship"
  | "Technical Training"
  | "Training";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  employmentType: EmploymentType;
  category: ExperienceCategory;
  isCurrent?: boolean;
  responsibilities: string[];
  technologies: string[];
  technologiesLabel?: string;
}

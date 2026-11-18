export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "data-auth"
  | "ai"
  | "tools";

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  items: string[];
}

import { SKILLS } from "./skillList.js";

export const extractSkills = (text) => {
  const lower = text.toLowerCase();
  return SKILLS.filter(skill => lower.includes(skill));
};

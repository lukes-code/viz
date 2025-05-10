import { Stage } from "../../types";

export const flowTemplates: Record<string, Stage[]> = {
  "Basic CI Flow": [
    { name: "Local", type: "env", isJoin: false },
    { name: "Raise PR", type: "manual", isJoin: false },
    { name: "CI/CD", type: "automation", isJoin: true },
    { name: "Review PR", type: "automation", isJoin: false },
    { name: "Merge PR", type: "manual", isJoin: false },
    { name: "Deploy", type: "automation", isJoin: false },
  ],
  "Review Flow": [
    { name: "Raise PR", type: "manual", isJoin: false },
    { name: "Review PR", type: "manual", isJoin: true },
    { name: "Chromatic", type: "manual", isJoin: true },
    { name: "CI", type: "automation", isJoin: false },
    { name: "Merge PR", type: "manual", isJoin: false },
  ],
};

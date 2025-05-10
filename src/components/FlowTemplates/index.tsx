import { Stage } from "../../types";

export const flowTemplates: Record<string, Stage[]> = {
  "Basic CI Flow": [
    { name: "Local", label: "Environment", color: "#FF5733", isJoin: false },
    { name: "Raise PR", label: "Manual", color: "#3357FF", isJoin: false },
    { name: "CI/CD", label: "Automation", color: "#9DFF33", isJoin: true },
    { name: "Review PR", label: "Automation", color: "#9DFF33", isJoin: false },
    { name: "Merge PR", label: "Manual", color: "#3357FF", isJoin: false },
    { name: "Deploy", label: "Automation", color: "#9DFF33", isJoin: false },
  ],
  "Review Flow": [
    { name: "Raise PR", label: "manual", color: "#3357FF", isJoin: false },
    { name: "Review PR", label: "manual", color: "#3357FF", isJoin: true },
    { name: "Chromatic", label: "manual", color: "#3357FF", isJoin: true },
    { name: "CI", label: "Automation", color: "#9DFF33", isJoin: false },
    { name: "Merge PR", label: "Manual", color: "#3357FF", isJoin: false },
  ],
};

import { FlowData, Stage } from "../types";

export type FlowRepo = {
  stages: Stage[];
};

export const defaultFlowData: FlowData = {
  frontend: {
    stages: [
      { name: "Local", type: "env", isJoin: false },
      { name: "Raise PR", type: "manual", isJoin: false },
      { name: "Review PR", type: "manual", isJoin: true },
      { name: "Chromatic", type: "manual", isJoin: true },
      { name: "CI/CD", type: "automation", isJoin: false },
      { name: "Merge PR", type: "manual", isJoin: false },
      { name: "Testing", type: "env", isJoin: false },
    ],
    description: "A frontend repository", // Add description here
    coreTech: "React", // Add core technologies here
  },
  backend: {
    stages: [
      { name: "Local", type: "env", isJoin: false },
      { name: "Raise PR", type: "manual", isJoin: false },
      { name: "Review PR", type: "manual", isJoin: true },
      { name: "CI/CD", type: "automation", isJoin: false },
      { name: "Merge PR", type: "manual", isJoin: false },
      { name: "Testing", type: "env", isJoin: false },
    ],
    description: "A backend repository", // Add description here
    coreTech: "Node.js", // Add core technologies here
  },
};

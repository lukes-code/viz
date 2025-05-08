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
  },
};

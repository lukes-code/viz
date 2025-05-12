import { FlowData, Stage } from "../types";

export type FlowFlow = {
  stages: Stage[];
};

export const defaultFlowData: FlowData = {
  "Frontend lifecycle": {
    stages: [
      {
        name: "Local",
        stageNumber: 1,
        label: "Environment",
        color: "#33FFEC",
      },
      {
        name: "Raise PR",
        stageNumber: 2,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "Review PR",
        stageNumber: 3,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "Chromatic",
        stageNumber: 3,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "CI/CD",
        stageNumber: 3,
        label: "Automation",
        color: "#9DFF33",
      },
      {
        name: "Merge PR",
        stageNumber: 4,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "Testing",
        stageNumber: 5,
        label: "Environment",
        color: "#33FFEC",
      },
    ],
    description: "A frontend flowsitory", // Add description here
    coreTech: ["React"], // Add core technologies here
  },
  "API Deployment": {
    stages: [
      {
        name: "Local",
        stageNumber: 1,
        label: "Environment",
        color: "#33FFEC",
      },
      {
        name: "Raise PR",
        stageNumber: 2,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "Review PR",
        stageNumber: 3,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "CI/CD",
        stageNumber: 3,
        label: "Automation",
        color: "#9DFF33",
      },
      {
        name: "Merge PR",
        stageNumber: 4,
        label: "Manual",
        color: "#F5FF33",
      },
      {
        name: "Testing",
        stageNumber: 5,
        label: "Environment",
        color: "#33FFEC",
      },
    ],
    description: "A flow for API deployment", // Add description here
    coreTech: ["Node.js"], // Add core technologies here
  },
};

// Default Node Types (Custom Types)
export const defaultCustomTypes = {
  frontend: { label: "Manual", color: "#F5FF33" },
  backend: { label: "Automation", color: "#9DFF33" },
  database: { label: "Environment", color: "#33FFEC" },
};

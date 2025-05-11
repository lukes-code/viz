import { FlowData, Stage } from "../types";

export type FlowRepo = {
  stages: Stage[];
};

export const defaultFlowData: FlowData = {
  "Frontend lifecycle": {
    stages: [
      {
        name: "Local",
        stageNumber: 1,
        label: "Environment",
        color: "#FF5733",
      },
      {
        name: "Raise PR",
        stageNumber: 2,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Review PR",
        stageNumber: 3,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Chromatic",
        stageNumber: 3,
        label: "Manual",
        color: "#3357FF",
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
        color: "#3357FF",
      },
      {
        name: "Testing",
        stageNumber: 5,
        label: "Environment",
        color: "#FF5733",
      },
    ],
    description: "A frontend repository", // Add description here
    coreTech: ["React"], // Add core technologies here
  },
  "API Deployment": {
    stages: [
      {
        name: "Local",
        stageNumber: 1,
        label: "Environment",
        color: "#FF5733",
      },
      {
        name: "Raise PR",
        stageNumber: 2,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Review PR",
        stageNumber: 3,
        label: "Manual",
        color: "#3357FF",
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
        color: "#3357FF",
      },
      {
        name: "Testing",
        stageNumber: 5,
        label: "Environment",
        color: "#FF5733",
      },
    ],
    description: "A flow for API deployment", // Add description here
    coreTech: ["Node.js"], // Add core technologies here
  },
};

// Default Node Types (Custom Types)
export const defaultCustomTypes = {
  frontend: { label: "Manual", color: "#3357FF" },
  backend: { label: "Automation", color: "#9DFF33" },
  database: { label: "Environment", color: "#FF5733" },
};

import { FlowData, Stage } from "../types";

export type FlowRepo = {
  stages: Stage[];
};

export const defaultFlowData: FlowData = {
  frontend: {
    stages: [
      {
        name: "Local",
        isJoin: false,
        label: "Environment",
        color: "#FF5733",
      },
      {
        name: "Raise PR",
        isJoin: false,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Review PR",
        isJoin: true,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Chromatic",
        isJoin: true,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "CI/CD",
        isJoin: false,
        label: "Automation",
        color: "#9DFF33",
      },
      {
        name: "Merge PR",
        isJoin: false,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Testing",
        isJoin: false,
        label: "Environment",
        color: "#FF5733",
      },
    ],
    description: "A frontend repository", // Add description here
    coreTech: ["React"], // Add core technologies here
  },
  backend: {
    stages: [
      {
        name: "Local",
        isJoin: false,
        label: "Environment",
        color: "#FF5733",
      },
      {
        name: "Raise PR",
        isJoin: false,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Review PR",
        isJoin: true,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "CI/CD",
        isJoin: false,
        label: "Automation",
        color: "#9DFF33",
      },
      {
        name: "Merge PR",
        isJoin: false,
        label: "Manual",
        color: "#3357FF",
      },
      {
        name: "Testing",
        isJoin: false,
        label: "Environment",
        color: "#FF5733",
      },
    ],
    description: "A backend repository", // Add description here
    coreTech: ["Node.js"], // Add core technologies here
  },
};

// Default Node Types (Custom Types)
export const defaultCustomTypes = {
  frontend: { label: "Manual", color: "#3357FF" },
  backend: { label: "Automation", color: "#9DFF33" },
  database: { label: "Environment", color: "#FF5733" },
};

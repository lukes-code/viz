export type Stage = {
  name: string;
  type: "env" | "automation" | "manual"; // Allows for "env", "automation", and "manual"
  isJoin: boolean; // Determines if this stage is part of an asynchronous flow (join)
  label: string;
  color: string; // Color of the stage
};

export type FlowRepo = {
  stages: Stage[];
};

export type FlowCanvasProps = {
  repo: string;
  stages: Stage[];
};

export type FlowData = {
  [key: string]: {
    stages: Stage[]; // Each repo now has stages that can contain custom types
    description: string;
    coreTech: string[];
  };
};

export type Stage = {
  name: string;
  type: "env" | "automation" | "manual"; // Allows for "env", "automation", and "manual"
  isJoin: boolean; // Determines if this stage is part of an asynchronous flow (join)
};

export type FlowRepo = {
  stages: Stage[];
};

export type FlowCanvasProps = {
  repo: string;
  stages: Stage[];
};

export type FlowData = Record<string, FlowRepo>;

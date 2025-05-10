export type Stage = {
  name: string;
  isJoin: boolean;
  label: string;
  color: string;
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
    stages: Stage[];
    description: string;
    coreTech: string[];
  };
};

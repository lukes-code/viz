export type Stage = {
  name: string;
  stageNumber: number;
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

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

import { useRef, useImperativeHandle, forwardRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  Node,
  Edge,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { Stage } from "../../types";
import * as htmlToImage from "html-to-image";

type FlowCanvasProps = {
  stages: Stage[];
};

export const FlowCanvas = forwardRef(({ stages }: FlowCanvasProps, ref) => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let nodeId = 1;
  let y = 0;
  const xSpacing = 200;
  const ySpacing = 150;

  // Group stages by stageNumber
  const groupedStages = stages.reduce((acc, stage) => {
    const num = stage.stageNumber ?? 0;
    if (!acc[num]) acc[num] = [];
    acc[num].push(stage);
    return acc;
  }, {} as Record<number, Stage[]>);

  // Sort stage numbers
  const sortedStageNumbers = Object.keys(groupedStages)
    .map(Number)
    .sort((a, b) => a - b);

  const stageIdMap = new Map<number, number[]>(); // track node IDs per stageNumber

  for (let i = 0; i < sortedStageNumbers.length; i++) {
    const stageNum = sortedStageNumbers[i];
    const group = groupedStages[stageNum];
    const totalWidth = (group.length - 1) * xSpacing;
    const centerX = -totalWidth / 2;

    const currentNodeIds: number[] = [];

    for (let j = 0; j < group.length; j++) {
      const stage = group[j];
      const node = {
        id: `${nodeId}`,
        data: { label: stage.name },
        position: { x: centerX + j * xSpacing, y },
        style: {
          backgroundColor: `${stage.color}`,
          padding: 10,
          borderRadius: 5,
        },
      };
      nodes.push(node);
      currentNodeIds.push(nodeId);
      nodeId++;
    }

    stageIdMap.set(stageNum, currentNodeIds);

    // Connect previous stage to this one
    if (i > 0) {
      const prevIds = stageIdMap.get(sortedStageNumbers[i - 1])!;
      for (const sourceId of prevIds) {
        for (const targetId of currentNodeIds) {
          edges.push({
            id: `e${sourceId}-${targetId}`,
            source: `${sourceId}`,
            target: `${targetId}`,
            animated: true,
          });
        }
      }
    }

    y += ySpacing * 2;
  }

  useImperativeHandle(ref, () => ({
    exportToJson: () => {
      if (reactFlowInstance.current) {
        const flow = reactFlowInstance.current.toObject();
        const blob = new Blob([JSON.stringify(flow, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "flow.json";
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    exportToImage: () => {
      if (reactFlowWrapper.current) {
        htmlToImage
          .toPng(reactFlowWrapper.current)
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "flow.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error("Image export failed", err);
          });
      }
    },
  }));

  return (
    <div className="h-[800px] relative bg-white text-gray-900 rounded-xl shadow overflow-hidden">
      <ReactFlowProvider>
        <div className="w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onInit={(instance) => {
              reactFlowInstance.current = instance;
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
});

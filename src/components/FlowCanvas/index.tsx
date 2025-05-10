import React, { useRef, useImperativeHandle, forwardRef } from "react";
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
  let x = 0;
  const xSpacing = 200;
  const ySpacing = 150;

  for (let i = 0; i < stages.length; ) {
    const stage = stages[i];

    if (stage.isJoin) {
      const joinGroup: { stage: Stage; index: number; nodeId: number }[] = [];
      let j = i;

      while (
        j < stages.length &&
        (stages[j].isJoin || (j > i && stages[j - 1].isJoin))
      ) {
        joinGroup.push({ stage: stages[j], index: j, nodeId });
        j++;
        nodeId++;
      }

      const startX = x;
      const totalWidth = (joinGroup.length - 1) * xSpacing;
      const centerX = startX - totalWidth / 2;

      for (let k = 0; k < joinGroup.length; k++) {
        const { stage, nodeId: id } = joinGroup[k];
        nodes.push({
          id: `${id}`,
          data: { label: `${stage.name}` },
          position: { x: centerX + k * xSpacing, y },
          style: {
            backgroundColor: `${stage.color}`,
            padding: 10,
            borderRadius: 5,
          },
        });
      }

      if (i > 0) {
        const sourceId = `${nodeId - joinGroup.length - 1}`;
        for (const { nodeId: targetId } of joinGroup) {
          edges.push({
            id: `e${sourceId}-${targetId}`,
            source: sourceId,
            target: `${targetId}`,
            animated: true,
          });
        }
      }

      const nextIndex = j;
      if (nextIndex < stages.length) {
        const nextStage = stages[nextIndex];
        const targetId = `${nodeId}`;

        nodes.push({
          id: targetId,
          data: { label: `${nextStage.name}` },
          position: {
            x: centerX + ((joinGroup.length - 1) * xSpacing) / 2,
            y: y + ySpacing,
          },
          style: {
            backgroundColor: `${nextStage.color}`,
            padding: 10,
            borderRadius: 5,
          },
        });

        for (const { nodeId: sourceId } of joinGroup) {
          edges.push({
            id: `e${sourceId}-${nodeId}`,
            source: `${sourceId}`,
            target: targetId,
            animated: true,
          });
        }

        nodeId++;
        i = nextIndex + 1;
      } else {
        i = j;
      }

      y += 2 * ySpacing;
      x = 0;
    } else {
      nodes.push({
        id: `${nodeId}`,
        data: { label: `${stage.name}` },
        position: { x, y },
        style: {
          backgroundColor: `${stage.color}`,
          padding: 10,
          borderRadius: 5,
        },
      });

      if (nodeId > 1) {
        edges.push({
          id: `e${nodeId - 1}-${nodeId}`,
          source: `${nodeId - 1}`,
          target: `${nodeId}`,
          animated: true,
        });
      }

      nodeId++;
      i++;
      y += ySpacing;
    }
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

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

type Stage = {
  name: string;
  type: string;
  isJoin: boolean;
};

type FlowCanvasProps = {
  repo: string;
  stages: Stage[];
};

const getNodeColor = (type: string): string => {
  switch (type) {
    case "env":
      return "lightgreen";
    case "manual":
      return "lightblue";
    case "automation":
      return "orange";
    default:
      return "gray";
  }
};

export const FlowCanvas = ({ repo, stages }: FlowCanvasProps) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let nodeId = 1;
  let y = 0;
  let x = 0;
  const xSpacing = 200; // Horizontal spacing between nodes
  const ySpacing = 150; // Vertical spacing between nodes

  for (let i = 0; i < stages.length; ) {
    const stage = stages[i];

    if (stage.isJoin) {
      const joinGroup: { stage: Stage; index: number; nodeId: number }[] = [];
      let j = i;

      // Group all isJoin:true + the immediate next item
      while (
        j < stages.length &&
        (stages[j].isJoin || (j > i && stages[j - 1].isJoin))
      ) {
        joinGroup.push({ stage: stages[j], index: j, nodeId });
        j++;
        nodeId++;
      }

      const startX = x;
      const totalWidth = (joinGroup.length - 1) * xSpacing; // Total width of the group

      // Center the isJoin nodes horizontally
      const centerX = startX - totalWidth / 2;

      // Position the isJoin nodes horizontally in the group
      for (let k = 0; k < joinGroup.length; k++) {
        const { stage, nodeId: id } = joinGroup[k];
        nodes.push({
          id: `${id}`,
          data: { label: `${stage.name} (${stage.type})` },
          position: { x: centerX + k * xSpacing, y },
          style: {
            backgroundColor: getNodeColor(stage.type),
            padding: 10,
            borderRadius: 5,
          },
        });
      }

      // 🔧 Connect previous node to ALL join group members
      if (i > 0) {
        const sourceId = `${nodeId - joinGroup.length - 1}`;
        for (const { nodeId: targetId } of joinGroup) {
          edges.push({
            id: `e${sourceId}-${targetId}`,
            source: sourceId,
            target: `${targetId}`,
            animated: true,
            // label: `${stages[i - 1].name} → ${stage.name}`,
          });
        }
      }

      // Next stage to connect to all join group items
      const nextIndex = j;
      if (nextIndex < stages.length) {
        const nextStage = stages[nextIndex];
        const targetId = `${nodeId}`;

        nodes.push({
          id: targetId,
          data: { label: `${repo}: ${nextStage.name} (${nextStage.type})` },
          position: {
            x: centerX + ((joinGroup.length - 1) * xSpacing) / 2, // Center the target node
            y: y + ySpacing,
          },
          style: {
            backgroundColor: getNodeColor(nextStage.type),
            padding: 10,
            borderRadius: 5,
          },
        });

        for (const { nodeId: sourceId, stage } of joinGroup) {
          edges.push({
            id: `e${sourceId}-${nodeId}`,
            source: `${sourceId}`,
            target: targetId,
            animated: true,
            // label: `${stage.name} → ${nextStage.name}`,
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
      // Regular non-join stage
      nodes.push({
        id: `${nodeId}`,
        data: { label: `${repo}: ${stage.name} (${stage.type})` },
        position: { x, y },
        style: {
          backgroundColor: getNodeColor(stage.type),
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
          // label: `${stages[i - 1].name} → ${stage.name}`,
        });
      }

      nodeId++;
      i++;
      y += ySpacing;
    }
  }

  return (
    <div className="h-[1000px] bg-white rounded-xl shadow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;

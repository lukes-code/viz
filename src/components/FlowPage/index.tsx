import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import { FlowCanvas } from "../FlowCanvas";
import { FlowData } from "../../types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type FlowPageProps = {
  flowData: FlowData;
  customTypes: { [key: string]: { label: string; color: string } };
};

const FlowPage = ({ flowData, customTypes }: FlowPageProps) => {
  const { repo } = useParams<{ repo: string }>();
  const canvasRef = useRef<any>(null);

  if (!repo || !flowData[repo]) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Flow not found!</h2>
        <Link to="/" className="text-blue-500 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const stages = flowData[repo].stages;

  const handleExport = (type: "json" | "image") => {
    if (!canvasRef.current) return;
    if (type === "json") canvasRef.current.exportToJson();
    if (type === "image") canvasRef.current.exportToImage();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{repo} flow</h2>
        <div className="flex items-center text-gray-900 space-x-4">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm">
                Export ▼
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={5}
              className="bg-white border shadow-md rounded p-1 w-32 z-50"
            >
              <DropdownMenu.Item
                onSelect={() => handleExport("json")}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                To JSON
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => handleExport("image")}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                To image
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Link to="/" className="text-sm text-blue-300 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-2">Node types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(customTypes).map((type) => {
            const nodeType = customTypes[type];
            return (
              <div key={type} className="flex items-center">
                <span
                  style={{ backgroundColor: nodeType.color }}
                  className="w-4 h-4 rounded-full mr-2"
                ></span>
                <span className="text-sm">{nodeType.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <FlowCanvas ref={canvasRef} stages={stages} />
    </div>
  );
};

export default FlowPage;

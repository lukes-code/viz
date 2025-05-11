import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlowData } from "../../types";
import ConfirmModal from "../ConfirmModal";
import Card from "../Card";
import {
  ExternalLinkIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

type Props = {
  flowData: FlowData;
  setFlowData: React.Dispatch<React.SetStateAction<FlowData>>;
  customTypes: { [key: string]: { label: string; color: string } };
};

const StageVisualiser = ({ flowData, setFlowData, customTypes }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flowToDelete, setFlowToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeleteFlow = (flowName: string) => {
    setFlowToDelete(flowName);
    setShowDeleteModal(true);
  };

  const confirmDeleteFlow = () => {
    if (flowToDelete) {
      const updatedFlowData = { ...flowData };
      delete updatedFlowData[flowToDelete];
      setFlowData(updatedFlowData);
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteFlow = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full px-6 py-12 min-h-[100vh] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Flows Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Flows</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Object.keys(flowData).map((flow) => (
            <Card
              key={flow}
              title={flow}
              actions={
                <>
                  <button
                    onClick={() => navigate(`/edit/${flow}`)}
                    className="text-white hover:text-gray-300 cursor-pointer"
                    title="Edit"
                  >
                    <Pencil1Icon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/flow/${flow}`)}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    title="View"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFlow(flow)}
                    title="Delete"
                    className="text-gray-400 hover:text-red-400 absolute bottom-6 right-8 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </>
              }
            >
              {/* Pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-600 text-white py-1 px-3 rounded-full text-xs">
                  {flowData[flow].coreTech}
                </span>
                <span className="bg-gray-700 text-white py-1 px-3 rounded-full text-xs">
                  {flowData[flow].stages.length} steps
                </span>
              </div>

              {/* Description */}
              <div className="text-sm text-white mt-2 truncate max-w-[85%]">
                {flowData[flow].description || "No description"}
              </div>
            </Card>
          ))}

          <button
            onClick={() => navigate("/create")}
            className="cursor-pointer p-6 min-h-[154px] rounded-xl bg-white/5 backdrop-blur border border-dashed border-white/10 shadow-inner flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-semibold">+ Add flow</span>
          </button>
        </div>

        {/* Node Types Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Node types</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Object.keys(customTypes).map((type) => {
            const nodeType = customTypes[type];
            return (
              <Card key={type} title={nodeType.label} actions={null}>
                {/* Color Pill */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    style={{ backgroundColor: nodeType.color }}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-sm text-white">{nodeType.label}</span>
                </div>
              </Card>
            );
          })}

          <button
            onClick={() => navigate("/create-node-types")}
            className="cursor-pointer p-6 min-h-[122px] rounded-xl bg-white/5 backdrop-blur border border-dashed border-white/10 shadow-inner flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-semibold">+ Add type</span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Are you sure you want to delete this flow?"
        onCancel={cancelDeleteFlow}
        onConfirm={confirmDeleteFlow}
      />
    </div>
  );
};

export default StageVisualiser;

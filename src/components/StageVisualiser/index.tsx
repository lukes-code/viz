import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlowData } from "../../types";
import ConfirmModal from "../ConfirmModal";
import Card from "../Card";

type Props = {
  flowData: FlowData;
  setFlowData: React.Dispatch<React.SetStateAction<FlowData>>;
  customTypes: { [key: string]: { label: string; color: string } };
};

const StageVisualiser = ({ flowData, setFlowData, customTypes }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeleteRepo = (repoName: string) => {
    setRepoToDelete(repoName);
    setShowDeleteModal(true);
  };

  const confirmDeleteRepo = () => {
    if (repoToDelete) {
      const updatedFlowData = { ...flowData };
      delete updatedFlowData[repoToDelete];
      setFlowData(updatedFlowData);
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteRepo = () => {
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
          {Object.keys(flowData).map((repo) => (
            <Card
              key={repo}
              title={repo}
              actions={
                <>
                  <button
                    onClick={() => navigate(`/edit/${repo}`)}
                    className="text-white hover:text-gray-300"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => navigate(`/flow/${repo}`)}
                    className="text-blue-400 hover:text-blue-300"
                    title="View"
                  >
                    ↗
                  </button>
                  <button
                    onClick={() => handleDeleteRepo(repo)}
                    title="Delete"
                    className="text-red-500 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </>
              }
            >
              {/* Pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-600 text-white py-1 px-3 rounded-full text-xs">
                  {flowData[repo].coreTech}
                </span>
                <span className="bg-gray-700 text-white py-1 px-3 rounded-full text-xs">
                  {flowData[repo].stages.length} steps
                </span>
              </div>

              {/* Description */}
              <div className="text-sm text-white mt-2 truncate">
                {flowData[repo].description || "No description"}
              </div>
            </Card>
          ))}

          <button
            onClick={() => navigate("/create")}
            className="p-6 min-h-[154px] rounded-xl bg-white/5 backdrop-blur border border-dashed border-white/10 shadow-inner flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-semibold">+ Add new flow</span>
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
                  ></span>
                  <span className="text-sm text-white">{nodeType.label}</span>
                </div>
              </Card>
            );
          })}

          <button
            onClick={() => navigate("/create-node-types")}
            className="p-6 min-h-[154px] rounded-xl bg-white/5 backdrop-blur border border-dashed border-white/10 shadow-inner flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-semibold">+ Add new type</span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Are you sure you want to delete this repo?"
        onCancel={cancelDeleteRepo}
        onConfirm={confirmDeleteRepo}
      />
    </div>
  );
};

export default StageVisualiser;

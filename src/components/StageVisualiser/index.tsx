import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlowData } from "../../types";
import ConfirmModal from "../ConfirmModal";

type Props = {
  flowData: FlowData;
  setFlowData: React.Dispatch<React.SetStateAction<FlowData>>;
};

const StageVisualiser = ({ flowData, setFlowData }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateRepo = () => {
    navigate("/create");
  };

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Flows</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(flowData).map((repo) => (
            <div
              key={repo}
              className="p-6 relative rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-inner flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="font-semibold text-lg text-white">{repo}</div>
                <div className="flex space-x-2 text-sm">
                  {/* New Pen Icon */}
                  <button
                    onClick={() => navigate(`/edit/${repo}`)}
                    className="text-white hover:text-gray-300 cursor-pointer"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a2.25 2.25 0 013.181 3.181l-10.5 10.5a4.5 4.5 0 01-1.591.99l-3.511 1.17 1.17-3.511a4.5 4.5 0 01.99-1.591l10.5-10.5z"
                      />
                    </svg>
                  </button>

                  {/* Diagonal Arrow Icon */}
                  <button
                    onClick={() => navigate(`/flow/${repo}`)}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    title="View"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

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

              {/* Trash Icon in Bottom Right */}
              <button
                onClick={() => handleDeleteRepo(repo)}
                title="Delete"
                className="absolute bottom-3 right-5 cursor-pointer text-red-500 hover:text-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Add Flow Card */}
          <button
            onClick={handleCreateRepo}
            className="p-6 cursor-pointer rounded-xl bg-white/5 backdrop-blur border border-dashed border-white/10 shadow-inner flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-lg font-semibold">+ Add new flow</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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

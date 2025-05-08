import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlowData } from "../../types";

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
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Repositories</h2>
      <button
        onClick={handleCreateRepo}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Repo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(flowData).map((repo) => (
          <div
            key={repo}
            className="bg-white p-6 rounded shadow-lg flex flex-col items-start"
          >
            <div className="flex justify-between w-full mb-4">
              <div className="font-bold text-lg">{repo}</div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/flow/${repo}`)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/edit/${repo}`)}
                  className="text-green-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRepo(repo)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="space-y-2 w-full mb-4">
              {flowData[repo].stages.map((stage, idx) => (
                <li key={idx} className="inline-block mr-2">
                  <span className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm">
                    {stage.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this repo?
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDeleteRepo}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRepo}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageVisualiser;

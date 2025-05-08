import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stage } from "../../types";

type FlowData = {
  [repo: string]: {
    stages: Stage[];
  };
};

type Props = {
  flowData: FlowData;
  setFlowData: React.Dispatch<React.SetStateAction<FlowData>>;
};

const RepoPage = ({ flowData, setFlowData }: Props) => {
  const { repo } = useParams<{ repo: string }>();
  const navigate = useNavigate();

  const isEditMode = repo !== undefined;
  const repoData = flowData[repo ?? ""] ?? { stages: [] };

  const [repoName, setRepoName] = useState(isEditMode ? repo : "");
  const [stages, setStages] = useState<Stage[]>(
    repoData.stages.length > 0
      ? repoData.stages
      : [{ name: "", type: "env", isJoin: false }]
  );

  useEffect(() => {
    if (isEditMode && repoData.stages) {
      setStages(repoData.stages);
    }
  }, [isEditMode, repoData]);

  const handleStageChange = (
    index: number,
    key: keyof Stage,
    value: string | boolean
  ) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], [key]: value };
    setStages(updated);
  };

  const handleAddStage = () =>
    setStages([...stages, { name: "", type: "env", isJoin: false }]);

  const handleRemoveStage = (index: number) => {
    const updated = [...stages];
    updated.splice(index, 1);
    setStages(updated);
  };

  const handleSave = () => {
    if (!repoName.trim()) return alert("Repo name is required");

    const updatedFlowData = { ...flowData };

    if (isEditMode && repoName !== repo && flowData[repoName]) {
      return alert("A repo with that name already exists.");
    }

    if (isEditMode) {
      delete updatedFlowData[repo ?? ""];
    }

    updatedFlowData[repoName] = {
      stages: stages.filter((s) => s.name.trim()),
    };

    setFlowData(updatedFlowData);
    navigate("/");
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? `Edit Repo: ${repo}` : "Create New Repo"}
      </h2>

      <input
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Repo name (e.g., api, ui)"
      />

      {stages.map((stage, i) => (
        <div key={i} className="flex items-center mb-2 gap-2">
          <input
            value={stage.name}
            onChange={(e) => handleStageChange(i, "name", e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder={`Stage ${i + 1}`}
          />
          <select
            value={stage.type}
            onChange={(e) =>
              handleStageChange(
                i,
                "type",
                e.target.value as "env" | "automation" | "manual"
              )
            }
            className="border p-2 rounded"
          >
            <option value="env">Environment</option>
            <option value="automation">Automation</option>
            <option value="manual">Manual Trigger</option>
          </select>
          <label className="ml-2">
            <input
              type="checkbox"
              checked={stage.isJoin}
              onChange={(e) => handleStageChange(i, "isJoin", e.target.checked)}
            />
            Join next step
          </label>
          <button
            onClick={() => handleRemoveStage(i)}
            className="text-red-500 hover:underline"
            disabled={stages.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAddStage}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add Step
      </button>

      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {isEditMode ? "Save Changes" : "Create Repo"}
      </button>
    </div>
  );
};

export default RepoPage;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonType, FlowData, Stage } from "../../types";
import ConfirmModal from "../ConfirmModal";
import { coreTechList, flowTemplates } from "../../constants";
import Button from "../Button";
import { TrashIcon } from "@radix-ui/react-icons";

type CustomTypes = {
  [key: string]: {
    label: string;
    color: string;
  };
};

type Props = {
  flowData: FlowData;
  setFlowData: React.Dispatch<React.SetStateAction<FlowData>>;
  customTypes: CustomTypes;
};

const RepoPage = ({ flowData, setFlowData, customTypes }: Props) => {
  const { repo } = useParams<{ repo: string }>();
  const navigate = useNavigate();

  const isEditMode = repo !== undefined;
  const repoData = flowData[repo ?? ""] ?? {
    stages: [],
    description: "",
    coreTech: [],
  };

  const [repoName, setRepoName] = useState(isEditMode ? repo : "");
  const [stages, setStages] = useState<Stage[]>(
    repoData.stages.length > 0
      ? repoData.stages
      : [{ name: "", stageNumber: 1, label: "", color: "" }]
  );
  const [templateSelect, setTemplateSelect] = useState<string>("");
  const [description, setDescription] = useState(repoData.description);
  const [coreTech, setCoreTech] = useState<string[]>(repoData.coreTech);

  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    if (isEditMode && repoData.stages) {
      setStages(repoData.stages);
      setDescription(repoData.description);
      setCoreTech(repoData.coreTech);
    }
  }, [isEditMode, repoData]);

  const updateStageAt = (index: number, changes: Partial<Stage>) => {
    setStages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...changes };
      return updated;
    });
  };

  const handleStageChange = (
    index: number,
    key: keyof Stage,
    value: string | boolean
  ) => {
    updateStageAt(index, { [key]: value });
  };

  const handleAddStage = () =>
    setStages([...stages, { name: "", stageNumber: 1, label: "", color: "" }]);

  const handleRemoveStage = (index: number) => {
    const updated = [...stages];
    updated.splice(index, 1);
    setStages(updated);
  };

  const handleSave = () => {
    if (!repoName.trim()) {
      setModal({
        isOpen: true,
        message: "Repo name is required",
        onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }

    if (isEditMode && repoName !== repo && flowData[repoName]) {
      setModal({
        isOpen: true,
        message: "A repo with that name already exists.",
        onConfirm: () => setModal((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }

    const updatedFlowData = { ...flowData };
    if (isEditMode) {
      delete updatedFlowData[repo ?? ""];
    }

    updatedFlowData[repoName] = {
      stages: stages.filter((s) => s.name.trim()),
      description: description.trim(),
      coreTech,
    };

    setFlowData(updatedFlowData);
    navigate("/");
  };

  const handleTemplateSelect = (key: string) => {
    const template = flowTemplates[key];
    if (!template) return;

    const isDirty =
      stages.length > 1 ||
      (stages.length === 1 && stages[0].name.trim() !== "");

    if (isDirty) {
      setModal({
        isOpen: true,
        message: "Replace existing stages with template?",
        onConfirm: () => {
          setStages(template);
          setTemplateSelect(key);
          setModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setStages(template);
      setTemplateSelect(key);
    }
  };

  const handleCancelModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setTemplateSelect("");
  };

  const groupStagesByNumber = (): { [key: number]: Stage[] } => {
    const grouped: { [key: number]: Stage[] } = {};
    for (const stage of stages) {
      const num = stage.stageNumber || 1;
      if (!grouped[num]) grouped[num] = [];
      grouped[num].push(stage);
    }
    return grouped;
  };

  const groupedStages = groupStagesByNumber();
  const sortedStageNumbers = Object.keys(groupedStages)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="w-full px-6 py-12 min-h-[100vh] overflow-y-auto">
      <div className="mb-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            {isEditMode ? `Edit flow: ${repo}` : "Create flow"}
          </h2>

          <input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Flow name"
          />

          <h3 className="text-xl font-semibold text-white my-2">
            Quick start template
          </h3>
          <select
            value={templateSelect}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="">Select template</option>
            {Object.keys(flowTemplates).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white my-2">Core Tech</h3>
          <select
            value={coreTech}
            onChange={(e) =>
              setCoreTech(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="">Select core tech</option>
            {coreTechList.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white my-2">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="Repo description"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto py-4 items-start">
          {sortedStageNumbers.map((stageNum) => (
            <div
              key={stageNum}
              className="min-w-[250px] w-64 border border-dashed border-white/10 rounded-xl p-4 shadow-inner flex-shrink-0"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Stage {stageNum}
              </h3>

              <div className="flex flex-col gap-4">
                {groupedStages[stageNum].map((stage, localIndex) => {
                  const globalIndex = stages.findIndex((s) => s === stage);
                  return (
                    <div
                      key={globalIndex}
                      className="p-3 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
                    >
                      <input
                        value={stage.name}
                        onChange={(e) =>
                          handleStageChange(globalIndex, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 mb-2 rounded bg-gray-900 border border-gray-600 text-white"
                        placeholder="Stage name"
                      />

                      <select
                        value={stage.label}
                        onChange={(e) => {
                          const selectedLabel = e.target.value;
                          const foundEntry = Object.entries(customTypes).find(
                            ([, val]) => val.label === selectedLabel
                          );

                          if (foundEntry) {
                            const [, config] = foundEntry;
                            updateStageAt(globalIndex, {
                              label: config.label,
                              color: config.color,
                            });
                          }
                        }}
                        className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
                      >
                        <option value="">Select type</option>
                        {Object.entries(customTypes).map(([key, config]) => (
                          <option key={key} value={config.label}>
                            {config.label}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleRemoveStage(globalIndex)}
                        disabled={stages.length === 1}
                        title="Delete"
                        className="text-gray-950 hover:text-red-400 float-right mt-2"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={() =>
                    setStages([
                      ...stages,
                      { name: "", stageNumber: stageNum, label: "", color: "" },
                    ])
                  }
                  className="mt-2 text-sm text-white cursor-pointer transition-all hover:bg-white/10 border border-dashed border-white/10 w-full rounded-lg px-4 py-2"
                >
                  Add item
                </button>
              </div>
            </div>
          ))}

          <div
            onClick={() => {
              const nextStageNumber =
                Math.max(0, ...stages.map((s) => s.stageNumber || 0)) + 1;

              setStages([
                ...stages,
                {
                  name: "",
                  stageNumber: nextStageNumber,
                  label: "",
                  color: "",
                },
              ]);
            }}
            className="cursor-pointer transition-all hover:bg-white/10 min-w-[250px] w-64 h-[283px] justify-content flex items-center backdrop-blur border border-dashed border-white/10 rounded-xl p-4 shadow-inner flex-shrink-0"
          >
            <button className="w-full text-center cursor-pointer">
              Add stage
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <Button onClick={handleSave} type={ButtonType.PRIMARY}>
            {isEditMode ? "💾 Save Changes" : "🚀 Create Repo"}
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={modal.isOpen}
        title={modal.message}
        onCancel={handleCancelModal}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};

export default RepoPage;

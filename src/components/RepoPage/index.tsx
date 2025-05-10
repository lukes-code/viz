import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlowData, Stage } from "../../types";
import { flowTemplates } from "../FlowTemplates";
import ConfirmModal from "../ConfirmModal";

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

const coreTechList = [
  "React",
  "Vue",
  "Angular",
  "Laravel",
  "Django",
  "Python",
  "Node.js",
  "Express",
  "Java",
  "Spring",
  "Ruby on Rails",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "C++",
  "C#",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "SASS",
  "Tailwind CSS",
  "Bootstrap",
  "JQuery",
  "GraphQL",
  "Apollo",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "AWS",
  "Google Cloud",
  "Azure",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Jenkins",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Terraform",
  "Ansible",
  "Nginx",
  "Apache",
  "Vercel",
  "Netlify",
  "Heroku",
  "Rails",
  "Next.js",
  "Gatsby",
  "Nuxt.js",
  "Flutter",
  "React Native",
  "Electron",
  "Elixir",
  "Scala",
  "Haskell",
  "Figma",
  "Sketch",
  "Adobe XD",
  "InVision",
  "Zeplin",
  "Jira",
  "Trello",
  "Notion",
  "Slack",
  "Discord",
  "Zoom",
  "Stripe",
  "PayPal",
  "MongoDB Atlas",
  "ElasticSearch",
  "Redis",
  "SQLite",
  "Salesforce",
  "Shopify",
  "Magento",
  "WordPress",
  "BigCommerce",
  "Wix",
  "Squarespace",
];

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
      : [{ name: "", type: "env", isJoin: false, label: "", color: "" }]
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
    setStages([
      ...stages,
      { name: "", type: "env", isJoin: false, label: "", color: "" },
    ]);

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

    // Ensure stages include label and color
    const updatedStages = stages.map((stage) => {
      const typeConfig = customTypes[stage.type];
      if (typeConfig) {
        return {
          ...stage,
          label: typeConfig.label, // Assign label from customTypes
          color: typeConfig.color, // Assign color from customTypes
        };
      }
      return stage;
    });

    const updatedFlowData = { ...flowData };
    if (isEditMode) {
      delete updatedFlowData[repo ?? ""];
    }

    updatedFlowData[repoName] = {
      stages: updatedStages.filter((s) => s.name.trim()),
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

  const groupStages = (): Stage[][] => {
    const grouped: Stage[][] = [];
    let i = 0;

    while (i < stages.length) {
      const group: Stage[] = [stages[i]];

      if (stages[i].isJoin) {
        i++;
        while (i < stages.length) {
          group.push(stages[i]);
          if (!stages[i].isJoin) {
            i++;
            break;
          }
          i++;
        }
      } else {
        i++;
      }

      grouped.push(group);
    }

    return grouped;
  };

  const groupedStages = groupStages();

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
            placeholder="Repo name"
          />

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

        {/* Core Tech */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-400">Core Tech</h3>
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

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-400">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="Repo description"
          />
        </div>

        {groupedStages.map((step, stepIndex) => (
          <div
            key={stepIndex}
            className="mb-8 p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-inner"
          >
            <h3 className="text-lg font-semibold text-purple-400 mb-4">
              Stage {stepIndex + 1}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {step.map((stage, i) => {
                const globalIndex = stages.findIndex(
                  (s, idx) =>
                    s.name === stage.name &&
                    s.type === stage.type &&
                    s.isJoin === stage.isJoin &&
                    stages.slice(0, idx).filter((x) => x === s).length ===
                      step.slice(0, i).filter((x) => x === stage).length
                );

                return (
                  <div
                    key={globalIndex}
                    className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
                  >
                    <div className="mb-2">
                      <input
                        value={stage.name}
                        onChange={(e) =>
                          handleStageChange(globalIndex, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
                        placeholder="Stage name"
                      />
                    </div>

                    <div className="mb-2">
                      <select
                        value={stage.type}
                        onChange={(e) =>
                          handleStageChange(
                            globalIndex,
                            "type",
                            e.target.value as Stage["type"]
                          )
                        }
                        className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
                      >
                        {Object.entries(customTypes).map(
                          ([typeKey, config]) => (
                            <option key={typeKey} value={typeKey}>
                              {config.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <label className="flex items-center text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={stage.isJoin}
                        onChange={(e) =>
                          handleStageChange(
                            globalIndex,
                            "isJoin",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      Join next step
                    </label>

                    <button
                      onClick={() => handleRemoveStage(globalIndex)}
                      className="text-red-400 text-sm mt-2 hover:underline"
                      disabled={stages.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleAddStage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
          >
            ➕ Add Step
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
          >
            {isEditMode ? "💾 Save Changes" : "🚀 Create Repo"}
          </button>
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

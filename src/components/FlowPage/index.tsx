import { useParams, Link } from "react-router-dom";
import { FlowCanvas } from "../FlowCanvas";
import { FlowData } from "../../types";

type FlowPageProps = {
  flowData: FlowData;
  customTypes: { [key: string]: { label: string; color: string } };
};

const FlowPage = ({ flowData, customTypes }: FlowPageProps) => {
  const { repo } = useParams<{ repo: string }>();

  if (!repo || !flowData[repo]) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Repo not found!</h2>
        <Link to="/" className="text-blue-500 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const stages = flowData[repo].stages;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{repo} flow</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Key (Legend) */}
      <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-2">Node Types</h3>
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

      <FlowCanvas stages={stages} />
    </div>
  );
};

export default FlowPage;

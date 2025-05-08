import { useParams, Link } from "react-router-dom";
import { FlowCanvas } from "../FlowCanvas";
import { Stage } from "../../types";

type FlowData = {
  [repo: string]: {
    stages: Stage[];
  };
};

type FlowPageProps = {
  flowData: FlowData;
};

const FlowPage = ({ flowData }: FlowPageProps) => {
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
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{repo} Lifecycle</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      <div className="h-[600px] border rounded-lg overflow-hidden">
        <FlowCanvas repo={repo} stages={stages} />
      </div>
    </div>
  );
};

export default FlowPage;

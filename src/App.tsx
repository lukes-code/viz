import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { defaultFlowData } from "./data/flowData";
import StageVisualiser from "./components/StageVisualiser";
import FlowPage from "./components/FlowPage";
import RepoPage from "./components/RepoPage";
import { FlowData } from "./types";

export const App = () => {
  const [flowData, setFlowData] = useState<FlowData>(defaultFlowData);

  return (
    <Router>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Development Lifecycle Visualizer
        </h1>

        <Routes>
          <Route
            path="/"
            element={
              <StageVisualiser flowData={flowData} setFlowData={setFlowData} />
            }
          />
          <Route
            path="/flow/:repo"
            element={<FlowPage flowData={flowData} />}
          />
          <Route
            path="/edit/:repo"
            element={<RepoPage flowData={flowData} setFlowData={setFlowData} />}
          />
          <Route
            path="/create"
            element={<RepoPage flowData={flowData} setFlowData={setFlowData} />}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

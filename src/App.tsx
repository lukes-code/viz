import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { defaultCustomTypes, defaultFlowData } from "./data/flowData";
import StageVisualiser from "./components/StageVisualiser";
import FlowPage from "./components/FlowPage";
import RepoPage from "./components/RepoPage";
import { FlowData } from "./types";
import CreateNodeTypePage from "./components/CreateNodeTypesPage";
import Nav from "./components/Nav";

const App = () => {
  const [flowData, setFlowData] = useState<FlowData>(defaultFlowData);
  const [customTypes, setCustomTypes] = useState<{
    [key: string]: { label: string; color: string };
  }>(defaultCustomTypes);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white transition-colors">
        <Nav />

        <main className="max-w-7xl mx-auto px-4 py-8 min-h-full">
          <Routes>
            <Route
              path="/"
              element={
                <StageVisualiser
                  flowData={flowData}
                  setFlowData={setFlowData}
                  customTypes={customTypes}
                />
              }
            />
            <Route
              path="/flow/:repo"
              element={
                <FlowPage flowData={flowData} customTypes={customTypes} />
              }
            />
            <Route
              path="/edit/:repo"
              element={
                <RepoPage
                  flowData={flowData}
                  setFlowData={setFlowData}
                  customTypes={customTypes}
                />
              }
            />
            <Route
              path="/create"
              element={
                <RepoPage
                  flowData={flowData}
                  setFlowData={setFlowData}
                  customTypes={customTypes}
                />
              }
            />
            <Route
              path="/create-node-types"
              element={
                <CreateNodeTypePage
                  customTypes={customTypes}
                  setCustomTypes={setCustomTypes}
                />
              }
            />
            <Route
              path="/flow/:repo"
              element={
                <FlowPage flowData={flowData} customTypes={customTypes} />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

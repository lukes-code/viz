import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { defaultCustomTypes, defaultFlowData } from "./data/flowData";
import StageVisualiser from "./components/StageVisualiser";
import { FlowData } from "./types";
import CreateNodeTypePage from "./components/CreateNodeTypesPage";
import Nav from "./components/Nav";
import CreateEditFlow from "./components/CreateEditFlow";
import FlowPage from "./components/FlowPage";

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
              path="/flow/:flow"
              element={
                <FlowPage flowData={flowData} customTypes={customTypes} />
              }
            />
            <Route
              path="/edit/:flow"
              element={
                <CreateEditFlow
                  flowData={flowData}
                  setFlowData={setFlowData}
                  customTypes={customTypes}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateEditFlow
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
              path="/flow/:flow"
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

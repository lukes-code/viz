import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  customTypes: {
    [key: string]: { label: string; color: string };
  };
  setCustomTypes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { label: string; color: string };
    }>
  >;
};

const CreateNodeTypePage = (props: Props) => {
  const { customTypes, setCustomTypes } = props;

  const [newType, setNewType] = useState({ label: "", color: "#000000" });
  const navigate = useNavigate();

  const handleAddType = () => {
    if (newType.label && newType.color) {
      const key = newType.label.toLowerCase();
      setCustomTypes((prev) => ({
        ...prev,
        [key]: {
          label: newType.label,
          color: newType.color,
        },
      }));
      setNewType({ label: "", color: "#000000" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Create Custom Node Types
      </h1>
      <div className="mb-4">
        <label htmlFor="label" className="block text-sm text-gray-700">
          Type Label
        </label>
        <input
          id="label"
          type="text"
          value={newType.label}
          onChange={(e) =>
            setNewType((prev) => ({ ...prev, label: e.target.value }))
          }
          className="w-full px-3 py-2 rounded border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-sm text-gray-700">
          Node Color
        </label>
        <input
          id="color"
          type="color"
          value={newType.color}
          onChange={(e) =>
            setNewType((prev) => ({ ...prev, color: e.target.value }))
          }
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>
      <button
        onClick={handleAddType}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Type
      </button>

      <h2 className="text-xl font-semibold mt-6">Custom Types</h2>
      <ul className="mt-4">
        {Object.entries(customTypes).map(([key, type]) => (
          <li key={key} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: type.color }}
            ></span>
            <span className="text-sm">{type.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CreateNodeTypePage;

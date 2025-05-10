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

const colorPalette = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A6",
  "#FF8C33",
  "#33FFEC",
  "#8C33FF",
  "#FF3380",
  "#33FF80",
  "#F3FF33",
  "#F833FF",
  "#33FF57",
  "#FF5733",
  "#8C33FF",
  "#FF4D00",
  "#9DFF33",
  "#FF4500",
  "#F5FF33",
  "#A33FFF",
  "#FF5733",
];

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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Create Custom Node Types
      </h1>

      {/* Type Label Input */}
      <div className="mb-4">
        <label htmlFor="label" className="block text-sm text-gray-300">
          Type Label
        </label>
        <input
          id="label"
          type="text"
          value={newType.label}
          onChange={(e) =>
            setNewType((prev) => ({ ...prev, label: e.target.value }))
          }
          className="w-full px-3 py-2 rounded border border-gray-500 bg-gray-700 text-white"
        />
      </div>

      {/* Color Picker */}
      <div className="mb-6">
        <label htmlFor="color" className="block text-sm text-gray-300">
          Node Color
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {colorPalette.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-full ${
                newType.color === color ? "border-4 border-white" : ""
              }`}
              onClick={() => setNewType((prev) => ({ ...prev, color }))}
            />
          ))}
        </div>
      </div>

      {/* Add Type Button */}
      <div className="mb-6">
        <button
          onClick={handleAddType}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Type
        </button>
      </div>

      {/* Custom Types List */}
      <h2 className="text-xl font-semibold text-white mt-6">
        Custom Node Types
      </h2>
      <ul className="mt-4 space-y-2">
        {Object.entries(customTypes).map(([key, type]) => (
          <li key={key} className="flex items-center space-x-2">
            <span
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: type.color }}
            ></span>
            <span className="text-sm text-white">{type.label}</span>
          </li>
        ))}
      </ul>

      {/* Back Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CreateNodeTypePage;

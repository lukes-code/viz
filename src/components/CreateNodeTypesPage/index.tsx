import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorPalette } from "../../constants";
import Button from "../Button";
import { ButtonType } from "../../types";

type CustomType = {
  label: string;
  color: string;
};

type Props = {
  customTypes: {
    [key: string]: CustomType;
  };
  setCustomTypes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: CustomType;
    }>
  >;
};

const CreateNodeTypePage = ({ customTypes, setCustomTypes }: Props) => {
  const [newType, setNewType] = useState<CustomType>({
    label: "",
    color: "#000000",
  });

  const navigate = useNavigate();

  const handleAddType = () => {
    if (!newType.label.trim()) return;

    const key = newType.label.trim().toLowerCase();
    setCustomTypes((prev) => ({
      ...prev,
      [key]: { label: newType.label.trim(), color: newType.color },
    }));
    setNewType({ label: "", color: "#000000" });
  };

  const handleEditType = (
    originalKey: string,
    updated: { label?: string; color?: string }
  ) => {
    setCustomTypes((prev) => {
      const existing = prev[originalKey];
      if (!existing) return prev;

      const newLabel = updated.label ?? existing.label;
      const newColor = updated.color ?? existing.color;
      const newKey = newLabel.trim().toLowerCase();

      const updatedTypes = { ...prev };
      delete updatedTypes[originalKey];
      updatedTypes[newKey] = { label: newLabel, color: newColor };

      return updatedTypes;
    });
  };

  const handleRemoveType = (key: string) => {
    setCustomTypes((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Node types
      </h1>

      {/* Add New Type */}
      <div className="mb-4">
        <label htmlFor="label" className="block text-sm text-gray-300">
          Type label
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

      <div className="mb-6">
        <label className="block text-sm text-gray-300">Node color</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {colorPalette.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-full ${
                newType.color === color ? "border-4 border-white" : ""
              }`}
              onClick={() => setNewType((prev) => ({ ...prev, color: color }))}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Button onClick={handleAddType}>Add type</Button>
      </div>

      {/* Existing Types */}
      <h2 className="text-xl font-semibold text-white mt-6">Edit Node Types</h2>
      <ul className="mt-4 space-y-4">
        {Object.entries(customTypes).map(([key, type]) => (
          <li
            key={key}
            className="p-4 rounded bg-gray-700 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
              <input
                type="text"
                value={type.label}
                onChange={(e) => handleEditType(key, { label: e.target.value })}
                className="px-3 py-1 rounded bg-gray-800 border border-gray-600 text-white flex-1"
              />

              <div className="flex flex-wrap gap-2">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full ${
                      type.color === color ? "border-4 border-white" : ""
                    }`}
                    onClick={() => handleEditType(key, { color })}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={() => handleRemoveType(key)}
              type={ButtonType.DANGER}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Button onClick={() => navigate("/")}>Back to home</Button>
      </div>
    </div>
  );
};

export default CreateNodeTypePage;

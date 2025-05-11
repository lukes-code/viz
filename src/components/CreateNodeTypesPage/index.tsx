import { useState } from "react";
import { FilePlusIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { colorPalette } from "../../constants";
import Button from "../Button";
import { ButtonType } from "../../types";
import { classNames } from "../../utils";

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
  const [editModeKeys, setEditModeKeys] = useState<Set<string>>(new Set());
  const [showNewTypeForm, setShowNewTypeForm] = useState(false);
  const [newType, setNewType] = useState<CustomType>({
    label: "",
    color: "#000000",
  });

  const toggleEditMode = (key: string) => {
    setEditModeKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const handleAddType = () => {
    if (!newType.label.trim()) return;

    const key = newType.label.trim().toLowerCase();
    setCustomTypes((prev) => ({
      ...prev,
      [key]: { label: newType.label.trim(), color: newType.color },
    }));
    setNewType({ label: "", color: "#000000" });
    setShowNewTypeForm(false);
  };

  const handleEditType = (
    key: string,
    updated: { label?: string; color?: string }
  ) => {
    setCustomTypes((prev) => {
      const existing = prev[key];
      if (!existing) return prev;

      return {
        ...prev,
        [key]: {
          label: updated.label ?? existing.label,
          color: updated.color ?? existing.color,
        },
      };
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Node types</h1>
        <Button
          type={ButtonType.SECONDARY}
          onClick={() => setShowNewTypeForm((prev) => !prev)}
        >
          + Create new type
        </Button>
      </div>

      {showNewTypeForm && (
        <div className="mt-6 grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Create new type
            </h2>

            <div>
              <label
                htmlFor="label"
                className="block text-sm text-gray-300 mb-1"
              >
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

            <div>
              <label className="block text-sm text-gray-300 mb-1">Color</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full cursor-pointer ${
                      newType.color === color ? "ring-2 ring-white" : ""
                    }`}
                    onClick={() => setNewType((prev) => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full justify-end">
              <Button onClick={handleAddType}>Save type</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {Object.entries(customTypes).map(([key, type]) => (
          <div
            key={key}
            className={classNames(
              editModeKeys.has(key)
                ? "border border-dashed border-white/10"
                : "border border-white/10",
              "bg-white/5 rounded-xl p-4 space-y-3"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editModeKeys.has(key) ? (
                  <input
                    value={type.label}
                    onChange={(e) =>
                      handleEditType(key, { label: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded border border-gray-500 bg-gray-700 text-white"
                  />
                ) : (
                  <>
                    <span
                      style={{ backgroundColor: type.color }}
                      className="w-4 h-4 rounded-full"
                    />
                    <span className="text-sm text-white">{type.label}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editModeKeys.has(key) ? (
                  <button
                    onClick={() => toggleEditMode(key)}
                    className="text-gray-400 hover:text-blue-400 cursor-pointer"
                  >
                    <FilePlusIcon className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => toggleEditMode(key)}
                    className="text-gray-400 hover:text-blue-400 cursor-pointer"
                  >
                    <Pencil1Icon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleRemoveType(key)}
                  className="text-gray-400 hover:text-red-400 cursor-pointer"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {editModeKeys.has(key) && (
              <div className="flex gap-2 flex-wrap border border-dashed border-white/20 rounded-lg p-3">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full cursor-pointer ${
                      type.color === color ? "ring-2 ring-white" : ""
                    }`}
                    onClick={() => handleEditType(key, { color })}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateNodeTypePage;

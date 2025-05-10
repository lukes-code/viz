import { ButtonType } from "../../types";
import Button from "../Button";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmModal = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} type={ButtonType.SECONDARY}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} type={ButtonType.DANGER}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

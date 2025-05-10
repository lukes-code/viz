import { ButtonType } from "../../types";
import { classNames } from "../../utils";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean;
};

const Button = (props: Props) => {
  const {
    children,
    onClick,
    type = ButtonType.PRIMARY,
    disabled = false,
  } = props;

  let buttonStyles;

  switch (type) {
    case ButtonType.PRIMARY:
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case ButtonType.SECONDARY:
      buttonStyles = "bg-white text-gray-900 hover:bg-gray-300";
      break;
    case ButtonType.DANGER:
      buttonStyles = "bg-red-500 text-white hover:bg-red-300";
      break;
    default:
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600";
  }

  return (
    <button
      className={classNames(
        buttonStyles,
        "px-4 py-2 cursor-pointer rounded-4xl text-sm"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

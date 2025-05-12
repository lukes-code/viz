type Props = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  isEditing?: boolean;
};

const Card = ({ title, children, actions, isEditing }: Props) => {
  return (
    <div
      className={`py-4 px-6 relative rounded-xl bg-white/5 backdrop-blur border shadow-inner flex flex-col
        ${isEditing ? "border-dashed border-white/10" : "border-white/10"}`}
    >
      {/* Header */}
      {title && (
        <div className="flex justify-between items-start">
          <div className="font-semibold text-lg text-white">{title}</div>
          <div className="flex space-x-2 text-sm">{actions}</div>
        </div>
      )}

      {/* Content */}
      {children && <div className="flex flex-col gap-2 mt-4">{children}</div>}
    </div>
  );
};

export default Card;

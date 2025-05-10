type Props = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const Card = (props: Props) => {
  const { title, children, actions } = props;
  return (
    <div className="p-6 relative rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-inner flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="font-semibold text-lg text-white">{title}</div>
        <div className="flex space-x-2 text-sm">{actions}</div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default Card;

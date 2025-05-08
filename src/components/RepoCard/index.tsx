type Props = {
  name: string;
  stack: string;
  stages: string[];
};

export const RepoCard = ({ name, stack, stages }: Props) => (
  <div className="p-4 bg-white rounded-xl shadow-md space-y-2">
    <h2 className="text-xl font-semibold">{name}</h2>
    <p className="text-sm text-gray-500">{stack}</p>
    <div className="flex gap-2">
      {stages.map((stage) => (
        <span
          key={stage}
          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
        >
          {stage}
        </span>
      ))}
    </div>
  </div>
);

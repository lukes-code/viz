import { useNavigate } from "react-router-dom";

const RepoSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (repo: string) => {
    // Navigate to the flow view for the selected repo
    navigate(`/flow/${repo}`);
  };

  // List your repos here
  const repos = ["frontend", "backend"];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {repos.map((repo) => (
        <div
          key={repo}
          className="cursor-pointer p-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700"
          onClick={() => handleCardClick(repo)}
        >
          <h2 className="text-2xl">{repo}</h2>
          <p className="mt-2">Click to see the flow</p>
        </div>
      ))}
    </div>
  );
};

export default RepoSelection;

import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white backdrop-blur sticky top-0 z-50 shadow-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-600">
          🧬 Viz
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/create"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive("/create")
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-900 hover:bg-purple-100"
            }`}
          >
            + Add flow
          </Link>

          <Link
            to="/create-node-types"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive("/create-node-types")
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-900 hover:bg-purple-100"
            }`}
          >
            + Add types
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

import { Link, useNavigate } from "react-router-dom";
import { FileText, Brain, BarChart3, History, Clock } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    // <nav className="w-full bg-white border-b border-gray-200">
    //   <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    //     {/* Logo */}
    //     <Link to="/" className="flex items-center gap-2">
    //       <div className="p-2 bg-blue-600 rounded-lg">
    //         <Brain className="w-5 h-5 text-white" />
    //       </div>
    //       <span className="text-xl font-bold text-gray-800">
    //         <span className="text-blue-600">Job</span>fit
    //       </span>
    //     </Link>

    //     {/* Nav Links */}
    //     {userId && (
    //       <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
    //         <Link
    //           to="/analyze"
    //           className="flex items-center gap-1 hover:text-blue-600"
    //         >
    //           <FileText size={18} /> Analyze
    //         </Link>

    //         <Link
    //           to="/compare"
    //           className="flex items-center gap-1 hover:text-blue-600"
    //         >
    //           <Brain size={18} /> Compare
    //         </Link>

    //         <Link
    //           to="/history"
    //           className="flex items-center gap-1 hover:text-blue-600"
    //         >
    //           <Clock size={18} /> History
    //         </Link>
    //       </div>
    //     )}

    //     {/* Auth Buttons */}
    //     <div className="flex items-center gap-4">
    //       {!userId ? (
    //         <>
    //           <Link
    //             to="/login"
    //             className="text-gray-600 hover:text-blue-600 font-medium"
    //           >
    //             Login
    //           </Link>

    //           <Link
    //             to="/register"
    //             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    //           >
    //             Sign Up
    //           </Link>
    //         </>
    //       ) : (
    //         <button
    //           onClick={handleLogout}
    //           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </nav>

    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="p-2 bg-blue-600 rounded-lg shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">
            <span className="text-blue-600">Job</span>fit
          </span>
        </Link>

        {/* Nav Links */}
        {userId && (
          <div className="hidden ml-38 md:flex items-center gap-6 text-gray-600 font-medium">
            <Link
              to="/analyze"
              className="flex items-center gap-2 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <FileText size={18} /> Analyze
            </Link>

            <Link
              to="/compare"
              className="flex items-center gap-2 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <Brain size={18} /> Compare
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-2 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <Clock size={18} /> History
            </Link>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!userId ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 font-medium rounded-lg">
                <span className="text-sm text-gray-600">Welcome,</span>
                <span className="text-sm font-semibold text-blue-600">
                  {name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm cursor-pointer font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

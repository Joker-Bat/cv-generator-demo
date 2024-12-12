import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOCALSTORAGE_KEYS } from "../../utils";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resumeId = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

    if (!resumeId) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
        <div className="relative">
          <button
            id="user-menu"
            className="text-gray-800 font-medium hover:underline flex items-center space-x-2"
          >
            <i className="fas fa-user-circle"></i>
            <span>User Menu</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 grid grid-cols-5 gap-4 min-h-screen">
        <aside className="col-span-1 bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 rounded-lg shadow p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className="text-gray-700 font-medium hover:text-indigo-500"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-700 font-medium hover:text-indigo-500"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-700 font-medium hover:text-indigo-500"
              >
                AI Interview
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-700 font-medium hover:text-indigo-500"
              >
                Settings
              </Link>
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="text-gray-800 font-bold mb-2">Profile Completion</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>{" "}
                Basic Details
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>{" "}
                Profile Picture
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i> Self
                Skill Rating
              </li>
              <li className="flex items-center">
                <i className="fas fa-times-circle text-gray-500 mr-2"></i> AI
                Interview
              </li>
            </ul>
          </div>
        </aside>

        <Outlet />
      </div>

      {/* <!-- Footer --> */}
      <footer className="text-center text-gray-700 text-xs py-4">
        <p>&copy; 2024 ZJobs.ai. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export { DashboardLayout };

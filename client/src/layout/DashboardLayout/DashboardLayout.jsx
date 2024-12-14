import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-6 grid grid-cols-5 gap-4 min-h-screen">
        <aside className="col-span-1 bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 rounded-lg shadow p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/user/dashboard"
                className={({ isActive }) =>
                  `text-gray-700 font-medium hover:text-indigo-500 ${
                    isActive ? "text-indigo-500" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/profile"
                className={({ isActive }) =>
                  `text-gray-700 font-medium hover:text-indigo-500 ${
                    isActive ? "text-indigo-500" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/interview"
                className={({ isActive }) =>
                  `text-gray-700 font-medium hover:text-indigo-500 ${
                    isActive ? "text-indigo-500" : ""
                  }`
                }
              >
                AI Interview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/settings"
                className={({ isActive }) =>
                  `text-gray-700 font-medium hover:text-indigo-500 ${
                    isActive ? "text-indigo-500" : ""
                  }`
                }
              >
                Settings
              </NavLink>
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

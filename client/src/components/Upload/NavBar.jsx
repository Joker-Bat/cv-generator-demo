import { useState } from "react";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleMenu = () => {
    setShowDropdown(p => !p);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
      <div className="relative">
        <button className="text-gray-800" onClick={handleToggleMenu}>
          <i className="fas fa-user-circle text-2xl"></i>
        </button>
        {showDropdown && (
          <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export { NavBar };

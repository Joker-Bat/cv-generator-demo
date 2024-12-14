import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LOCALSTORAGE_KEYS } from "../../utils";

const NavBar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const menuButtonRef = useRef();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // When clicking outside of menu close the dropdown
    const handleOutsideClick = event => {
      if (
        dropdownRef.current &&
        menuButtonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggleMenu = () => {
    setShowDropdown(p => !p);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEYS.USER_ID);
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
        <div className="relative">
          <button
            className="text-gray-800"
            onClick={handleToggleMenu}
            ref={menuButtonRef}
          >
            <i className="fas fa-user-circle text-2xl"></i>
          </button>
          {showDropdown && (
            <ul
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white shadow-lg rounded"
            >
              <li>
                <NavLink
                  to="/user/profile"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${
                      isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/settings"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${
                      isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <p
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </p>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export { NavBar };

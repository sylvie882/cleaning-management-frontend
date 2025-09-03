// src/components/layouts/DashboardHeader.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const DashboardHeader = ({ onMenuClick, sidebarOpen, isMobile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) {
      setIsNotificationsOpen(false);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  // Get page title based on current role
  const getPageTitle = () => {
    switch (user.role) {
      case "admin":
        return "Admin Console";
      case "head_of_cleaning":
        return "Head of Cleaning Portal";
      case "cleaner":
        return "Cleaner Portal";
      case "accountant":
        return "Accounting Department";
      case "manager":
        return "Management Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-10 sticky top-0">
      <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Left Section - Mobile Menu + Title */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}

          {/* Header Title */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Section - Header Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {/* Search Bar - Hidden on small screens */}
          <div className="hidden xl:flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 xl:w-64 text-sm"
            />
            <button
              type="submit"
              className="absolute left-3 top-2.5 text-gray-400"
            >
              <i className="fas fa-search text-sm"></i>
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <i className="fas fa-bell text-sm sm:text-base"></i>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-xs text-white font-semibold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-md shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Notifications
                  </h3>
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    Mark all as read
                  </button>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  <li className="px-4 py-3 hover:bg-gray-50 border-l-4 border-blue-500">
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-calendar-check text-sm"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 break-words">
                          New booking request received
                        </p>
                        <span className="text-xs text-gray-500">
                          5 minutes ago
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-star text-sm"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 break-words">
                          New rating from client #12345
                        </p>
                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-50 border-l-4 border-blue-500">
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-money-bill-wave text-sm"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 break-words">
                          Payment received for booking #67890
                        </p>
                        <span className="text-xs text-gray-500">Yesterday</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-center py-1">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user-circle text-sm sm:text-base"></i>
              </div>
              <span className="hidden sm:inline-block font-medium truncate max-w-24 lg:max-w-32">
                {user.name}
              </span>
              <i
                className={`fas fa-chevron-${
                  isProfileMenuOpen ? "up" : "down"
                } text-gray-500 text-xs hidden sm:inline`}
              ></i>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20">
                <a
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-user mr-2 text-gray-500"></i> My Profile
                </a>
                <a
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-cog mr-2 text-gray-500"></i> Settings
                </a>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <i className="fas fa-sign-out-alt mr-2 text-red-500"></i>{" "}
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

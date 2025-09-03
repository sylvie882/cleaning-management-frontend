// src/components/layouts/DashboardSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/images/logo.png";

const DashboardSidebar = ({ onClose, isMobile }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Menu items based on user role
  const getMenuItems = () => {
    switch (user.user.role) {
      case "admin":
        return [
          {
            path: "/dashboard/admin",
            icon: "fa-tachometer-alt",
            label: "Dashboard",
          },
          {
            path: "/dashboard/admin/users",
            icon: "fa-users",
            label: "User Management",
          },
          {
            path: "/dashboard/admin/services",
            icon: "fa-broom",
            label: "Services",
          },
          {
            path: "/dashboard/admin/articles",
            icon: "fa-newspaper",
            label: "Articles",
          },
          {
            path: "/dashboard/admin/settings",
            icon: "fa-cog",
            label: "Settings",
          },
        ];
      case "head_cleaner":
        return [
          {
            path: "/dashboard/head",
            icon: "fa-tachometer-alt",
            label: "Dashboard",
          },
          {
            path: "/dashboard/head/bookings",
            icon: "fa-calendar-check",
            label: "Bookings",
          },
          {
            path: "/dashboard/head/cleaners",
            icon: "fa-user-friends",
            label: "Cleaners",
          },
        ];
      case "cleaner":
        return [
          {
            path: "/dashboard/cleaner",
            icon: "fa-tachometer-alt",
            label: "Dashboard",
          },
          {
            path: "/dashboard/cleaner/tasks",
            icon: "fa-tasks",
            label: "My Tasks",
          },
          {
            path: "/dashboard/cleaner/history",
            icon: "fa-history",
            label: "History",
          },
        ];
      case "accountant":
        return [
          {
            path: "/dashboard/accountant",
            icon: "fa-tachometer-alt",
            label: "Dashboard",
          },
          {
            path: "/dashboard/accountant/payments",
            icon: "fa-money-bill-wave",
            label: "Payments",
          },
          {
            path: "/dashboard/accountant/reports",
            icon: "fa-chart-bar",
            label: "Reports",
          },
        ];
      case "manager":
        return [
          {
            path: "/dashboard/manager",
            icon: "fa-tachometer-alt",
            label: "Dashboard",
          },
          {
            path: "/dashboard/manager/reports",
            icon: "fa-chart-line",
            label: "Analytics",
          },
          {
            path: "/dashboard/manager/bookings",
            icon: "fa-calendar-check",
            label: "Bookings",
          },
          {
            path: "/dashboard/manager/staff",
            icon: "fa-users",
            label: "Staff",
          },
          {
            path: "/dashboard/manager/finances",
            icon: "fa-dollar-sign",
            label: "Finances",
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="h-full w-64 flex flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Sidebar Header with Logo */}
      <div className="px-4 py-4 sm:py-5 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center min-w-0 flex-1"
            onClick={handleLinkClick}
          >
            <img
              src={logo}
              alt="CleanPro Logo"
              className="h-8 w-8 rounded-md flex-shrink-0"
            />
            <span className="ml-2 text-lg sm:text-xl font-semibold text-blue-600 truncate">
              Silvie Cleaning Services
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <i
                className={`${item.icon} mr-3 flex-shrink-0 h-5 w-5 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              ></i>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user.user.name ? user.user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.user.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate capitalize">
              {user.user.role?.replace("_", " ") || "User"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt h-4 w-4"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

// src/pages/Manager/Staff.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/users/userSlice";
import { formatPhoneNumber } from "../../utils/formatters";

const Staff = () => {
  const dispatch = useDispatch();
  const { users, userStats, isLoading } = useSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Filter, sort, and search users
  useEffect(() => {
    if (!users) return;

    let result = [...users];

    // Filter by role
    if (activeTab !== "all") {
      result = result.filter((user) => user.role === activeTab);
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          (user.phone && user.phone.includes(searchTerm))
      );
    }

    // Sort
    result.sort((a, b) => {
      let fieldA, fieldB;

      // Determine fields to compare based on sortField
      switch (sortField) {
        case "name":
          fieldA = a.name.toLowerCase();
          fieldB = b.name.toLowerCase();
          break;
        case "email":
          fieldA = a.email.toLowerCase();
          fieldB = b.email.toLowerCase();
          break;
        case "role":
          fieldA = a.role;
          fieldB = b.role;
          break;
        case "status":
          fieldA = a.isActive ? "active" : "inactive";
          fieldB = b.isActive ? "active" : "inactive";
          break;
        default:
          fieldA = a[sortField];
          fieldB = b[sortField];
      }

      // Compare the fields
      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(result);
  }, [users, activeTab, searchTerm, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Calculate role counts
  const roleCounts = {
    cleaner: users ? users.filter((user) => user.role === "cleaner").length : 0,
    head_of_cleaning: users
      ? users.filter((user) => user.role === "head_of_cleaning").length
      : 0,
    accountant: users
      ? users.filter((user) => user.role === "accountant").length
      : 0,
    manager: users ? users.filter((user) => user.role === "manager").length : 0,
    admin: users ? users.filter((user) => user.role === "admin").length : 0,
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      cleaner: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "fas fa-broom",
        label: "Cleaner",
      },
      head_of_cleaning: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "fas fa-user-tie",
        label: "Head of Cleaning",
      },
      accountant: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "fas fa-calculator",
        label: "Accountant",
      },
      manager: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        icon: "fas fa-user-cog",
        label: "Manager",
      },
      admin: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: "fas fa-user-shield",
        label: "Admin",
      },
    };

    const config = roleConfig[role] || roleConfig.cleaner;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <i className={`${config.icon} mr-1.5 text-xs`}></i>
        {config.label}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ isActive }) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
          isActive
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-1.5 ${
            isActive ? "bg-green-400" : "bg-gray-400"
          }`}
        ></div>
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const roleFilters = [
    {
      id: "all",
      label: "All Staff",
      count: users?.length || 0,
      icon: "fas fa-users",
    },
    {
      id: "cleaner",
      label: "Cleaners",
      count: roleCounts.cleaner,
      icon: "fas fa-broom",
    },
    {
      id: "head_of_cleaning",
      label: "Head of Cleaning",
      count: roleCounts.head_of_cleaning,
      icon: "fas fa-user-tie",
    },
    {
      id: "accountant",
      label: "Accountants",
      count: roleCounts.accountant,
      icon: "fas fa-calculator",
    },
    {
      id: "manager",
      label: "Managers",
      count: roleCounts.manager,
      icon: "fas fa-user-cog",
    },
    {
      id: "admin",
      label: "Admins",
      count: roleCounts.admin,
      icon: "fas fa-user-shield",
    },
  ];

  const statsCards = [
    {
      title: "Total Staff",
      value: users?.length || 0,
      icon: "fas fa-users",
      color: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Cleaners",
      value: roleCounts.cleaner,
      icon: "fas fa-broom",
      color: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Managers",
      value: roleCounts.manager + roleCounts.head_of_cleaning,
      icon: "fas fa-user-tie",
      color: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Accountants",
      value: roleCounts.accountant,
      icon: "fas fa-calculator",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Admins",
      value: roleCounts.admin,
      icon: "fas fa-user-shield",
      color: "text-red-600",
      bg: "bg-red-50",
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-users mr-3 text-blue-600"></i>
                Staff Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your team members and track their performance
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => dispatch(getUsers())}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                <i
                  className={`fas fa-sync-alt mr-2 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                ></i>
                Refresh
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <i className="fas fa-plus mr-2"></i>
                Add Staff
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm p-6 overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-200`}
              ></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}
                  >
                    <i className={`${stat.icon} text-white text-lg`}></i>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Role Filters */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {roleFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === filter.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(filter.id)}
                  >
                    <i className={`${filter.icon} mr-2 text-sm`}></i>
                    {filter.label}
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === filter.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading staff data...</p>
              </div>
            </div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      onClick={() => handleSort("name")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        {sortField === "name" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("email")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Email</span>
                        {sortField === "email" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th
                      onClick={() => handleSort("role")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Role</span>
                        {sortField === "role" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {sortField === "status" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    // Get performance data for cleaners if available
                    const performanceData =
                      userStats?.cleanerPerformance?.find(
                        (c) => c._id === user._id
                      ) || null;

                    return (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <i className="fas fa-envelope text-gray-400 mr-2"></i>
                            <span className="text-sm text-gray-900">
                              {user.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <i className="fas fa-phone text-gray-400 mr-2"></i>
                            <span className="text-sm text-gray-900">
                              {formatPhoneNumber(user.phone)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge isActive={user.isActive} />
                        </td>
                        <td className="px-6 py-4">
                          {user.role === "cleaner" && performanceData ? (
                            <div className="flex flex-wrap gap-2">
                              <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                                <i className="fas fa-check-circle text-green-600 text-xs mr-1"></i>
                                <span className="text-xs font-medium text-green-700">
                                  {performanceData.completedBookings || 0}
                                </span>
                              </div>
                              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                <i className="fas fa-star text-yellow-600 text-xs mr-1"></i>
                                <span className="text-xs font-medium text-yellow-700">
                                  {performanceData.averageRating?.toFixed(1) ||
                                    "0.0"}
                                </span>
                              </div>
                              <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                                <i className="fas fa-clock text-blue-600 text-xs mr-1"></i>
                                <span className="text-xs font-medium text-blue-700">
                                  {performanceData.onTimePercentage || 0}%
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              className="inline-flex items-center p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                              title="View Details"
                            >
                              <i className="fas fa-eye text-sm"></i>
                            </button>
                            {user.role === "cleaner" && (
                              <button
                                className="inline-flex items-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                title="View Tasks"
                              >
                                <i className="fas fa-tasks text-sm"></i>
                              </button>
                            )}
                            <button
                              className="inline-flex items-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                              title="Edit User"
                            >
                              <i className="fas fa-edit text-sm"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users-slash text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Staff Found
              </h3>
              <p className="text-gray-600 mb-6">
                No staff members match your current filters.
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setSearchTerm("");
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <i className="fas fa-refresh mr-2"></i>
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;

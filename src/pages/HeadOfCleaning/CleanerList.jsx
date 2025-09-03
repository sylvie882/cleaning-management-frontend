/* eslint-disable no-unused-vars */
// src/pages/HeadOfCleaning/CleanerList.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCleaners, updateUser } from "../../features/users/userSlice";
import { formatPhoneNumber } from "../../utils/formatters";
import { toast } from "react-toastify";

const CleanerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cleaners, isLoading } = useSelector((state) => state.users);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredCleaners, setFilteredCleaners] = useState([]);
  const [updatingCleaner, setUpdatingCleaner] = useState(null);

  useEffect(() => {
    dispatch(getCleaners());
  }, [dispatch]);

  // Handle cleaner status toggle
  const handleToggleStatus = async (cleaner) => {
    if (!cleaner._id) {
      toast.error("Invalid cleaner data");
      return;
    }

    // Show confirmation dialog
    const action = cleaner.isActive ? "deactivate" : "activate";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${cleaner.name}? ${
        cleaner.isActive
          ? "They will no longer be able to receive new assignments."
          : "They will be able to receive new assignments."
      }`
    );

    if (!confirmed) {
      return;
    }

    setUpdatingCleaner(cleaner._id);

    try {
      console.log(
        "Updating cleaner:",
        cleaner._id,
        "Current status:",
        cleaner.isActive
      );

      const updatedData = {
        isActive: !cleaner.isActive,
        // If activating, also set as available by default
        ...(cleaner.isActive ? {} : { isAvailable: true }),
      };

      console.log("Update data being sent:", updatedData);

      const result = await dispatch(
        updateUser({ id: cleaner._id, data: updatedData })
      ).unwrap();

      console.log("Update result:", result);

      toast.success(`Cleaner ${cleaner.name} has been ${action}d successfully`);

      // Refresh the cleaners list
      dispatch(getCleaners());
    } catch (error) {
      console.error("Error updating cleaner status:", error);

      // Provide more specific error messages
      let errorMessage = "Failed to update cleaner status";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    } finally {
      setUpdatingCleaner(null);
    }
  };

  // Filter, sort, and search cleaners
  useEffect(() => {
    if (!cleaners) return;

    let result = [...cleaners];

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((cleaner) => {
        if (filterStatus === "active") {
          return cleaner.isActive && cleaner.isAvailable;
        } else if (filterStatus === "busy") {
          return cleaner.isActive && !cleaner.isAvailable;
        } else if (filterStatus === "inactive") {
          return !cleaner.isActive;
        }
        return true;
      });
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (cleaner) =>
          cleaner.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          cleaner.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          (cleaner.phone && cleaner.phone.includes(searchTerm))
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
        case "phone":
          fieldA = a.phone || "";
          fieldB = b.phone || "";
          break;
        case "completedTasks":
          fieldA = a.completedTasks || 0;
          fieldB = b.completedTasks || 0;
          break;
        case "rating":
          fieldA = a.rating || 0;
          fieldB = b.rating || 0;
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

    setFilteredCleaners(result);
  }, [cleaners, filterStatus, searchTerm, sortField, sortDirection]);

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

  const filterConfig = [
    {
      key: "all",
      label: "All Cleaners",
      count: cleaners?.length || 0,
      icon: "fas fa-users",
    },
    {
      key: "active",
      label: "Available",
      count: cleaners?.filter((c) => c.isAvailable).length || 0,
      icon: "fas fa-user-check",
    },
    {
      key: "busy",
      label: "Busy",
      count: cleaners?.filter((c) => c.isActive && !c.isAvailable).length || 0,
      icon: "fas fa-user-clock",
    },
    {
      key: "inactive",
      label: "Inactive",
      count: cleaners?.filter((c) => !c.isActive).length || 0,
      icon: "fas fa-user-slash",
    },
  ];

  const getStatusConfig = (cleaner) => {
    if (!cleaner.isActive) {
      return {
        color: "bg-gray-500",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        borderColor: "border-gray-200",
        text: "Inactive",
      };
    } else if (cleaner.isAvailable) {
      return {
        color: "bg-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-200",
        text: "Available",
      };
    } else {
      return {
        color: "bg-yellow-500",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
        text: "Busy",
      };
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-400"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-300"></i>);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Cleaners
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage all cleaning staff members
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => dispatch(getCleaners())}
            disabled={isLoading}
          >
            <i
              className={`fas fa-sync-alt mr-2 ${
                isLoading ? "animate-spin" : ""
              }`}
            ></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {filterConfig.map((filter) => (
              <button
                key={filter.key}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  filterStatus === filter.key
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-sm"
                    : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFilterStatus(filter.key)}
              >
                <i className={`${filter.icon} mr-2`}></i>
                {filter.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    filterStatus === filter.key
                      ? "bg-blue-200 text-blue-800"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search cleaners by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading cleaners...</p>
          </div>
        </div>
      ) : filteredCleaners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCleaners.map((cleaner) => {
            const statusConfig = getStatusConfig(cleaner);
            console.log("Cleaner:", cleaner); // Debugging log
            return (
              <div
                key={cleaner._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div className="relative">
                      {cleaner.profileImage ? (
                        <img
                          src={cleaner.profileImage}
                          alt={cleaner.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md border-4 border-white">
                          {cleaner.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {/* Status Indicator */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${statusConfig.color} border-3 border-white shadow-sm`}
                      ></div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${statusConfig.color} mr-1`}
                      ></div>
                      {statusConfig.text}
                    </span>
                  </div>

                  {/* Cleaner Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                      {cleaner.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center">
                        <i className="fas fa-envelope text-gray-400 mr-2 w-4"></i>
                        <span className="truncate">{cleaner.email}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <i className="fas fa-phone text-gray-400 mr-2 w-4"></i>
                        <span>{formatPhoneNumber(cleaner.phone)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {cleaner.completedTasks || 0}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        Completed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {cleaner.onTimePercentage || 0}%
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        On Time
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center mb-1">
                        <span className="text-lg font-bold text-yellow-500 mr-1">
                          {cleaner.rating ? cleaner.rating.toFixed(1) : "0.0"}
                        </span>
                      </div>
                      <div className="flex justify-center space-x-0.5 mb-1">
                        {renderStarRating(cleaner.rating || 0)}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        Rating
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => handleToggleStatus(cleaner)}
                    disabled={updatingCleaner === cleaner._id}
                    className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      cleaner.isActive
                        ? "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 hover:border-red-400"
                        : "bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 hover:border-green-400"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={
                      cleaner.isActive
                        ? "Deactivate Cleaner"
                        : "Activate Cleaner"
                    }
                  >
                    {updatingCleaner === cleaner._id ? (
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                    ) : (
                      <i
                        className={`fas fa-${
                          cleaner.isActive ? "user-slash" : "user-check"
                        } mr-2`}
                      ></i>
                    )}
                    {cleaner.isActive ? "Deactivate" : "Activate"}
                  </button>
                </div>

                {/* Performance Indicator */}
                <div className="h-1 bg-gray-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      (cleaner.rating || 0) >= 4
                        ? "bg-green-500"
                        : (cleaner.rating || 0) >= 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        ((cleaner.rating || 0) / 5) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <i className="fas fa-user-friends text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No cleaners found
            </h3>
            <p className="text-gray-500">
              No cleaners match the current filters. Try adjusting your search
              or filter criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanerList;

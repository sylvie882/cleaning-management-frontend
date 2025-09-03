// src/pages/Manager/Bookings.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../features/booking/bookingSlice";
import { formatDateTime } from "../../utils/formatters";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  // Filter, sort, and search bookings
  useEffect(() => {
    if (!bookings) return;

    let result = [...bookings];

    // Filter by status
    if (activeTab !== "all") {
      result = result.filter((booking) => {
        if (activeTab === "pending") {
          return booking.status === "pending";
        } else if (activeTab === "pre_visit") {
          return (
            booking.status === "pre_visit_scheduled" ||
            booking.status === "pre_visit_completed"
          );
        } else if (activeTab === "assigned") {
          return booking.status === "assigned";
        } else if (activeTab === "in_progress") {
          return booking.status === "in_progress";
        } else if (activeTab === "completed") {
          return booking.status === "completed";
        } else if (activeTab === "cancelled") {
          return booking.status === "cancelled";
        }
        return true;
      });
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.client.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.serviceType.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking._id.toLowerCase().includes(lowerCaseSearchTerm) ||
          (booking.location.address &&
            booking.location.address
              .toLowerCase()
              .includes(lowerCaseSearchTerm))
      );
    }

    // Sort
    result.sort((a, b) => {
      let fieldA, fieldB;

      // Determine fields to compare based on sortField
      switch (sortField) {
        case "createdAt":
          fieldA = new Date(a.createdAt).getTime();
          fieldB = new Date(b.createdAt).getTime();
          break;
        case "scheduledDate":
          fieldA = new Date(
            a.scheduledDateTime || a.preferredDateTime
          ).getTime();
          fieldB = new Date(
            b.scheduledDateTime || b.preferredDateTime
          ).getTime();
          break;
        case "clientName":
          fieldA = a.client.name.toLowerCase();
          fieldB = b.client.name.toLowerCase();
          break;
        case "serviceType":
          fieldA = a.serviceType.toLowerCase();
          fieldB = b.serviceType.toLowerCase();
          break;
        case "status":
          fieldA = a.status;
          fieldB = b.status;
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

    setFilteredBookings(result);
  }, [bookings, activeTab, searchTerm, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for dates, ascending for others
      setSortField(field);
      setSortDirection(
        field === "createdAt" || field === "scheduledDate" ? "desc" : "asc"
      );
    }
  };

  // Export bookings data to CSV
  const exportToCSV = () => {
    // Implementation of CSV export would go here
    alert("Exporting bookings to CSV...");
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "fas fa-clock",
        label: "Pending",
      },
      pre_visit_scheduled: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "fas fa-calendar-check",
        label: "Pre-Visit Scheduled",
      },
      pre_visit_completed: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "fas fa-clipboard-check",
        label: "Pre-Visit Completed",
      },
      assigned: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        icon: "fas fa-user-check",
        label: "Assigned",
      },
      in_progress: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: "fas fa-spinner",
        label: "In Progress",
      },
      completed: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "fas fa-check-circle",
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: "fas fa-times-circle",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <i className={`${config.icon} mr-1.5 text-xs`}></i>
        {config.label}
      </span>
    );
  };

  const tabs = [
    { id: "all", label: "All Bookings", count: bookings?.length || 0 },
    {
      id: "pending",
      label: "Pending",
      count: bookings?.filter((b) => b.status === "pending").length || 0,
    },
    {
      id: "pre_visit",
      label: "Pre-Visit",
      count:
        bookings?.filter((b) => b.status.includes("pre_visit")).length || 0,
    },
    {
      id: "assigned",
      label: "Assigned",
      count: bookings?.filter((b) => b.status === "assigned").length || 0,
    },
    {
      id: "in_progress",
      label: "In Progress",
      count: bookings?.filter((b) => b.status === "in_progress").length || 0,
    },
    {
      id: "completed",
      label: "Completed",
      count: bookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: bookings?.filter((b) => b.status === "cancelled").length || 0,
    },
  ];

  const stats = [
    {
      label: "Pending",
      value: bookings?.filter((b) => b.status === "pending").length || 0,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      icon: "fas fa-clock",
    },
    {
      label: "Pre-Visit",
      value:
        bookings?.filter((b) => b.status.includes("pre_visit")).length || 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "fas fa-calendar-check",
    },
    {
      label: "Assigned",
      value: bookings?.filter((b) => b.status === "assigned").length || 0,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      icon: "fas fa-user-check",
    },
    {
      label: "In Progress",
      value: bookings?.filter((b) => b.status === "in_progress").length || 0,
      color: "text-orange-600",
      bg: "bg-orange-50",
      icon: "fas fa-spinner",
    },
    {
      label: "Completed",
      value: bookings?.filter((b) => b.status === "completed").length || 0,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: "fas fa-check-circle",
    },
    {
      label: "Cancelled",
      value: bookings?.filter((b) => b.status === "cancelled").length || 0,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: "fas fa-times-circle",
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
                <i className="fas fa-calendar-alt mr-3 text-blue-600"></i>
                Booking Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and monitor all cleaning service bookings
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => dispatch(getAllBookings())}
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
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <i className="fas fa-file-export mr-2"></i>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bg} rounded-lg p-4 border border-gray-200`}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mr-3`}
                >
                  <i className={`${stat.icon} ${stat.color} text-sm`}></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tab.count}
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
                placeholder="Search bookings..."
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
                <p className="text-gray-600 text-lg">Loading bookings...</p>
              </div>
            </div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      onClick={() => handleSort("_id")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Reference</span>
                        {sortField === "_id" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("clientName")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Client</span>
                        {sortField === "clientName" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("serviceType")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Service Type</span>
                        {sortField === "serviceType" && (
                          <i
                            className={`fas fa-sort-${
                              sortDirection === "asc" ? "up" : "down"
                            } text-blue-600`}
                          ></i>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("scheduledDate")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === "scheduledDate" && (
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
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{booking._id.slice(-6).toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user text-blue-600"></i>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.client.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.client.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className="fas fa-broom text-gray-400 mr-2"></i>
                          <span className="text-sm text-gray-900">
                            {booking.serviceType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(
                            booking.scheduledDateTime ||
                              booking.preferredDateTime
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.assignedCleaner ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <i className="fas fa-user-check text-green-600 text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-900">
                              {booking.assignedCleaner.name ||
                                booking.assignedCleaner}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                              <i className="fas fa-user-slash text-gray-400 text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-500">
                              Not Assigned
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/dashboard/manager/bookings/${booking._id}`}
                            className="inline-flex items-center p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            title="View Details"
                          >
                            <i className="fas fa-eye text-sm"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-times text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-600 mb-6">
                No bookings match your current filters.
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

export default Bookings;

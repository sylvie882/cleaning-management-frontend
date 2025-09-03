/* eslint-disable no-unused-vars */
// src/pages/Cleaner/TaskHistory.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCleanerBookings } from "../../features/booking/bookingSlice";
import { formatDateTime } from "../../utils/formatters";

const TaskHistory = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    dispatch(getCleanerBookings());
  }, [dispatch]);

  // Filter, sort, and search bookings
  useEffect(() => {
    if (!bookings) return;

    // Only show completed and cancelled bookings in history
    let result = bookings.filter(
      (booking) =>
        booking.status === "completed" || booking.status === "cancelled"
    );

    // Filter by status if not 'all'
    if (filterStatus !== "all") {
      result = result.filter((booking) => booking.status === filterStatus);
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.client.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.serviceType.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.location.address
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          booking._id.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Sort
    result.sort((a, b) => {
      let fieldA, fieldB;

      // Determine fields to compare based on sortField
      switch (sortField) {
        case "date":
          fieldA = new Date(a.updatedAt).getTime();
          fieldB = new Date(b.updatedAt).getTime();
          break;
        case "client":
          fieldA = a.client.name.toLowerCase();
          fieldB = b.client.name.toLowerCase();
          break;
        case "service":
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
  }, [bookings, searchTerm, sortField, sortDirection, filterStatus]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for dates, ascending for text
      setSortField(field);
      setSortDirection(field === "date" ? "desc" : "asc");
    }
  };

  // Get status styling
  const getStatusStyle = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
          status
        )}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Rating stars component
  const RatingStars = ({ rating }) => {
    if (!rating) {
      return <span className="text-gray-400 text-sm">No rating</span>;
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < rating.score ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600 font-medium">
          {rating.score.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Task History
                </h1>
                <p className="text-gray-600">
                  View your completed and cancelled tasks
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => dispatch(getCleanerBookings())}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg
                  className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "all",
                  label: "All Tasks",
                  count: filteredBookings.length,
                },
                {
                  key: "completed",
                  label: "Completed",
                  count:
                    bookings?.filter((b) => b.status === "completed").length ||
                    0,
                },
                {
                  key: "cancelled",
                  label: "Cancelled",
                  count:
                    bookings?.filter((b) => b.status === "cancelled").length ||
                    0,
                },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filterStatus === filter.key
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filterStatus === filter.key
                        ? "bg-purple-200 text-purple-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 font-medium">
                Loading task history...
              </p>
            </div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: "date", label: "Date" },
                      { key: "client", label: "Client" },
                      { key: "service", label: "Service Type" },
                      { key: "location", label: "Location", sortable: false },
                      { key: "status", label: "Status" },
                      { key: "rating", label: "Rating", sortable: false },
                      { key: "actions", label: "Actions", sortable: false },
                    ].map((header) => (
                      <th
                        key={header.key}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          header.sortable !== false
                            ? "cursor-pointer hover:bg-gray-100"
                            : ""
                        }`}
                        onClick={
                          header.sortable !== false
                            ? () => handleSort(header.key)
                            : undefined
                        }
                      >
                        <div className="flex items-center space-x-1">
                          <span>{header.label}</span>
                          {header.sortable !== false &&
                            sortField === header.key && (
                              <svg
                                className={`w-4 h-4 text-gray-400 ${
                                  sortDirection === "desc"
                                    ? "transform rotate-180"
                                    : ""
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {new Date(booking.updatedAt).toLocaleDateString()}
                          </span>
                          <span className="text-gray-500">
                            {new Date(booking.updatedAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.client.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.client.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.serviceType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <div className="font-medium">
                            {booking.location.address}
                          </div>
                          <div className="text-gray-500">
                            {booking.location.city}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RatingStars rating={booking.rating} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/dashboard/cleaner/task/${booking._id}`}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                          title="View Details"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              <div className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {booking.serviceType}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.updatedAt).toLocaleDateString()} at{" "}
                          {new Date(booking.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.client.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.client.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-900">
                            {booking.location.address}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.location.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Rating</p>
                          <RatingStars rating={booking.rating} />
                        </div>
                        <Link
                          to={`/dashboard/cleaner/task/${booking._id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Task History
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't completed any tasks yet. Your finished tasks will
                appear here once you complete them.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskHistory;

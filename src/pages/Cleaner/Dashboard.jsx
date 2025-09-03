// src/pages/Cleaner/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCleanerBookings } from "../../features/booking/bookingSlice";
import CleanerStats from "../../components/Cleaner/CleanerStats";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Since the backend uses req.user.id from the token, we don't need to pass cleaner ID
    dispatch(getCleanerBookings());
  }, [dispatch]);

  // Pre-calculate filtered bookings for each tab type
  const bookingCounts = useMemo(() => {
    const now = new Date();

    // Count bookings by status
    const upcomingCount = bookings.filter((booking) => {
      const bookingDate = new Date(
        booking.scheduledDateTime || booking.preferredDateTime
      );
      return booking.status === "assigned" && bookingDate >= now;
    }).length;

    const inProgressCount = bookings.filter(
      (booking) => booking.status === "in_progress"
    ).length;

    const completedCount = bookings.filter(
      (booking) => booking.status === "completed"
    ).length;

    return {
      upcoming: upcomingCount,
      in_progress: inProgressCount,
      completed: completedCount,
    };
  }, [bookings]);

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    const now = new Date();

    return bookings.filter((booking) => {
      const bookingDate = new Date(
        booking.scheduledDateTime || booking.preferredDateTime
      );

      if (activeTab === "upcoming") {
        return booking.status === "assigned" && bookingDate >= now;
      } else if (activeTab === "in_progress") {
        return booking.status === "in_progress";
      } else if (activeTab === "completed") {
        return booking.status === "completed";
      }
      return true;
    });
  }, [bookings, activeTab]);

  console.log("Cleaner bookings:", bookings);
  console.log("User:", user);
  console.log("Booking counts:", bookingCounts);

  // Get status styling
  const getStatusStyle = (status) => {
    const styles = {
      assigned: "bg-blue-100 text-blue-800 border-blue-200",
      in_progress: "bg-yellow-100 text-yellow-800 border-yellow-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[status] || styles.pending;
  };

  const handleRefreshBookings = () => {
    dispatch(getCleanerBookings());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={handleRefreshBookings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name || user?.user?.name || "Cleaner"}
                </h1>
                <p className="text-gray-600">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleRefreshBookings}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
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
                {isLoading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="mb-8">
          <CleanerStats bookings={bookings} />
        </div>

        {/* Tasks Manager Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: "upcoming", label: "Upcoming Tasks", icon: "📅" },
                { key: "in_progress", label: "In Progress", icon: "⚡" },
                { key: "completed", label: "Completed", icon: "✅" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 flex items-center space-x-2`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`${
                      activeTab === tab.key
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    } ml-2 py-0.5 px-2 rounded-full text-xs font-medium`}
                  >
                    {bookingCounts[tab.key]}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tasks Content */}
          <div className="p-6">
            {filteredBookings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status.replace(/_/g, " ").toUpperCase()}
                        </span>
                        <span className="text-sm font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          #{booking._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-4 space-y-4">
                      {/* Service Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {booking.serviceType}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3">
                            <svg
                              className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
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
                              <p className="text-sm text-gray-600 font-medium">
                                {booking.location?.address ||
                                  "No address provided"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.location?.city || ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <svg
                              className="w-4 h-4 text-gray-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                booking.scheduledDateTime ||
                                  booking.preferredDateTime
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <svg
                              className="w-4 h-4 text-gray-400 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                booking.scheduledDateTime ||
                                  booking.preferredDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Client Details
                        </h4>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {booking.client?.name || "No name provided"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.client?.phone || "No phone provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <Link
                          to={`/dashboard/cleaner/task/${booking._id}`}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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

                        {booking.status === "assigned" && (
                          <Link
                            to={`/dashboard/cleaner/task/${booking._id}/start`}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Start Task
                          </Link>
                        )}

                        {booking.status === "in_progress" && (
                          <Link
                            to={`/dashboard/cleaner/task/${booking._id}/complete`}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Mark Complete
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 12V8a4 4 0 118 0v4m-8 0V8a4 4 0 118 0v4m-8 0h16l-1 12H13l-1-12z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab.replace(/_/g, " ")} tasks found
                </h3>
                {activeTab === "upcoming" && (
                  <p className="text-gray-500 max-w-md mx-auto">
                    When you are assigned to a cleaning job, it will appear
                    here. Check back later or contact your supervisor for new
                    assignments.
                  </p>
                )}
                {activeTab === "in_progress" && (
                  <p className="text-gray-500 max-w-md mx-auto">
                    No tasks currently in progress. Start an assigned task to
                    see it here.
                  </p>
                )}
                {activeTab === "completed" && (
                  <p className="text-gray-500 max-w-md mx-auto">
                    Your completed tasks will appear here once you finish them.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

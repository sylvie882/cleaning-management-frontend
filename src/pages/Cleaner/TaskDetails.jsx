// src/pages/Cleaner/TaskDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateCleanerProgress,
} from "../../features/booking/bookingSlice";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getBookingById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (booking) {
      setStatus(booking.status);
    }
  }, [booking]);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    const updatedData = {
      status: newStatus,
      notes: notes,
    };

    try {
      const result = await dispatch(
        updateCleanerProgress({ id, data: updatedData })
      );
      if (updateCleanerProgress.fulfilled.match(result)) {
        setStatus(newStatus);
        setNotes("");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const startTask = () => {
    handleStatusUpdate("in_progress");
  };

  const completeTask = () => {
    handleStatusUpdate("completed");
  };

  // Get status styling
  const getStatusConfig = (status) => {
    const configs = {
      assigned: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
        icon: "🎯",
      },
      in_progress: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
        icon: "⚡",
      },
      completed: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        dot: "bg-green-500",
        icon: "✅",
      },
      pending: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        dot: "bg-gray-500",
        icon: "⏳",
      },
    };
    return configs[status] || configs.pending;
  };

  if (isLoading || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Loading Task Details
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your task information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Task
            </h3>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => dispatch(getBookingById(id))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scheduledDate = new Date(
    booking.scheduledDateTime || booking.preferredDateTime
  );
  const statusConfig = getStatusConfig(status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20">
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard/cleaner")}
                className="group inline-flex items-center justify-center p-2.5 border border-gray-200 rounded-xl shadow-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Task Details
                  </h1>
                  <span className="text-2xl">{statusConfig.icon}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <p className="text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded-md">
                    ID: #{id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-gray-500">
                    {scheduledDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} shadow-sm`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${statusConfig.dot} mr-2.5 animate-pulse`}
                ></span>
                {status.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Service Information Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Service Information
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Complete service details and requirements
                </p>
              </div>
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                    <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">
                      Service Type
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {booking.serviceType}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                    <p className="text-sm font-medium text-green-600 mb-2 uppercase tracking-wide">
                      Budget
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {booking.budget
                        ? `ksh ${booking.budget.toFixed(2)}`
                        : "Contact for Quote"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                    <p className="text-sm font-medium text-purple-600 mb-2 uppercase tracking-wide">
                      Scheduled Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {scheduledDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                    <p className="text-sm font-medium text-amber-600 mb-2 uppercase tracking-wide">
                      Scheduled Time
                    </p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {scheduledDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {booking.description && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Description
                      </h3>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {booking.description}
                      </p>
                    </div>
                  </div>
                )}

                {booking.notes && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Special Instructions
                      </h3>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                      <p className="text-amber-800 font-medium">
                        {booking.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Information Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Location Details
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  Complete address and location information
                </p>
              </div>
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                    <p className="text-sm font-medium text-green-600 mb-2 uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900 flex items-start">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {booking.location.address}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm font-medium text-blue-600 mb-1 uppercase tracking-wide">
                      City
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {booking.location.city}
                    </p>
                  </div>
                  {booking.location.state && (
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                      <p className="text-sm font-medium text-purple-600 mb-1 uppercase tracking-wide">
                        State/Province
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {booking.location.state}
                      </p>
                    </div>
                  )}
                  {booking.location.zipCode && (
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <p className="text-sm font-medium text-indigo-600 mb-1 uppercase tracking-wide">
                        Zip/Postal Code
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {booking.location.zipCode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Map Placeholder */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl h-56 flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold text-lg mb-1">
                        Interactive Map
                      </p>
                      <p className="text-gray-500 text-sm">
                        Navigation and directions coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            {/* Client Information Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="px-6 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5"
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
                  Client Information
                </h2>
                <p className="text-purple-100 text-sm mt-1">
                  Contact details and information
                </p>
              </div>
              <div className="px-6 py-6 space-y-5">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-purple-600"
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
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                        Client Name
                      </p>
                      <p className="text-lg font-bold text-gray-900 truncate">
                        {booking.client.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${booking.client.phone}`}
                        className="text-lg font-semibold text-green-700 hover:text-green-800 transition-colors"
                      >
                        {booking.client.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${booking.client.email}`}
                        className="text-base font-semibold text-blue-700 hover:text-blue-800 transition-colors break-all"
                      >
                        {booking.client.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Task Update Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="px-6 py-5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Update Task Status
                </h2>
                <p className="text-indigo-100 text-sm mt-1">
                  Manage progress and update task status
                </p>
              </div>
              <div className="px-6 py-6 space-y-6">
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Progress Notes & Comments
                    </div>
                  </label>
                  <div className="relative">
                    <textarea
                      id="notes"
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter detailed notes about task progress, any issues encountered, completion status, or special circumstances..."
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {notes.length}/500
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {status === "assigned" && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800">
                            Ready to Start
                          </h3>
                          <p className="text-sm text-green-600">
                            Click below to begin this task
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={startTask}
                        disabled={isUpdating}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      >
                        {isUpdating ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Starting Task...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-2"
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
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {status === "in_progress" && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">
                            Task in Progress
                          </h3>
                          <p className="text-sm text-blue-600">
                            Mark as completed when finished
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={completeTask}
                        disabled={isUpdating}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      >
                        {isUpdating ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Completing Task...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Mark as Completed
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {status === "completed" && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Task Completed!
                        </h3>
                        <p className="text-green-600 text-sm mb-4">
                          Excellent work! This task has been successfully
                          completed.
                        </p>
                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <p className="text-sm text-green-700">
                            ✅ Task marked as complete
                            <br />
                            📧 Client has been notified
                            <br />
                            📊 Performance metrics updated
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${booking.client.phone}`}
                      className="flex items-center justify-center px-3 py-2 border border-green-200 rounded-lg text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Call Client
                    </a>
                    <a
                      href={`mailto:${booking.client.email}`}
                      className="flex items-center justify-center px-3 py-2 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                <h2 className="text-lg font-bold flex items-center">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4"
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
                  Task Timeline
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"></div>
                        <div className="relative flex space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              className="h-4 w-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Task Assigned
                            </p>
                            <p className="text-sm text-gray-500">
                              Task was assigned to you
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"></div>
                        <div className="relative flex space-x-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              status === "in_progress" || status === "completed"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <svg
                              className="h-4 w-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Task Started
                            </p>
                            <p className="text-sm text-gray-500">
                              {status === "in_progress" ||
                              status === "completed"
                                ? "In progress"
                                : "Pending start"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative">
                        <div className="relative flex space-x-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              status === "completed"
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <svg
                              className="h-4 w-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Task Completed
                            </p>
                            <p className="text-sm text-gray-500">
                              {status === "completed"
                                ? "Successfully completed"
                                : "Awaiting completion"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

/* eslint-disable no-unused-vars */
// src/pages/Cleaner/TaskUpdate.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateCleanerProgress,
} from "../../features/booking/bookingSlice";
import TaskForm from "../../components/Cleaner/TaskForm";
import { formatDateTime } from "../../utils/formatters";

const TaskUpdate = ({ mode = "start" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.booking
  );

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getBookingById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // If the task is already in the correct status, redirect back to details
    if (booking) {
      if (mode === "start" && booking.status === "in_progress") {
        navigate(`/dashboard/cleaner/task/${id}`);
      } else if (mode === "complete" && booking.status === "completed") {
        navigate(`/dashboard/cleaner/task/${id}`);
      }
    }
  }, [booking, mode, id, navigate]);

  // Handle form submission
  const handleSubmit = (formData) => {
    dispatch(updateCleanerProgress({ id, data: formData })).then((result) => {
      if (updateCleanerProgress.fulfilled.match(result)) {
        setSubmitted(true);
        setTimeout(() => {
          navigate("/dashboard/cleaner");
        }, 2000);
      }
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            {/* Enhanced Loading Animation */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin [animation-duration:0.8s]"></div>
              <div className="absolute top-2 left-2 w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin [animation-duration:1.2s] [animation-direction:reverse]"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Loading Task Details
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your task information...
              </p>
              <div className="flex justify-center mt-4 space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-white/20">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Error Loading Task
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
            <button
              onClick={() => navigate("/dashboard/cleaner")}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-white/20">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Task Not Found
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The task you're looking for doesn't exist or you don't have
              permission to access it.
            </p>
            <button
              onClick={() => navigate("/cleaner/dashboard")}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-white/20">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {mode === "start"
                ? "Task Started Successfully!"
                : "Task Completed Successfully!"}
            </h2>
            <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getModeConfig = () => {
    if (mode === "start") {
      return {
        title: "Start Task",
        subtitle: "Begin working on this cleaning task",
        icon: (
          <svg
            className="w-6 h-6 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        ),
        gradient: "from-green-500 to-emerald-600",
        bgGradient: "from-gray-50 via-green-50/30 to-emerald-50/30",
      };
    } else {
      return {
        title: "Complete Task",
        subtitle: "Mark this cleaning task as completed",
        icon: (
          <svg
            className="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-gray-50 via-blue-50/30 to-indigo-50/30",
      };
    }
  };

  const config = getModeConfig();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient}`}>
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                  <div className="w-10 h-10 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                    {config.icon}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {config.title}
                  </h1>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {config.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                ID: #{id.slice(-8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Task Details Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300">
          <div
            className={`px-6 sm:px-8 py-5 bg-gradient-to-r ${config.gradient} text-white`}
          >
            <h3 className="text-xl font-bold flex items-center">
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
              Task Information
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Review the task details before proceeding
            </p>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    Service Type
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {booking.serviceType}
                </span>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-purple-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                    Client
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {booking.client.name}
                </span>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                    Location
                  </span>
                </div>
                <span className="text-base font-semibold text-gray-900">
                  {booking.location.address}, {booking.location.city}
                </span>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-amber-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                    Scheduled For
                  </span>
                </div>
                <span className="text-base font-semibold text-gray-900">
                  {formatDateTime
                    ? formatDateTime(
                        booking.scheduledDateTime || booking.preferredDateTime
                      )
                    : new Date(
                        booking.scheduledDateTime || booking.preferredDateTime
                      ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div
            className={`px-6 sm:px-8 py-5 bg-gradient-to-r ${config.gradient} text-white`}
          >
            <h3 className="text-xl font-bold flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {mode === "start" ? "Start Task Form" : "Completion Form"}
            </h3>
            <p className="text-white/80 text-sm mt-1">
              {mode === "start"
                ? "Fill out the form below to start working on this task"
                : "Complete the form to mark this task as finished"}
            </p>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <TaskForm task={booking} mode={mode} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;

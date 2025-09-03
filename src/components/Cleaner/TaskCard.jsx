// src/components/Cleaner/TaskCard.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getCleanerBookings } from "../../features/booking/bookingSlice";

const TaskCard = ({ taskId }) => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    // Fetch cleaner bookings to ensure data is up-to-date
    dispatch(getCleanerBookings());
  }, [dispatch]);

  // Find the specific task from the bookings
  const task = bookings.find((booking) => booking._id === taskId);

  // If task is not found or data is still loading, show loading state
  if (isLoading || !task) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium text-sm">Loading task...</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(
    task.scheduledDateTime || task.preferredDateTime
  ).toLocaleDateString();

  const formattedTime = new Date(
    task.scheduledDateTime || task.preferredDateTime
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Calculate time from now
  const timeFromNow = formatDistance(
    new Date(task.scheduledDateTime || task.preferredDateTime),
    new Date(),
    { addSuffix: true }
  );

  // Enhanced status color mapping with professional styling
  const getStatusStyles = (status) => {
    const statusMap = {
      assigned:
        "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200/50",
      in_progress:
        "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-200/50",
      completed:
        "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200/50",
      cancelled: "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-200/50",
      pending:
        "bg-gray-50 text-gray-700 border-gray-200 ring-1 ring-gray-200/50",
    };
    return (
      statusMap[status] ||
      "bg-gray-50 text-gray-700 border-gray-200 ring-1 ring-gray-200/50"
    );
  };

  // Priority indicator based on time remaining
  const getPriorityIndicator = () => {
    const taskDate = new Date(task.scheduledDateTime || task.preferredDateTime);
    const now = new Date();
    const hoursUntil = (taskDate - now) / (1000 * 60 * 60);

    if (hoursUntil < 2) return "bg-red-500";
    if (hoursUntil < 24) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden backdrop-blur-sm">
      {/* Priority Indicator Strip */}
      <div className={`h-1 ${getPriorityIndicator()}`}></div>

      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide ${getStatusStyles(
              task.status
            )}`}
          >
            {task.status.replace(/_/g, " ").toUpperCase()}
          </span>
          {task.status === "in_progress" && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-amber-600 font-medium">Active</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border">
            #{task._id.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">
        {/* Task Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {task.serviceType}
            </h3>
            <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              <i className="fas fa-hourglass-half mr-1.5"></i>
              <span className="font-medium">{timeFromNow}</span>
            </div>
          </div>

          <div className="flex items-start text-gray-600">
            <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400 text-sm"></i>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {task.location?.address || "No address provided"}
              </p>
              <p className="text-sm text-gray-500">
                {task.location?.city || ""}
              </p>
            </div>
          </div>

          {/* Enhanced Time Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="far fa-calendar-alt text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="far fa-clock text-green-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Time
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formattedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Client Information
            </h4>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {task.client?.name?.charAt(0).toUpperCase() || "C"}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {task.client?.name || "No name provided"}
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-phone mr-2 text-gray-400"></i>
                <span>{task.client?.phone || "No phone provided"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Actions */}
      <div className="px-5 pb-5 space-y-3 bg-gray-50/50">
        <Link
          to={`/dashboard/cleaner/task/${task._id}`}
          className="group/btn w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          <i className="fas fa-eye mr-2 group-hover/btn:text-blue-600 transition-colors"></i>
          View Details
        </Link>

        {task.status === "assigned" && (
          <Link
            to={`/dashboard/cleaner/task/${task._id}/start`}
            className="group/btn w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <i className="fas fa-play mr-2 group-hover/btn:scale-110 transition-transform"></i>
            Start Task
          </Link>
        )}

        {task.status === "in_progress" && (
          <Link
            to={`/dashboard/cleaner/task/${task._id}/complete`}
            className="group/btn w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <i className="fas fa-check mr-2 group-hover/btn:scale-110 transition-transform"></i>
            Mark Complete
          </Link>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

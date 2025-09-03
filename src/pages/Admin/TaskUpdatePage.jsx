// src/pages/Admin/TaskUpdatePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";
import { getCleaners } from "../../features/users/userSlice";

const TaskUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  // Debug logging
  useEffect(() => {
    console.log("=== TASK UPDATE PAGE DEBUG ===");
    console.log("Booking state:", { booking, isLoading, isError, message });
    console.log(
      "User role:",
      JSON.parse(localStorage.getItem("user"))?.user?.role
    );
    console.log("=============================");
  }, [booking, isLoading, isError, message]);

  const { cleaners } = useSelector((state) => state.users);

  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
    dispatch(getCleaners());
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
        updateBookingStatus({ id, data: updatedData })
      );
      if (updateBookingStatus.fulfilled.match(result)) {
        setStatus(newStatus);
        setNotes("");
        navigate("/dashboard/admin");
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

  const getStatusStyle = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pre_visit_scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      pre_visit_completed: "bg-purple-100 text-purple-800 border-purple-200",
      assigned: "bg-green-100 text-green-800 border-green-200",
      in_progress: "bg-orange-100 text-orange-800 border-orange-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Booking
            </h2>
            <p className="text-red-600">Error: {message}</p>
            <p className="text-red-600">IsError: {isError.toString()}</p>
            <p className="text-red-600">IsLoading: {isLoading.toString()}</p>
            <p className="text-red-600">
              Booking: {booking ? "Exists" : "Null"}
            </p>
            <button
              onClick={() => navigate("/dashboard/admin")}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Booking Not Found
            </h2>
            <p className="text-yellow-600">
              The booking you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/dashboard/admin")}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Update Task Status
          </h1>
          <p className="text-gray-600 mt-2">
            Reference: #{id.slice(-6).toUpperCase()}
          </p>
        </div>

        {/* Task Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Task Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Current Status:
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Client:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.client?.name || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Service Type:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.serviceType || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Location:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.location
                    ? `${booking.location.address}, ${booking.location.city}`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Assigned Cleaner:
                </span>
                <p className="text-gray-900 mt-1">
                  {cleaners.find((c) => c._id === booking.assignedCleaner)
                    ?.name || "Not assigned"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Scheduled Date:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.scheduledDateTime
                    ? new Date(booking.scheduledDateTime).toLocaleString()
                    : "Not scheduled"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Budget:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.budget ? `Ksh. ${booking.budget}` : "Not set"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Contact:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.client?.email || "N/A"}
                </p>
                <p className="text-gray-900">
                  {booking.client?.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Assessment Details if available */}
          {booking.assessmentDetails && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assessment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {booking.assessmentDetails.rooms && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Rooms:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {booking.assessmentDetails.rooms}
                    </p>
                  </div>
                )}
                {booking.assessmentDetails.bathrooms && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Bathrooms:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {booking.assessmentDetails.bathrooms}
                    </p>
                  </div>
                )}
                {booking.assessmentDetails.kitchen && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Kitchen:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {booking.assessmentDetails.kitchen}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Update Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Update Task Status
          </h2>

          <div className="space-y-6">
            {/* Current Status Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Status
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>

            {/* Status Update Options */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Available Actions
              </h3>

              {booking.status === "assigned" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">
                    Start Task
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Mark the task as in progress when the cleaner begins work.
                  </p>
                  <button
                    onClick={startTask}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Start Task"}
                  </button>
                </div>
              )}

              {booking.status === "in_progress" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Complete Task
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Mark the task as completed when the cleaning is finished.
                  </p>
                  <button
                    onClick={completeTask}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Complete Task"}
                  </button>
                </div>
              )}

              {/* Manual Status Update */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  Manual Status Update
                </h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Manually update the status to any value.
                </p>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="pre_visit_scheduled">
                        Pre-Visit Scheduled
                      </option>
                      <option value="pre_visit_completed">
                        Pre-Visit Completed
                      </option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add notes about the status update..."
                    />
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(status)}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/dashboard/admin")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdatePage;

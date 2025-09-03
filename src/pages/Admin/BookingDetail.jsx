/* eslint-disable no-unused-vars */
// src/pages/Admin/BookingDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";
import { getCleaners } from "../../features/users/userSlice";
import BookingModal from "../../components/HeadOfCleaning/BookingModal";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const { cleaners, isLoading: cleanersLoading } = useSelector(
    (state) => state.users
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
    dispatch(getCleaners());
  }, [dispatch, id]);

  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
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
            <p className="text-red-600">{message}</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Booking Details
              </h1>
              <p className="text-gray-600 mt-2">
                Reference: #{booking._id.slice(-6).toUpperCase()}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/dashboard/admin")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
              <button
                onClick={openBookingModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Manage Booking
              </button>
            </div>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Booking Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Status:
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
                  Contact:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.client?.email || "N/A"}
                </p>
                <p className="text-gray-900">
                  {booking.client?.phone || "N/A"}
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
            </div>
            <div className="space-y-4">
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
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Preferred Date:
                </span>
                <p className="text-gray-900 mt-1">
                  {new Date(booking.preferredDateTime).toLocaleString()}
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
                  Description:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.description || "No additional details"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(booking.preVisitDate ||
            booking.scheduledDateTime ||
            booking.assignedCleaner) && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {booking.preVisitDate && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Pre-Visit Date:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {new Date(booking.preVisitDate).toLocaleString()}
                    </p>
                  </div>
                )}
                {booking.scheduledDateTime && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Scheduled Date:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {new Date(booking.scheduledDateTime).toLocaleString()}
                    </p>
                  </div>
                )}
                {booking.assignedCleaner && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Assigned Cleaner:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {cleaners.find((c) => c._id === booking.assignedCleaner)
                        ?.name || "Unknown"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notes
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">{booking.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions</h2>
          <div className="flex flex-wrap gap-3">
            {booking.status === "pending" && (
              <button
                onClick={() =>
                  navigate(`/dashboard/admin/schedule-visit/${booking._id}`)
                }
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule Pre-Visit
              </button>
            )}

            {booking.status === "pre_visit_scheduled" && (
              <button
                onClick={() =>
                  navigate(`/dashboard/admin/complete-visit/${booking._id}`)
                }
                className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <i className="fas fa-clipboard-check mr-2"></i>
                Complete Pre-Visit
              </button>
            )}

            {booking.status === "pre_visit_completed" && (
              <button
                onClick={() =>
                  navigate(`/dashboard/admin/assign/${booking._id}`)
                }
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Assign Cleaner
              </button>
            )}

            {(booking.status === "assigned" ||
              booking.status === "in_progress") && (
              <button
                onClick={() => navigate(`/dashboard/admin/task/${booking._id}`)}
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <i className="fas fa-tasks mr-2"></i>
                Update Task Status
              </button>
            )}

            <button
              onClick={openBookingModal}
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
            >
              <i className="fas fa-edit mr-2"></i>
              Manage Booking
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          booking={booking}
          cleaners={cleaners}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

export default BookingDetail;

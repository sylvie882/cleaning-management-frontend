// src/pages/Admin/ScheduleVisitPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";

const ScheduleVisitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [preVisitDate, setPreVisitDate] = useState("");
  const [preVisitTime, setPreVisitTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (booking && booking.preferredDateTime) {
      const date = new Date(booking.preferredDateTime);
      setPreVisitDate(date.toISOString().split("T")[0]);
      setPreVisitTime(date.toTimeString().slice(0, 5));
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const scheduledDateTime = new Date(`${preVisitDate}T${preVisitTime}`);

    const updatedData = {
      status: "pre_visit_scheduled",
      preVisitDate: scheduledDateTime.toISOString(),
      notes: notes,
    };

    dispatch(updateBookingStatus({ id, data: updatedData })).then((result) => {
      if (updateBookingStatus.fulfilled.match(result)) {
        navigate("/dashboard/admin");
      }
    });
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
          <h1 className="text-3xl font-bold text-gray-900">
            Schedule Pre-Visit
          </h1>
          <p className="text-gray-600 mt-2">
            Reference: #{id.slice(-6).toUpperCase()}
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Booking Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
                  Preferred Date:
                </span>
                <p className="text-gray-900 mt-1">
                  {new Date(booking.preferredDateTime).toLocaleString()}
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
                  Description:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.description || "No additional details"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Schedule Pre-Visit
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pre-Visit Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={preVisitDate}
                  onChange={(e) => setPreVisitDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pre-Visit Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={preVisitTime}
                  onChange={(e) => setPreVisitTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any additional notes about the pre-visit..."
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/admin")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Schedule Pre-Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitPage;

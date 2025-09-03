import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";

const CompletePreVisitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [formData, setFormData] = useState({
    agreedBudget: "",
    scheduledDate: "",
    scheduledTime: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load booking data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
  }, [dispatch, id]);

  // Set initial date/time from booking data
  useEffect(() => {
    if (booking && booking.preferredDateTime) {
      const date = new Date(booking.preferredDateTime);
      setFormData((prev) => ({
        ...prev,
        scheduledDate: date.toISOString().split("T")[0],
        scheduledTime: date.toTimeString().slice(0, 5),
      }));
    }
  }, [booking]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData = {
        status: "pre_visit_completed",
        budget: parseFloat(formData.agreedBudget),
        scheduledDateTime: new Date(
          `${formData.scheduledDate}T${formData.scheduledTime}`
        ).toISOString(),
        preVisitNotes: formData.notes,
      };

      console.log("Updating booking with:", updateData);

      const result = await dispatch(
        updateBookingStatus({ id, data: updateData })
      );

      if (updateBookingStatus.fulfilled.match(result)) {
        alert("Pre-visit assessment completed successfully!");
        navigate("/dashboard/head");
      } else {
        alert("Failed to update booking. Please try again.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("An error occurred while updating the booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-400 text-xl mr-3"></i>
              <div>
                <h3 className="text-lg font-medium text-red-800">
                  Error Loading Booking
                </h3>
                <p className="mt-2 text-sm text-red-700">{message}</p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => dispatch(getBookingById(id))}
                    className="bg-red-100 px-4 py-2 rounded text-red-800 hover:bg-red-200"
                  >
                    <i className="fas fa-redo mr-2"></i>Retry
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/head")}
                    className="bg-gray-100 px-4 py-2 rounded text-gray-800 hover:bg-gray-200"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No booking found
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle text-yellow-400 text-xl mr-3"></i>
              <div>
                <h3 className="text-lg font-medium text-yellow-800">
                  Booking Not Found
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  The requested booking could not be found.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/dashboard/head")}
                    className="bg-yellow-100 px-4 py-2 rounded text-yellow-800 hover:bg-yellow-200"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Go Back to
                    Dashboard
                  </button>
                </div>
              </div>
            </div>
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
                Complete Pre-Visit Assessment
              </h1>
              <p className="text-gray-600 mt-2">
                Booking Reference: #{id?.slice(-6).toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/head")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Booking Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Booking Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Client</p>
              <p className="text-gray-900 font-semibold">
                {booking.client?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Service Type</p>
              <p className="text-gray-900 font-semibold">
                {booking.serviceType || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-900">
                {booking.location
                  ? `${booking.location.address}, ${booking.location.city}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Requested Date
              </p>
              <p className="text-gray-900">
                {booking.preferredDateTime
                  ? new Date(booking.preferredDateTime).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {booking.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Client Notes
              </p>
              <p className="text-gray-900 bg-gray-50 rounded-lg p-3">
                {booking.description}
              </p>
            </div>
          )}
        </div>

        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Assessment Results
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Fill in the agreed details based on your site assessment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Agreed Budget */}
            <div>
              <label
                htmlFor="agreedBudget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fas fa-dollar-sign mr-2 text-green-600"></i>
                Agreed Budget *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Ksh.
                </span>
                <input
                  type="number"
                  id="agreedBudget"
                  name="agreedBudget"
                  value={formData.agreedBudget}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Scheduled Date */}
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fas fa-calendar mr-2 text-blue-600"></i>
                Scheduled Date *
              </label>
              <input
                type="date"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Scheduled Time */}
            <div>
              <label
                htmlFor="scheduledTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fas fa-clock mr-2 text-purple-600"></i>
                Scheduled Time *
              </label>
              <select
                id="scheduledTime"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            {/* Assessment Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <i className="fas fa-sticky-note mr-2 text-indigo-600"></i>
                Assessment Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add notes about the site assessment, special requirements, challenges, etc..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Completing Assessment...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>
                    Complete Pre-Visit Assessment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Summary Preview */}
        {formData.agreedBudget &&
          formData.scheduledDate &&
          formData.scheduledTime && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">
                <i className="fas fa-clipboard-check mr-2"></i>
                Assessment Summary
              </h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>
                  <strong>Agreed Budget:</strong> ksh.{formData.agreedBudget}
                </p>
                <p>
                  <strong>Scheduled Date:</strong> {formData.scheduledDate}
                </p>
                <p>
                  <strong>Scheduled Time:</strong> {formData.scheduledTime}
                </p>
                <p>
                  <strong>Status after completion:</strong> Ready for Cleaner
                  Assignment
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CompletePreVisitPage;

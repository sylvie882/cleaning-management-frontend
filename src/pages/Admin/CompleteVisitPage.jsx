// src/pages/Admin/CompleteVisitPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";

const CompleteVisitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [assessmentDetails, setAssessmentDetails] = useState({
    rooms: "",
    bathrooms: "",
    kitchen: "",
    livingAreas: "",
    specialRequirements: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (booking && booking.budget) {
      setBudget(booking.budget.toString());
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      status: "pre_visit_completed",
      budget: parseFloat(budget),
      notes: notes,
      assessmentDetails: assessmentDetails,
    };

    dispatch(updateBookingStatus({ id, data: updatedData })).then((result) => {
      if (updateBookingStatus.fulfilled.match(result)) {
        navigate("/dashboard/admin");
      }
    });
  };

  const handleAssessmentChange = (field, value) => {
    setAssessmentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            Complete Pre-Visit Assessment
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
                  Pre-Visit Date:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.preVisitDate
                    ? new Date(booking.preVisitDate).toLocaleString()
                    : "Not scheduled"}
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

        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Pre-Visit Assessment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Assessment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="rooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Rooms
                </label>
                <input
                  type="number"
                  id="rooms"
                  value={assessmentDetails.rooms}
                  onChange={(e) =>
                    handleAssessmentChange("rooms", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3"
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  value={assessmentDetails.bathrooms}
                  onChange={(e) =>
                    handleAssessmentChange("bathrooms", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="kitchen"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kitchen Size
                </label>
                <select
                  id="kitchen"
                  value={assessmentDetails.kitchen}
                  onChange={(e) =>
                    handleAssessmentChange("kitchen", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select kitchen size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="livingAreas"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Living Areas
                </label>
                <input
                  type="text"
                  id="livingAreas"
                  value={assessmentDetails.livingAreas}
                  onChange={(e) =>
                    handleAssessmentChange("livingAreas", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Living room, dining room"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequirements"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Special Requirements
              </label>
              <textarea
                id="specialRequirements"
                value={assessmentDetails.specialRequirements}
                onChange={(e) =>
                  handleAssessmentChange("specialRequirements", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special cleaning requirements, delicate items, etc."
              />
            </div>

            {/* Budget Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Budget Proposal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Proposed Budget (Ksh)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter proposed budget"
                  />
                </div>
                <div className="flex items-end">
                  <div className="bg-blue-50 rounded-lg p-4 w-full">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This budget will be sent to the
                      client for approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Assessment Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add detailed notes about the assessment, any issues found, recommendations, etc."
              />
            </div>

            {/* Action Buttons */}
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
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Complete Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteVisitPage;

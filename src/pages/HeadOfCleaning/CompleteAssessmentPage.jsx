// src/pages/HeadOfCleaning/CompleteAssessmentPage.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getBookingById,
  updateBookingStatus,
  reset,
} from "../../features/booking/bookingSlice";
import PreVisitForm from "../../components/HeadOfCleaning/PreVisitForm";

const CompleteAssessmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success("Assessment completed successfully!");
      navigate("/dashboard/head");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleFormSubmit = (formData) => {
    console.log("Completing assessment with data:", formData);

    const updateData = {
      status: "pre_visit_completed",
      budget: formData.budget,
      assessmentDetails: formData.assessmentDetails,
      estimatedDuration: formData.estimatedDuration,
      requiredCleaners: formData.requiredCleaners,
      recommendedServices: formData.recommendedServices,
      notes: formData.notes,
    };

    dispatch(updateBookingStatus({ id, data: updateData }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Error Loading Booking
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{message}</p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => dispatch(getBookingById(id))}
                    className="bg-red-100 px-4 py-2 rounded text-red-800 hover:bg-red-200 transition-colors"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Retry
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/head")}
                    className="bg-gray-100 px-4 py-2 rounded text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-yellow-400 text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">
                  Booking Not Found
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>The requested booking could not be found.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/dashboard/head")}
                    className="bg-yellow-100 px-4 py-2 rounded text-yellow-800 hover:bg-yellow-200 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Go Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if booking is in the right status for completing assessment
  if (booking.status !== "pre_visit_scheduled") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-orange-400 text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-orange-800">
                  Invalid Status
                </h3>
                <div className="mt-2 text-sm text-orange-700">
                  <p>
                    This booking is not ready for assessment completion. Current
                    status:{" "}
                    <strong>
                      {booking.status.replace("_", " ").toUpperCase()}
                    </strong>
                  </p>
                  <p className="mt-1">
                    The pre-visit must be scheduled first before it can be
                    completed.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/dashboard/head")}
                    className="bg-orange-100 px-4 py-2 rounded text-orange-800 hover:bg-orange-200 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Go Back to Dashboard
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Pre-Visit Assessment
              </h1>
              <p className="text-gray-600 mt-2">
                Booking Reference: #{id.slice(-6).toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/head")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Booking Overview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Booking Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user text-blue-600"></i>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Client</p>
                <p className="text-gray-900">{booking.client?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-broom text-green-600"></i>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Service</p>
                <p className="text-gray-900">{booking.serviceType}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar text-purple-600"></i>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pre-Visit Date
                </p>
                <p className="text-gray-900">
                  {booking.preVisitDate
                    ? new Date(booking.preVisitDate).toLocaleDateString()
                    : "Not scheduled"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-orange-600"></i>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-900">
                  {booking.location
                    ? `${booking.location.address}, ${booking.location.city}`
                    : "N/A"}
                </p>
              </div>
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

        {/* Current Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Assessment Status
              </h3>
              <p className="text-gray-600 mt-1">
                Pre-visit scheduled - Ready to complete assessment
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <i className="fas fa-calendar-check mr-1"></i>
                PRE-VISIT SCHEDULED
              </span>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <PreVisitForm
            booking={booking}
            mode="complete"
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CompleteAssessmentPage;

/* eslint-disable no-unused-vars */
// src/pages/public/BudgetApprovalPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingByToken,
  approveBudget,
} from "../../features/booking/bookingSlice";
import { toast } from "react-toastify";

const BudgetApprovalPage = () => {
  const { bookingId, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { booking, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.booking
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decision, setDecision] = useState(""); // "approved" or "rejected"

  useEffect(() => {
    if (bookingId && token) {
      dispatch(getBookingByToken({ id: bookingId, token }));
    }
  }, [dispatch, bookingId, token]);

  useEffect(() => {
    if (isError) {
      toast.error(message || "Error loading booking details");
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess && decision) {
      const action = decision === "approved" ? "approved" : "rejected";
      toast.success(`Budget ${action} successfully!`);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isSuccess, decision, navigate]);

  const handleApproval = async (approved) => {
    if (!booking) return;

    setIsSubmitting(true);
    setDecision(approved ? "approved" : "rejected");

    try {
      await dispatch(approveBudget({ id: bookingId, token, approved }));
    } catch (error) {
      toast.error("Error updating budget approval status");
      setIsSubmitting(false);
      setDecision("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Loading Budget Details
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your budget proposal...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
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
              Budget Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              {message ||
                "The budget proposal you're looking for could not be found or has expired."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if budget is already approved or rejected
  if (booking.status === "budgeted" || booking.status === "cancelled") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                booking.status === "budgeted" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  booking.status === "budgeted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {booking.status === "budgeted" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Budget Already{" "}
              {booking.status === "budgeted" ? "Approved" : "Rejected"}
            </h3>
            <p className="text-gray-600 mb-4">
              This budget proposal has already been{" "}
              {booking.status === "budgeted" ? "approved" : "rejected"}.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Budget Approval
              </h1>
              <p className="text-gray-600 mt-1">
                Review and approve your cleaning service budget
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Reference</p>
              <p className="font-mono text-lg font-bold text-gray-900">
                #{bookingId.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Proposal Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Budget Proposal
                </h2>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      Service Type
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {booking.serviceType}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <p className="text-sm font-medium text-green-600 mb-1">
                      Proposed Budget
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      Ksh. {booking.budget ? booking.budget.toFixed(2) : "0.00"}
                    </p>
                  </div>
                </div>

                {booking.description && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Service Description
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {booking.description}
                      </p>
                    </div>
                  </div>
                )}

                {booking.notes && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Special Notes
                    </h3>
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                      <p className="text-amber-800">{booking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Service Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {booking.location?.address || "Address not provided"}
                    </p>
                    {booking.location?.city && (
                      <p className="text-gray-600">{booking.location.city}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Preferred Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {booking.preferredDateTime
                        ? new Date(
                            booking.preferredDateTime
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Date not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Info Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Client Information
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Name
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {booking.client?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </p>
                    <p className="text-gray-900">{booking.client?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Phone
                    </p>
                    <p className="text-gray-900">{booking.client?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Actions Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Take Action
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    Please review the budget proposal above and choose to
                    approve or reject it.
                  </p>

                  <button
                    onClick={() => handleApproval(true)}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && decision === "approved" ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Approving...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
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
                        Approve Budget
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleApproval(false)}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && decision === "rejected" ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Rejecting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Reject Budget
                      </div>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => navigate("/")}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetApprovalPage;

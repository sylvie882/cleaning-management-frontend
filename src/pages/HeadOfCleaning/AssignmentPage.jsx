/* eslint-disable no-unused-vars */
// src/pages/HeadOfCleaning/AssignmentPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingById,
  updateBookingStatus,
} from "../../features/booking/bookingSlice";
import { getCleaners } from "../../features/users/userSlice";

const AssignmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add more detailed state destructuring for debugging
  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const { cleaners, isLoading: cleanersLoading } = useSelector(
    (state) => state.users
  );

  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [notes, setNotes] = useState("");

  // Debug logging
  useEffect(() => {
    console.log("=== DEBUGGING ASSIGNMENT PAGE ===");
    console.log("URL ID parameter:", id);
    console.log("Booking state:", booking);
    console.log("Is Loading:", isLoading);
    console.log("Is Error:", isError);
    console.log("Error Message:", message);
    console.log("Cleaners:", cleaners);
    console.log("================================");
  }, [id, booking, isLoading, isError, message, cleaners]);

  useEffect(() => {
    if (id) {
      console.log("Dispatching getBookingById with ID:", id);

      // Dispatch and log the result
      dispatch(getBookingById(id))
        .then((result) => {
          console.log("getBookingById result:", result);
          if (result.error) {
            console.error("getBookingById error:", result.error);
          }
        })
        .catch((error) => {
          console.error("getBookingById catch error:", error);
        });
    }

    console.log("Dispatching getCleaners");
    dispatch(getCleaners())
      .then((result) => {
        console.log("getCleaners result:", result);
      })
      .catch((error) => {
        console.error("getCleaners error:", error);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (booking && booking.preferredDateTime) {
      console.log("Setting date/time from booking:", booking.preferredDateTime);
      const date = new Date(booking.preferredDateTime);
      setScheduledDate(date.toISOString().split("T")[0]);
      setScheduledTime(date.toTimeString().slice(0, 5));
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);

    const updatedData = {
      status: "assigned",
      assignedCleaner: selectedCleaner,
      scheduledDateTime: scheduledDateTime.toISOString(),
      notes: notes,
    };

    console.log("Submitting assignment with data:", updatedData);

    dispatch(updateBookingStatus({ id, data: updatedData })).then((result) => {
      console.log("updateBookingStatus result:", result);
      if (updateBookingStatus.fulfilled.match(result)) {
        navigate("/dashboard/head");
      }
    });
  };

  // Enhanced loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-red-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error Loading Booking
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>ID: {id}</p>
              <p>Message: {message}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => dispatch(getBookingById(id))}
                className="bg-red-100 px-4 py-2 rounded text-red-800 hover:bg-red-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 m-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-circle text-yellow-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              No Booking Data
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Booking ID: {id}</p>
              <p>
                The booking data could not be loaded. This might be because:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>The booking ID doesn't exist in the database</li>
                <li>There's an API response structure mismatch</li>
                <li>The booking data is nested differently than expected</li>
              </ul>
            </div>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => dispatch(getBookingById(id))}
                className="bg-yellow-100 px-4 py-2 rounded text-yellow-800 hover:bg-yellow-200"
              >
                Retry Loading
              </button>
              <button
                onClick={() => navigate("/dashboard/head")}
                className="bg-gray-100 px-4 py-2 rounded text-gray-800 hover:bg-gray-200"
              >
                Go Back
              </button>
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
          <h1 className="text-3xl font-bold text-gray-900">
            Assign Cleaner to Booking
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
                  Requested Date:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.preferredDateTime
                    ? new Date(booking.preferredDateTime).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Budget:
                </span>
                <p className="text-gray-900 mt-1">
                  Ksh. {booking.budget ? booking.budget.toFixed(2) : "0.00"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Description:
                </span>
                <p className="text-gray-900 mt-1">
                  {booking.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Assignment Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="cleaner"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Cleaner
              </label>
              <select
                id="cleaner"
                value={selectedCleaner}
                onChange={(e) => setSelectedCleaner(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a cleaner --</option>
                {cleaners.map((cleaner) => (
                  <option key={cleaner._id} value={cleaner._id}>
                    {cleaner.name} ({cleaner.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Scheduled Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Scheduled Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
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
                Notes for Cleaner
              </label>
              <textarea
                id="notes"
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide any specific instructions or information for the cleaner..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/head")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Assign Cleaner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;

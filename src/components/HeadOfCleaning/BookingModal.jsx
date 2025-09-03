// src/components/HeadOfCleaning/BookingModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBookingStatus } from "../../features/booking/bookingSlice";

const BookingModal = ({ booking, cleaners, onClose }) => {
  const dispatch = useDispatch();
  const [preVisitDate, setPreVisitDate] = useState("");
  const [preVisitTime, setPreVisitTime] = useState("");
  const [budget, setBudget] = useState(booking.budget || 0);
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [notes, setNotes] = useState("");

  const handleSchedulePreVisit = () => {
    const scheduledDateTime = new Date(`${preVisitDate}T${preVisitTime}`);

    const updateData = {
      status: "pre_visit_scheduled",
      preVisitDate: scheduledDateTime.toISOString(),
      notes,
    };

    dispatch(updateBookingStatus({ id: booking._id, data: updateData })).then(
      (result) => {
        if (updateBookingStatus.fulfilled.match(result)) {
          onClose();
        }
      }
    );
  };

  const handleCompletePreVisit = () => {
    const updateData = {
      status: "pre_visit_completed",
      budget,
      notes,
    };

    dispatch(updateBookingStatus({ id: booking._id, data: updateData })).then(
      (result) => {
        if (updateBookingStatus.fulfilled.match(result)) {
          onClose();
        }
      }
    );
  };

  const handleAssignCleaner = () => {
    const updateData = {
      status: "assigned",
      assignedCleaner: selectedCleaner,
      notes,
    };

    dispatch(updateBookingStatus({ id: booking._id, data: updateData })).then(
      (result) => {
        if (updateBookingStatus.fulfilled.match(result)) {
          onClose();
        }
      }
    );
  };

  // Format preferred date for display
  const formattedPreferredDate = new Date(
    booking.preferredDateTime
  ).toLocaleString();

  // Determine which action is available based on booking status
  const renderActionForm = () => {
    switch (booking.status) {
      case "pending":
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-calendar-check text-blue-600 mr-2"></i>
                Schedule Pre-Visit
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="preVisitDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="preVisitDate"
                    value={preVisitDate}
                    onChange={(e) => setPreVisitDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="preVisitTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="preVisitTime"
                    value={preVisitTime}
                    onChange={(e) => setPreVisitTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes or instructions for the visit..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  onClick={handleSchedulePreVisit}
                  disabled={!preVisitDate || !preVisitTime}
                >
                  Schedule Pre-Visit
                </button>
              </div>
            </div>
          </div>
        );

      case "pre_visit_scheduled":
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-clipboard-check text-yellow-600 mr-2"></i>
                Complete Pre-Visit
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Budget Amount ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes & Assessment
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add details about the assessment and scope of work..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  onClick={handleCompletePreVisit}
                  disabled={budget <= 0}
                >
                  Complete & Send Budget
                </button>
              </div>
            </div>
          </div>
        );

      case "pre_visit_completed":
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-user-plus text-green-600 mr-2"></i>
                Assign Cleaner
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="cleaner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Cleaner
                </label>
                <select
                  id="cleaner"
                  value={selectedCleaner}
                  onChange={(e) => setSelectedCleaner(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">-- Select a cleaner --</option>
                  {cleaners.map((cleaner) => (
                    <option key={cleaner._id} value={cleaner._id}>
                      {cleaner.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instructions for Cleaner
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add specific instructions for the cleaner..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  onClick={handleAssignCleaner}
                  disabled={!selectedCleaner}
                >
                  Assign Cleaner
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal positioning */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Reference: #{booking._id.slice(-6).toUpperCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Close</span>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-6 max-h-96 overflow-y-auto">
            {/* Booking Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                Booking Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Service Type:
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {booking.serviceType}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Status:
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "pending"
                        ? "bg-red-100 text-red-800"
                        : booking.status === "pre_visit_scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "pre_visit_completed"
                        ? "bg-blue-100 text-blue-800"
                        : booking.status === "assigned"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Preferred Date:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formattedPreferredDate}
                  </span>
                </div>
                {booking.budget > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium text-gray-500">
                      Budget:
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ${booking.budget.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="md:col-span-2 py-2">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Description:
                  </span>
                  <span className="text-sm text-gray-900">
                    {booking.description || "No description provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-user text-blue-600 mr-2"></i>
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Name:
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {booking.client.name}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <span className="text-sm text-gray-900">
                    {booking.client.email}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-900">
                    {booking.client.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 py-2">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Address:
                  </span>
                  <span className="text-sm text-gray-900">
                    {booking.location.address}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    City:
                  </span>
                  <span className="text-sm text-gray-900">
                    {booking.location.city}
                  </span>
                </div>
                {booking.location.state && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium text-gray-500">
                      State:
                    </span>
                    <span className="text-sm text-gray-900">
                      {booking.location.state}
                    </span>
                  </div>
                )}
                {booking.location.zipCode && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium text-gray-500">
                      Zip Code:
                    </span>
                    <span className="text-sm text-gray-900">
                      {booking.location.zipCode}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Cleaner (if exists) */}
            {booking.assignedCleaner && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-user-check text-green-600 mr-2"></i>
                  Assigned Cleaner
                </h3>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Cleaner ID:
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {booking.assignedCleaner}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Form based on status */}
          {renderActionForm()}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

// src/pages/HeadOfCleaning/Dashboard.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBookings } from "../../features/booking/bookingSlice";
import { getCleaners } from "../../features/users/userSlice";
import DashboardStats from "../../components/common/DashboardStats";
import BookingModal from "../../components/HeadOfCleaning/BookingModal";

const HeadDashboard = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);
  const { cleaners } = useSelector((state) => state.users);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getCleaners());
  }, [dispatch]);

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "pending") {
      return booking.status === "pending";
    } else if (activeTab === "pre_visit") {
      return booking.status === "pre_visit_scheduled";
    } else if (activeTab === "budgeted") {
      return booking.status === "pre_visit_completed";
    } else if (activeTab === "assigned") {
      return booking.status === "assigned";
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Head of Cleaning Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage cleaning bookings and assignments
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
              onClick={() => dispatch(getAllBookings())}
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="mb-8">
        <DashboardStats />
      </div>

      {/* Booking Manager */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "pending"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              New Requests
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {bookings.filter((b) => b.status === "pending").length}
              </span>
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "pre_visit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("pre_visit")}
            >
              Pre-Visit Scheduled
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {
                  bookings.filter((b) => b.status === "pre_visit_scheduled")
                    .length
                }
              </span>
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "budgeted"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("budgeted")}
            >
              Budget Provided
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {
                  bookings.filter((b) => b.status === "pre_visit_completed")
                    .length
                }
              </span>
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "assigned"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("assigned")}
            >
              Assigned
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {bookings.filter((b) => b.status === "assigned").length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bookings Table */}
        <div className="p-6">
          {filteredBookings.length > 0 ? (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requested Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                            #{booking._id.slice(-6).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.client.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.client.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {booking.serviceType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="max-w-xs truncate">
                            {`${booking.location.address}, ${booking.location.city}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.preferredDateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition-colors duration-200"
                              onClick={() => openBookingModal(booking)}
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View
                            </button>

                            {booking.status === "pending" && (
                              <Link
                                to={`/dashboard/head/schedule-visit/${booking._id}`}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                              >
                                <i className="fas fa-calendar-check mr-1"></i>
                                Schedule Visit
                              </Link>
                            )}

                            {booking.status === "pre_visit_scheduled" && (
                              <Link
                                to={`/dashboard/head/complete-visit/${booking._id}`}
                                className="inline-flex items-center px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                              >
                                <i className="fas fa-clipboard-check mr-1"></i>
                                Complete Visit
                              </Link>
                            )}

                            {booking.status === "pre_visit_completed" && (
                              <Link
                                to={`/dashboard/head/assign/${booking._id}`}
                                className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                              >
                                <i className="fas fa-user-plus mr-1"></i>
                                Assign Cleaner
                              </Link>
                            )}

                            {booking.status === "assigned" && (
                              <button className="inline-flex items-center px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md transition-colors duration-200">
                                <i className="fas fa-map-marker-alt mr-1"></i>
                                Track Progress
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <i className="fas fa-inbox text-4xl"></i>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No {activeTab.replace(/_/g, " ")} bookings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No bookings found for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          cleaners={cleaners}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

export default HeadDashboard;

// src/pages/HeadOfCleaning/Bookings.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../features/booking/bookingSlice";
import { formatDateTime } from "../../utils/formatters";
import BookingModal from "../../components/HeadOfCleaning/BookingModal";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);
  const { cleaners } = useSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  // Filter, sort, and search bookings
  useEffect(() => {
    if (!bookings) return;

    let result = [...bookings];

    // Filter by status
    if (activeTab !== "all") {
      result = result.filter((booking) => {
        if (activeTab === "pending") {
          return booking.status === "pending";
        } else if (activeTab === "pre_visit") {
          return (
            booking.status === "pre_visit_scheduled" ||
            booking.status === "pre_visit_completed"
          );
        } else if (activeTab === "assigned") {
          return booking.status === "assigned";
        } else if (activeTab === "in_progress") {
          return booking.status === "in_progress";
        } else if (activeTab === "completed") {
          return booking.status === "completed";
        } else if (activeTab === "cancelled") {
          return booking.status === "cancelled";
        }
        return true;
      });
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.client.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking.serviceType.toLowerCase().includes(lowerCaseSearchTerm) ||
          booking._id.toLowerCase().includes(lowerCaseSearchTerm) ||
          (booking.location.address &&
            booking.location.address
              .toLowerCase()
              .includes(lowerCaseSearchTerm))
      );
    }

    // Sort
    result.sort((a, b) => {
      let fieldA, fieldB;

      // Determine fields to compare based on sortField
      switch (sortField) {
        case "createdAt":
          fieldA = new Date(a.createdAt).getTime();
          fieldB = new Date(b.createdAt).getTime();
          break;
        case "scheduledDate":
          fieldA = new Date(
            a.scheduledDateTime || a.preferredDateTime
          ).getTime();
          fieldB = new Date(
            b.scheduledDateTime || b.preferredDateTime
          ).getTime();
          break;
        case "clientName":
          fieldA = a.client.name.toLowerCase();
          fieldB = b.client.name.toLowerCase();
          break;
        case "serviceType":
          fieldA = a.serviceType.toLowerCase();
          fieldB = b.serviceType.toLowerCase();
          break;
        case "status":
          fieldA = a.status;
          fieldB = b.status;
          break;
        default:
          fieldA = a[sortField];
          fieldB = b[sortField];
      }

      // Compare the fields
      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredBookings(result);
  }, [bookings, activeTab, searchTerm, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for dates, ascending for others
      setSortField(field);
      setSortDirection(
        field === "createdAt" || field === "scheduledDate" ? "desc" : "asc"
      );
    }
  };

  // Open booking details modal
  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Close booking details modal
  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      switch (status) {
        case "pending":
          return "bg-red-100 text-red-800 border-red-200";
        case "pre_visit_scheduled":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "pre_visit_completed":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "assigned":
          return "bg-indigo-100 text-indigo-800 border-indigo-200";
        case "in_progress":
          return "bg-purple-100 text-purple-800 border-purple-200";
        case "completed":
          return "bg-green-100 text-green-800 border-green-200";
        case "cancelled":
          return "bg-gray-100 text-gray-800 border-gray-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    // Format status label (replace underscores with spaces and capitalize)
    const formattedStatus = status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusConfig(
          status
        )}`}
      >
        {formattedStatus}
      </span>
    );
  };

  const tabConfig = [
    { key: "all", label: "All", count: bookings?.length || 0 },
    {
      key: "pending",
      label: "New Requests",
      count: bookings?.filter((b) => b.status === "pending").length || 0,
    },
    {
      key: "pre_visit",
      label: "Pre-Visit",
      count:
        bookings?.filter(
          (b) =>
            b.status === "pre_visit_scheduled" ||
            b.status === "pre_visit_completed"
        ).length || 0,
    },
    {
      key: "assigned",
      label: "Assigned",
      count: bookings?.filter((b) => b.status === "assigned").length || 0,
    },
    {
      key: "in_progress",
      label: "In Progress",
      count: bookings?.filter((b) => b.status === "in_progress").length || 0,
    },
    {
      key: "completed",
      label: "Completed",
      count: bookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: bookings?.filter((b) => b.status === "cancelled").length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Bookings
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage all cleaning service bookings
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => dispatch(getAllBookings())}
            disabled={isLoading}
          >
            <i
              className={`fas fa-sync-alt mr-2 ${
                isLoading ? "animate-spin" : ""
              }`}
            ></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav
            className="flex space-x-8 px-6 overflow-x-auto"
            aria-label="Tabs"
          >
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                <span
                  className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="p-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search bookings by client, service, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort("_id")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Reference</span>
                      {sortField === "_id" && (
                        <i
                          className={`fas fa-sort-${
                            sortDirection === "asc" ? "up" : "down"
                          } text-blue-500`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort("clientName")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Client</span>
                      {sortField === "clientName" && (
                        <i
                          className={`fas fa-sort-${
                            sortDirection === "asc" ? "up" : "down"
                          } text-blue-500`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort("serviceType")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Service Type</span>
                      {sortField === "serviceType" && (
                        <i
                          className={`fas fa-sort-${
                            sortDirection === "asc" ? "up" : "down"
                          } text-blue-500`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort("scheduledDate")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Scheduled Date</span>
                      {sortField === "scheduledDate" && (
                        <i
                          className={`fas fa-sort-${
                            sortDirection === "asc" ? "up" : "down"
                          } text-blue-500`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {sortField === "status" && (
                        <i
                          className={`fas fa-sort-${
                            sortDirection === "asc" ? "up" : "down"
                          } text-blue-500`}
                        ></i>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
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
                      {formatDateTime(
                        booking.scheduledDateTime || booking.preferredDateTime
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.assignedCleaner ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <i className="fas fa-user text-green-600 text-xs"></i>
                          </div>
                          <span className="font-medium">
                            {booking.assignedCleaner.name ||
                              booking.assignedCleaner}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors duration-200"
                          onClick={() => openBookingModal(booking)}
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>

                        {booking.status === "pending" && (
                          <Link
                            to={`/dashboard/head/complete-visit/${booking._id}`}
                            className="inline-flex items-center px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200"
                            title="Schedule Pre-Visit"
                          >
                            <i className="fas fa-calendar-check"></i>Pre-Visit
                          </Link>
                        )}

                        {booking.status === "pre_visit_scheduled" && (
                          <Link
                            to={`/dashboard/head/complete-visit/${booking._id}`}
                            className="inline-flex items-center px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded transition-colors duration-200"
                            title="Complete Pre-Visit"
                          >
                            <i className="fas fa-clipboard-check"></i>
                          </Link>
                        )}

                        {booking.status === "pre_visit_completed" && (
                          <Link
                            to={`/dashboard/head/assign/${booking._id}`}
                            className="inline-flex items-center px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors duration-200"
                            title="Assign Cleaner"
                          >
                            <i className="fas fa-user-plus"></i>Assign
                          </Link>
                        )}

                        {(booking.status === "assigned" ||
                          booking.status === "in_progress") && (
                          <Link
                            to={`/dashboard/head/track/${booking._id}`}
                            className="inline-flex items-center px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded transition-colors duration-200"
                            title="Track Progress"
                          >
                            <i className="fas fa-map-marker-alt"></i>
                          </Link>
                        )}

                        {booking.status !== "completed" &&
                          booking.status !== "cancelled" && (
                            <button
                              className="inline-flex items-center px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded transition-colors duration-200"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to cancel this booking?"
                                  )
                                ) {
                                  // Handle cancel booking logic
                                }
                              }}
                              title="Cancel Booking"
                            >
                              <i className="fas fa-times-circle"></i>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <i className="fas fa-inbox text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">
              No bookings match the current filters. Try adjusting your search
              or filter criteria.
            </p>
          </div>
        </div>
      )}

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

export default Bookings;

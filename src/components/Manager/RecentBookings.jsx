// src/components/Manager/RecentBookings.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentBookings } from "../../features/booking/bookingSlice";
import { formatDateTime } from "../../utils/formatters";

const RecentBookings = () => {
  const dispatch = useDispatch();
  const { recentBookings, isLoading } = useSelector((state) => state.booking);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    dispatch(getRecentBookings());
  }, [dispatch]);

  useEffect(() => {
    if (recentBookings) {
      setBookings(recentBookings);
    }
  }, [recentBookings]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let className = "status";

    switch (status) {
      case "pending":
        className += " pending";
        break;
      case "pre_visit_scheduled":
      case "pre_visit_completed":
        className += " scheduled";
        break;
      case "assigned":
        className += " assigned";
        break;
      case "in_progress":
        className += " in-progress";
        break;
      case "completed":
        className += " completed";
        break;
      case "cancelled":
        className += " cancelled";
        break;
      default:
        break;
    }

    // Format status label (replace underscores with spaces and capitalize)
    const formattedStatus = status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return <span className={className}>{formattedStatus}</span>;
  };

  return (
    <div className="recent-bookings-container">
      <div className="card-header">
        <h3>Recent Bookings</h3>
        <Link to="/dashboard/manager/bookings" className="view-all-link">
          View All <i className="fas fa-chevron-right"></i>
        </Link>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading recent bookings...</span>
        </div>
      ) : bookings.length > 0 ? (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Ref #</th>
                <th>Client</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="ref-number">
                    #{booking._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="client-name">{booking.client.name}</td>
                  <td className="service-type">{booking.serviceType}</td>
                  <td className="date-time">
                    {formatDateTime(
                      booking.scheduledDateTime || booking.preferredDateTime
                    )}
                  </td>
                  <td className="status-cell">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="assigned-to">
                    {booking.assignedCleaner ? (
                      <span className="cleaner-name">
                        {booking.assignedCleaner.name}
                      </span>
                    ) : (
                      <span className="not-assigned">Not Assigned</span>
                    )}
                  </td>
                  <td className="actions">
                    <Link
                      to={`/dashboard/manager/bookings/${booking._id}`}
                      className="view-details-btn"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">
          <p>No recent bookings available</p>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;

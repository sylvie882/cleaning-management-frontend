// src/components/Manager/TopCleaners.jsx (continued)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopCleaners = ({ data }) => {
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Sort by number of completed bookings (descending)
      const sortedCleaners = [...data].sort(
        (a, b) => b.completedBookings - a.completedBookings
      );
      setCleaners(sortedCleaners.slice(0, 5)); // Get top 5
    }
  }, [data]);

  return (
    <div className="top-cleaners-container">
      <div className="card-header">
        <h3>Top Performing Cleaners</h3>
        <Link to="/dashboard/manager/staff" className="view-all-link">
          View All <i className="fas fa-chevron-right"></i>
        </Link>
      </div>

      {cleaners.length > 0 ? (
        <div className="cleaners-list">
          {cleaners.map((cleaner, index) => (
            <div key={cleaner._id} className="cleaner-item">
              <div className="rank">{index + 1}</div>
              <div className="cleaner-profile">
                <div className="cleaner-avatar">
                  {cleaner.profileImage ? (
                    <img src={cleaner.profileImage} alt={cleaner.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {cleaner.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="cleaner-info">
                  <h4>{cleaner.name}</h4>
                  <p className="email">{cleaner.email}</p>
                </div>
              </div>
              <div className="performance-stats">
                <div className="stat">
                  <span className="value">{cleaner.completedBookings}</span>
                  <span className="label">Completed</span>
                </div>
                <div className="stat">
                  <span className="value">
                    {cleaner.averageRating.toFixed(1)}
                  </span>
                  <span className="label">Rating</span>
                </div>
                <div className="stat">
                  <span className="value">{cleaner.onTimePercentage}%</span>
                  <span className="label">On Time</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>No cleaner performance data available</p>
        </div>
      )}
    </div>
  );
};

export default TopCleaners;

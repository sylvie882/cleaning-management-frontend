// src/components/Manager/OverviewStats.jsx
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatters";

const OverviewStats = ({ bookingStats, financialStats, userStats }) => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    totalCleaners: 0,
    totalClients: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    if (bookingStats && financialStats && userStats) {
      // Calculate stats
      const totalBookings = bookingStats.totalBookings || 0;
      const completedBookings =
        bookingStats.bookingsByStatus?.find((s) => s._id === "completed")
          ?.count || 0;
      const pendingBookings =
        (bookingStats.bookingsByStatus?.find((s) => s._id === "pending")
          ?.count || 0) +
        (bookingStats.bookingsByStatus?.find(
          (s) => s._id === "pre_visit_scheduled"
        )?.count || 0) +
        (bookingStats.bookingsByStatus?.find(
          (s) => s._id === "pre_visit_completed"
        )?.count || 0);
      const cancelledBookings =
        bookingStats.bookingsByStatus?.find((s) => s._id === "cancelled")
          ?.count || 0;

      const totalRevenue = financialStats.totalRevenue || 0;
      const monthlyRevenue = financialStats.monthlyRevenue || 0;

      const averageRating = bookingStats.averageRating || 0;

      const totalCleaners =
        userStats.roleCount?.find((r) => r._id === "cleaner")?.count || 0;
      const totalClients = userStats.clientCount || 0;

      // Calculate conversion rate (completed bookings / total bookings)
      const conversionRate =
        totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

      setStats({
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        monthlyRevenue,
        averageRating,
        totalCleaners,
        totalClients,
        conversionRate,
      });
    }
  }, [bookingStats, financialStats, userStats]);

  return (
    <div className="overview-stats">
      <div className="stats-card primary">
        <div className="stats-icon">
          <i className="fas fa-calendar-check"></i>
        </div>
        <div className="stats-content">
          <h3>Total Bookings</h3>
          <p className="stats-value">{stats.totalBookings}</p>
        </div>
      </div>

      <div className="stats-card success">
        <div className="stats-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stats-content">
          <h3>Completed</h3>
          <p className="stats-value">{stats.completedBookings}</p>
        </div>
      </div>

      <div className="stats-card warning">
        <div className="stats-icon">
          <i className="fas fa-clock"></i>
        </div>
        <div className="stats-content">
          <h3>Pending</h3>
          <p className="stats-value">{stats.pendingBookings}</p>
        </div>
      </div>

      <div className="stats-card info">
        <div className="stats-icon">
          <i className="fas fa-dollar-sign"></i>
        </div>
        <div className="stats-content">
          <h3>Total Revenue</h3>
          <p className="stats-value">{formatCurrency(stats.totalRevenue)}</p>
        </div>
      </div>

      <div className="stats-card secondary">
        <div className="stats-icon">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="stats-content">
          <h3>Monthly Revenue</h3>
          <p className="stats-value">{formatCurrency(stats.monthlyRevenue)}</p>
        </div>
      </div>

      <div className="stats-card golden">
        <div className="stats-icon">
          <i className="fas fa-star"></i>
        </div>
        <div className="stats-content">
          <h3>Average Rating</h3>
          <p className="stats-value">
            {stats.averageRating.toFixed(1)}
            <small> / 5</small>
          </p>
        </div>
      </div>

      <div className="stats-card purple">
        <div className="stats-icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="stats-content">
          <h3>Total Cleaners</h3>
          <p className="stats-value">{stats.totalCleaners}</p>
        </div>
      </div>

      <div className="stats-card teal">
        <div className="stats-icon">
          <i className="fas fa-user-friends"></i>
        </div>
        <div className="stats-content">
          <h3>Total Clients</h3>
          <p className="stats-value">{stats.totalClients}</p>
        </div>
      </div>

      <div className="stats-card blue">
        <div className="stats-icon">
          <i className="fas fa-percentage"></i>
        </div>
        <div className="stats-content">
          <h3>Conversion Rate</h3>
          <p className="stats-value">{stats.conversionRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;

// src/pages/Manager/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingStats } from "../../features/booking/bookingSlice";
import { getFinancialStats } from "../../features/payment/paymentSlice";
import { getUserStats } from "../../features/users/userSlice";
import OverviewStats from "../../components/Manager/OverviewStats";
import BookingChart from "../../components/Manager/BookingChart";
import RevenueChart from "../../components/Manager/RevenueChart";
import ServiceDistribution from "../../components/Manager/ServiceDistribution";
import TopCleaners from "../../components/Manager/TopCleaners";
import RecentBookings from "../../components/Manager/RecentBookings";

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { bookingStats, isLoading: bookingsLoading } = useSelector(
    (state) => state.booking
  );
  const { financialStats, isLoading: financialLoading } = useSelector(
    (state) => state.payment
  );
  const { userStats, isLoading: usersLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getBookingStats());
    // dispatch(getFinancialStats());
    // dispatch(getUserStats());
  }, [dispatch]);

  const isLoading = bookingsLoading || financialLoading || usersLoading;
  // console.log(
  //   "Booking Stats:",
  //   bookingStats,
  //   "Financial Stats:",
  //   financialStats,
  //   "User Stats:",
  //   userStats
  // );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <div className="action-buttons">
          <button
            className="refresh-btn"
            onClick={() => {
              dispatch(getBookingStats());
              dispatch(getFinancialStats());
              dispatch(getUserStats());
            }}
          >
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>

      <OverviewStats
        bookingStats={bookingStats}
        financialStats={financialStats}
        userStats={userStats}
      />

      <div className="dashboard-grid">
        <div className="dashboard-card bookings-chart">
          <h2>Bookings Overview</h2>
          <BookingChart data={bookingStats?.bookingTrends} />
        </div>

        <div className="dashboard-card revenue-chart">
          <h2>Revenue Overview</h2>
          <RevenueChart data={financialStats?.revenueTrends} />
        </div>

        <div className="dashboard-card service-distribution">
          <h2>Service Distribution</h2>
          <ServiceDistribution data={bookingStats?.bookingsByService} />
        </div>

        <div className="dashboard-card top-cleaners">
          <h2>Top Performing Cleaners</h2>
          <TopCleaners data={userStats?.cleanerPerformance} />
        </div>

        <div className="dashboard-card recent-bookings span-full">
          <h2>Recent Bookings</h2>
          <RecentBookings />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

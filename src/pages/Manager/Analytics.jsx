// src/pages/Manager/Analytics.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingStats } from "../../features/booking/bookingSlice";
import { getFinancialStats } from "../../features/payment/paymentSlice";
import { getUserStats } from "../../features/users/userSlice";
import BookingChart from "../../components/Manager/BookingChart";
import RevenueChart from "../../components/Manager/RevenueChart";
import ServiceDistribution from "../../components/Manager/ServiceDistribution";
import TopCleaners from "../../components/Manager/TopCleaners";
import { formatCurrency } from "../../utils/formatters";

const Analytics = () => {
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

  const [period, setPeriod] = useState("monthly");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    dispatch(getBookingStats(period));
    dispatch(getFinancialStats(period));
    dispatch(getUserStats(period));
  }, [dispatch, period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };

  const generateReport = () => {
    dispatch(
      getBookingStats({
        period,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
    dispatch(
      getFinancialStats({
        period,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
    dispatch(
      getUserStats({
        period,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
  };

  const isLoading = bookingsLoading || financialLoading || usersLoading;

  // Calculate key metrics
  const metrics = {
    totalBookings: bookingStats?.totalBookings || 0,
    completedBookings: bookingStats?.completedBookings || 0,
    totalRevenue: financialStats?.totalRevenue || 0,
    averageRating: bookingStats?.averageRating || 0,
    conversionRate: bookingStats?.conversionRate || 0,
  };

  const periodOptions = [
    { value: "weekly", label: "Weekly", icon: "fas fa-calendar-week" },
    { value: "monthly", label: "Monthly", icon: "fas fa-calendar-alt" },
    { value: "quarterly", label: "Quarterly", icon: "fas fa-calendar" },
    { value: "yearly", label: "Yearly", icon: "fas fa-calendar-check" },
    { value: "custom", label: "Custom", icon: "fas fa-calendar-plus" },
  ];

  const metricCards = [
    {
      title: "Total Bookings",
      value: metrics.totalBookings,
      icon: "fas fa-calendar-check",
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Completed Jobs",
      value: metrics.completedBookings,
      icon: "fas fa-tasks",
      color: "green",
      bgGradient: "from-green-500 to-green-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(metrics.totalRevenue),
      icon: "fas fa-dollar-sign",
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Average Rating",
      value: `${metrics.averageRating.toFixed(1)}/5`,
      icon: "fas fa-star",
      color: "yellow",
      bgGradient: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Conversion Rate",
      value: `${metrics.conversionRate.toFixed(1)}%`,
      icon: "fas fa-chart-line",
      color: "indigo",
      bgGradient: "from-indigo-500 to-indigo-600",
    },
  ];

  const insights = [
    {
      title: "Peak Booking Times",
      description: `Most bookings occur on ${
        bookingStats?.peakBookingDay || "weekdays"
      } between ${bookingStats?.peakBookingTime || "9 AM - 11 AM"}.`,
      icon: "fas fa-lightbulb",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Top Service Areas",
      description: `The most serviced areas are ${
        bookingStats?.topAreas?.join(", ") || "still being calculated"
      }.`,
      icon: "fas fa-map-marked-alt",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Popular Services",
      description: `The most requested service is ${
        bookingStats?.topService || "Residential Cleaning"
      }.`,
      icon: "fas fa-broom",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Client Retention",
      description: `${
        userStats?.repeatClientRate || "60"
      }% of clients book our services again within 3 months.`,
      icon: "fas fa-user-clock",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-chart-bar mr-3 text-blue-600"></i>
                Business Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive insights into your cleaning business performance
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <i className="fas fa-download mr-2"></i>
                Export Data
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                <i className="fas fa-file-pdf mr-2"></i>
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Period Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Time Period
              </h3>
              <div className="flex flex-wrap gap-2">
                {periodOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      period === option.value
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handlePeriodChange(option.value)}
                  >
                    <i className={`${option.icon} mr-2 text-sm`}></i>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Range */}
            {period === "custom" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Custom Date Range
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={dateRange.startDate}
                      onChange={handleDateRangeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={dateRange.endDate}
                      onChange={handleDateRangeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={generateReport}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-lg text-gray-600">
                  Loading analytics data...
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {metricCards.map((metric, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-sm p-6 overflow-hidden group hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-200`}
                  ></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${metric.bgGradient} rounded-lg flex items-center justify-center`}
                      >
                        <i className={`${metric.icon} text-white text-lg`}></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Booking Trends
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <i className="fas fa-chart-line"></i>
                    <span>Last 30 days</span>
                  </div>
                </div>
                <div className="h-80">
                  <BookingChart data={bookingStats?.bookingTrends || []} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Revenue Trends
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <i className="fas fa-dollar-sign"></i>
                    <span>Monthly revenue</span>
                  </div>
                </div>
                <div className="h-80">
                  <RevenueChart data={financialStats?.revenueTrends || []} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Service Distribution
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <i className="fas fa-chart-pie"></i>
                    <span>By service type</span>
                  </div>
                </div>
                <div className="h-80">
                  <ServiceDistribution
                    data={bookingStats?.bookingsByService || []}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Rating Trends
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <i className="fas fa-star"></i>
                    <span>Customer satisfaction</span>
                  </div>
                </div>
                <div className="h-80">
                  <BookingChart
                    data={bookingStats?.ratingTrends || []}
                    type="rating"
                  />
                </div>
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Team Performance
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Top performing cleaners this period
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  <span>View All</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
              <TopCleaners data={userStats?.cleanerPerformance || []} />
            </div>

            {/* Business Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Business Insights
                </h2>
                <p className="text-gray-600 mt-1">
                  Key insights to drive business growth
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`${insight.bgColor} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center`}
                      >
                        <i
                          className={`${insight.icon} ${insight.color} text-lg`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {insight.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Analytics Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need More Detailed Analytics?
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Get comprehensive reports with advanced insights, forecasting,
                  and custom dashboards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
                    <i className="fas fa-chart-bar mr-2"></i>
                    Advanced Analytics
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
                    <i className="fas fa-download mr-2"></i>
                    Download Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  UserCheck,
  ClipboardList,
  BarChart3,
  PieChart,
  CheckCircle,
  Clock,
  Activity,
  Award,
  ShoppingBag,
  CreditCard,
  Eye,
  UserPlus,
  CalendarCheck,
  ClipboardCheck,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalCleaners: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    completedToday: 0,
    activeCleaners: 0,
    monthlyGrowth: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [bookingTrends, setBookingTrends] = useState({
    bookingTrends: [],
    completionTrends: [],
    revenueTrends: [],
  });
  const [serviceDistribution, setServiceDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for booking management
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [bookingsLoading, setBookingsLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchBookings();
    fetchCleaners();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const URL = "https://sylvie-kg23.onrender.com";

      // Fetch dashboard stats
      const statsResponse = await axios.get(
        `${URL}/api/admin/dashboard-stats`,
        config
      );
      setStats(statsResponse.data.stats);
      setRecentActivities(statsResponse.data.recentActivities);

      // Fetch booking trends
      const trendsResponse = await axios.get(
        `${URL}/api/admin/booking-trends`,
        config
      );
      setBookingTrends(trendsResponse.data);

      // Fetch service distribution
      const serviceResponse = await axios.get(
        `${URL}/api/admin/service-distribution`,
        config
      );

      // Ensure serviceDistribution is an array
      if (Array.isArray(serviceResponse.data)) {
        setServiceDistribution(serviceResponse.data);
      } else {
        console.error(
          "Service distribution data is not an array:",
          serviceResponse.data
        );
        setServiceDistribution([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const URL = "https://sylvie-kg23.onrender.com";

      const response = await axios.get(`${URL}/api/bookings`, config);
      setBookings(response.data);
      setBookingsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
      setBookingsLoading(false);
    }
  };

  const fetchCleaners = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const URL = "https://sylvie-kg23.onrender.com";

      const response = await axios.get(
        `${URL}/api/auth/users/role/cleaner`,
        config
      );
      setCleaners(response.data.users || []);
    } catch (error) {
      console.error("Error fetching cleaners:", error);
    }
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
    } else if (activeTab === "in_progress") {
      return booking.status === "in_progress";
    } else if (activeTab === "completed") {
      return booking.status === "completed";
    }
    return true;
  });

  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
          {change && (
            <p
              className={`text-sm ${
                parseFloat(change) >= 0 ? "text-green-600" : "text-red-600"
              } flex items-center mt-1`}
            >
              <TrendingUp size={16} className="mr-1" />
              {parseFloat(change) >= 0 ? "+" : ""}
              {change}% this month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      case "assignment":
        return <UserCheck className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate performance metrics based on actual data
  const calculatePerformanceMetrics = () => {
    // Booking completion rate: completed bookings / total bookings
    const completionRate =
      stats?.totalBookings > 0
        ? Math.round(
            ((stats.totalBookings - stats.pendingBookings) /
              stats.totalBookings) *
              100
          )
        : 0;

    // Revenue target (assuming a monthly target of $50,000)
    const monthlyTarget = 50000;
    const revenueTarget = Math.min(
      Math.round((stats?.totalRevenue / monthlyTarget) * 100),
      100
    );

    // Client satisfaction (mock for now since we don't have direct data)
    // In a real implementation, you could calculate this from booking ratings
    const satisfactionScore = 4.8;
    const satisfactionPercent = (satisfactionScore / 5) * 100;

    return {
      completionRate,
      satisfactionScore,
      satisfactionPercent,
      revenueTarget,
    };
  };

  const performance = calculatePerformanceMetrics();

  // Get status badge style
  const getStatusStyle = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      pre_visit_scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      pre_visit_completed: "bg-purple-100 text-purple-800 border-purple-200",
      assigned: "bg-green-100 text-green-800 border-green-200",
      in_progress: "bg-orange-100 text-orange-800 border-orange-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <a
            href="/dashboard/admin/debug-paste"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Debug Paste Test
          </a>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Clients"
          value={stats?.totalClients}
          color="blue"
        />
        <StatCard
          icon={UserCheck}
          title="Total Cleaners"
          value={stats?.totalCleaners}
          color="green"
        />
        <StatCard
          icon={Calendar}
          title="Total Bookings"
          value={stats?.totalBookings}
          color="purple"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`Ksh.${(stats?.totalRevenue || 0).toLocaleString()}`}
          color="yellow"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={ClipboardList}
          title="Pending Bookings"
          value={stats?.pendingBookings}
          color="orange"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Today"
          value={stats?.completedToday}
          color="green"
        />
        <StatCard
          icon={UserCheck}
          title="Active Cleaners"
          value={stats?.activeCleaners}
          color="blue"
        />
        <StatCard
          icon={BarChart3}
          title="Monthly Growth"
          value={`${stats?.monthlyGrowth}%`}
          color="purple"
        />
      </div>

      {/* Booking Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Booking Management
          </h2>
          <button
            onClick={fetchBookings}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              {
                key: "pending",
                label: "Pending",
                count: bookings.filter((b) => b.status === "pending").length,
              },
              {
                key: "pre_visit",
                label: "Pre-Visit",
                count: bookings.filter(
                  (b) => b.status === "pre_visit_scheduled"
                ).length,
              },
              {
                key: "budgeted",
                label: "Budgeted",
                count: bookings.filter(
                  (b) => b.status === "pre_visit_completed"
                ).length,
              },
              {
                key: "assigned",
                label: "Assigned",
                count: bookings.filter((b) => b.status === "assigned").length,
              },
              {
                key: "in_progress",
                label: "In Progress",
                count: bookings.filter((b) => b.status === "in_progress")
                  .length,
              },
              {
                key: "completed",
                label: "Completed",
                count: bookings.filter((b) => b.status === "completed").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bookings List */}
        {bookingsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading bookings...</span>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <span className="text-sm font-mono text-gray-500">
                        #{booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {booking.client?.name || "Unknown Client"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.serviceType} • {booking.location?.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Requested:{" "}
                        {new Date(
                          booking.preferredDateTime
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/dashboard/admin/booking/${booking._id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>

                    {booking.status === "pending" && (
                      <Link
                        to={`/dashboard/admin/schedule-visit/${booking._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                      >
                        <CalendarCheck className="w-4 h-4 mr-1" />
                        Schedule Visit
                      </Link>
                    )}

                    {booking.status === "pre_visit_scheduled" && (
                      <Link
                        to={`/dashboard/admin/complete-visit/${booking._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                      >
                        <ClipboardCheck className="w-4 h-4 mr-1" />
                        Complete Visit
                      </Link>
                    )}

                    {booking.status === "pre_visit_completed" && (
                      <Link
                        to={`/dashboard/admin/assign/${booking._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        Assign Cleaner
                      </Link>
                    )}

                    {booking.status === "assigned" && (
                      <Link
                        to={`/dashboard/admin/task/${booking._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                      >
                        <Activity className="w-4 h-4 mr-1" />
                        Update Status
                      </Link>
                    )}

                    {booking.status === "in_progress" && (
                      <Link
                        to={`/dashboard/admin/task/${booking._id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found for this status.</p>
          </div>
        )}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Performance Overview
            </h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Booking Completion Rate
              </span>
              <span className="text-sm font-medium text-green-600">
                {performance.completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${performance.completionRate}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Client Satisfaction</span>
              <span className="text-sm font-medium text-blue-600">
                {performance?.satisfactionScore}/5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${performance?.satisfactionPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue Target</span>
              <span className="text-sm font-medium text-purple-600">
                {performance?.revenueTarget}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${performance?.revenueTarget}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activities
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          {Array.isArray(recentActivities) && recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activities</p>
          )}
        </div>
      </div>

      {/* Service Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Service Distribution
        </h2>
        {Array.isArray(serviceDistribution) &&
        serviceDistribution.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceDistribution.map((service) => (
              <div
                key={service?._id || Math.random()}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    {service?._id || "Unknown Service"}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {service?.count || 0} bookings
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        ((service?.count || 0) / (stats?.totalBookings || 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No service data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

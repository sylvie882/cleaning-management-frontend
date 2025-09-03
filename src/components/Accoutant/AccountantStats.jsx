// src/components/Accountant/AccountantStats.jsx
import { useState, useEffect, useMemo } from "react";
import { formatCurrency } from "../../utils/formatters";

const AccountantStats = ({ payments }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingVerification: 0,
    verifiedPayments: 0,
    failedPayments: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
  });

  // Calculate stats using useMemo for better performance
  const calculatedStats = useMemo(() => {
    // Ensure payments is an array
    if (!Array.isArray(payments) || payments.length === 0) {
      return {
        totalRevenue: 0,
        pendingVerification: 0,
        verifiedPayments: 0,
        failedPayments: 0,
        todayRevenue: 0,
        monthlyRevenue: 0,
      };
    }

    // Calculate total revenue
    const totalRevenue = payments
      .filter((payment) => payment.status === "completed")
      .reduce((total, payment) => total + (payment.amount || 0), 0);

    // Calculate pending verification count
    const pendingVerification = payments.filter(
      (payment) => payment.status === "pending"
    ).length;

    // Calculate verified payments count
    const verifiedPayments = payments.filter(
      (payment) => payment.status === "completed"
    ).length;

    // Calculate failed payments count
    const failedPayments = payments.filter(
      (payment) => payment.status === "failed"
    ).length;

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate today's revenue
    const todayRevenue = payments
      .filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        return payment.status === "completed" && paymentDate >= today;
      })
      .reduce((total, payment) => total + (payment.amount || 0), 0);

    // Get first day of current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Calculate monthly revenue
    const monthlyRevenue = payments
      .filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        return payment.status === "completed" && paymentDate >= firstDayOfMonth;
      })
      .reduce((total, payment) => total + (payment.amount || 0), 0);

    return {
      totalRevenue,
      pendingVerification,
      verifiedPayments,
      failedPayments,
      todayRevenue,
      monthlyRevenue,
    };
  }, [payments]);

  useEffect(() => {
    setStats(calculatedStats);
  }, [calculatedStats]);

  // Define stat cards configuration
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: "fas fa-dollar-sign",
      color: "green",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      description: "All completed payments",
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(stats.todayRevenue),
      icon: "fas fa-calendar-day",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      description: "Revenue earned today",
    },
    {
      title: "This Month",
      value: formatCurrency(stats.monthlyRevenue),
      icon: "fas fa-calendar-alt",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      description: "Current month revenue",
    },
    {
      title: "Pending Verification",
      value: stats.pendingVerification,
      icon: "fas fa-clock",
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      description: "Payments awaiting verification",
    },
    {
      title: "Verified Payments",
      value: stats.verifiedPayments,
      icon: "fas fa-check-circle",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      description: "Successfully verified payments",
    },
    {
      title: "Failed Payments",
      value: stats.failedPayments,
      icon: "fas fa-times-circle",
      color: "red",
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      description: "Failed payment transactions",
    },
  ];

  // Calculate verification rate
  const verificationRate =
    stats.verifiedPayments + stats.pendingVerification > 0
      ? (
          (stats.verifiedPayments /
            (stats.verifiedPayments + stats.pendingVerification)) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-sm p-6 overflow-hidden group hover:shadow-md transition-all duration-200"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-200`}
            ></div>

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <i className={`${card.icon} ${card.textColor} text-lg`}></i>
                </div>

                {/* Trend Indicator - you can add logic for this */}
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-arrow-up text-green-500 mr-1"></i>
                  <span className="text-green-500 font-medium">+12%</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Summary
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="fas fa-chart-pie"></i>
              <span>Overview</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats.verifiedPayments}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  (
                  {(
                    (stats.verifiedPayments / (payments?.length || 1)) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats.pendingVerification}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  (
                  {(
                    (stats.pendingVerification / (payments?.length || 1)) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Failed</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {stats.failedPayments}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  (
                  {(
                    (stats.failedPayments / (payments?.length || 1)) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="fas fa-bolt"></i>
              <span>Actions</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <i className="fas fa-check text-blue-600 text-sm"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Verify Pending Payments
                </span>
              </div>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                {stats.pendingVerification}
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                  <i className="fas fa-download text-green-600 text-sm"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Export Financial Report
                </span>
              </div>
              <i className="fas fa-arrow-right text-gray-400 text-sm"></i>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <i className="fas fa-chart-bar text-purple-600 text-sm"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Generate Analytics
                </span>
              </div>
              <i className="fas fa-arrow-right text-gray-400 text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Verification Performance
            </h3>
            <p className="text-green-100 text-sm">
              {verificationRate}% of payments have been successfully verified
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-1">{verificationRate}%</div>
            <div className="text-green-100 text-sm">Success Rate</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-green-400 bg-opacity-30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${verificationRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantStats;

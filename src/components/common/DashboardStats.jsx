// src/components/common/DashboardStats.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardStats = () => {
  const { bookings } = useSelector((state) => state.booking);
  const [stats, setStats] = useState({
    pending: 0,
    preVisitScheduled: 0,
    preVisitCompleted: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    if (bookings.length > 0) {
      const pending = bookings.filter(
        (booking) => booking.status === "pending"
      ).length;
      const preVisitScheduled = bookings.filter(
        (booking) => booking.status === "pre_visit_scheduled"
      ).length;
      const preVisitCompleted = bookings.filter(
        (booking) => booking.status === "pre_visit_completed"
      ).length;
      const assigned = bookings.filter(
        (booking) => booking.status === "assigned"
      ).length;
      const inProgress = bookings.filter(
        (booking) => booking.status === "in_progress"
      ).length;
      const completed = bookings.filter(
        (booking) => booking.status === "completed"
      ).length;

      setStats({
        pending,
        preVisitScheduled,
        preVisitCompleted,
        assigned,
        inProgress,
        completed,
      });
    }
  }, [bookings]);

  const statCards = [
    {
      title: "New Requests",
      value: stats.pending,
      icon: "fas fa-clipboard-list",
      bgColor: "bg-red-500",
      bgGradient: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgLight: "bg-red-50",
      borderColor: "border-red-200",
      trend: stats.pending > 0 ? "urgent" : "normal",
    },
    {
      title: "Pre-Visits Scheduled",
      value: stats.preVisitScheduled,
      icon: "fas fa-calendar-check",
      bgColor: "bg-yellow-500",
      bgGradient: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgLight: "bg-yellow-50",
      borderColor: "border-yellow-200",
      trend: "normal",
    },
    {
      title: "Budget Provided",
      value: stats.preVisitCompleted,
      icon: "fas fa-file-invoice-dollar",
      bgColor: "bg-blue-500",
      bgGradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: "normal",
    },
    {
      title: "Assigned",
      value: stats.assigned,
      icon: "fas fa-user-check",
      bgColor: "bg-indigo-500",
      bgGradient: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
      borderColor: "border-indigo-200",
      trend: "normal",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: "fas fa-broom",
      bgColor: "bg-purple-500",
      bgGradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
      borderColor: "border-purple-200",
      trend: "active",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "fas fa-check-circle",
      bgColor: "bg-green-500",
      bgGradient: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
      borderColor: "border-green-200",
      trend: "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-xl shadow-sm border ${card.borderColor} hover:shadow-md transition-all duration-300 overflow-hidden group`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className={`w-full h-full bg-gradient-to-br ${card.bgGradient}`}
            ></div>
          </div>

          {/* Card Content */}
          <div className="relative p-6">
            {/* Icon Section */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`${card.icon} text-white text-lg`}></i>
              </div>

              {/* Status Indicator */}
              {card.trend === "urgent" && card.value > 0 && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-red-600 font-medium">
                    Urgent
                  </span>
                </div>
              )}
              {card.trend === "active" && card.value > 0 && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-purple-600 font-medium">
                    Active
                  </span>
                </div>
              )}
              {card.trend === "positive" && card.value > 0 && (
                <div className="flex items-center">
                  <i className="fas fa-arrow-up text-green-500 text-xs mr-1"></i>
                  <span className="text-xs text-green-600 font-medium">
                    Good
                  </span>
                </div>
              )}
            </div>

            {/* Stats Content */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600 leading-tight">
                {card.title}
              </h3>
              <div className="flex items-baseline">
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
                <span className="ml-2 text-sm text-gray-500">
                  {card.value === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className={`h-1 rounded-full bg-gradient-to-r ${card.bgGradient} transition-all duration-500`}
                  style={{
                    width: `${Math.min(
                      (card.value /
                        Math.max(...statCards.map((c) => c.value), 1)) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div
            className={`absolute inset-x-0 bottom-0 h-1 ${card.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

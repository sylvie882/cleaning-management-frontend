// src/components/Cleaner/CleanerStats.jsx
import { useState, useEffect } from "react";

const CleanerStats = ({ bookings }) => {
  const [stats, setStats] = useState({
    upcoming: 0,
    inProgress: 0,
    completed: 0,
    thisWeek: 0,
    todayTasks: 0,
  });

  useEffect(() => {
    if (bookings.length > 0) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const upcoming = bookings.filter(
        (booking) =>
          booking.status === "assigned" &&
          new Date(booking.scheduledDateTime || booking.preferredDateTime) >=
            now
      ).length;

      const inProgress = bookings.filter(
        (booking) => booking.status === "in_progress"
      ).length;

      const completed = bookings.filter(
        (booking) => booking.status === "completed"
      ).length;

      const thisWeek = bookings.filter((booking) => {
        const bookingDate = new Date(
          booking.scheduledDateTime || booking.preferredDateTime
        );
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      }).length;

      const todayTasks = bookings.filter((booking) => {
        const bookingDate = new Date(
          booking.scheduledDateTime || booking.preferredDateTime
        );
        return bookingDate.toDateString() === today.toDateString();
      }).length;

      setStats({
        upcoming,
        inProgress,
        completed,
        thisWeek,
        todayTasks,
      });
    }
  }, [bookings]);

  const statsConfig = [
    {
      title: "Today's Tasks",
      value: stats.todayTasks,
      icon: "fas fa-calendar-day",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      priority: true,
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: "fas fa-calendar-alt",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      icon: "fas fa-clipboard-list",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: "fas fa-hourglass-half",
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      highlight: stats.inProgress > 0,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "fas fa-check-circle",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
      {statsConfig.map((stat, index) => (
        <div
          key={index}
          className={`
            relative bg-white rounded-xl shadow-md border border-gray-200 p-6 
            hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200
            ${stat.priority ? "ring-2 ring-blue-200" : ""}
            ${stat.highlight ? "ring-2 ring-yellow-200" : ""}
          `}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5 overflow-hidden rounded-xl">
            <div
              className={`w-full h-full ${stat.bgColor} transform rotate-45 translate-x-8 -translate-y-8`}
            ></div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.iconBg} mb-4`}
            >
              <i className={`${stat.icon} text-xl ${stat.iconColor}`}></i>
            </div>

            {/* Stats Content */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {stat.title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                {stat.priority && stat.value > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Priority
                  </span>
                )}
                {stat.highlight && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar for certain stats */}
            {(stat.title === "Today's Tasks" || stat.title === "In Progress") &&
              stat.value > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${stat.bgColor}`}
                      style={{
                        width: `${Math.min((stat.value / 10) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default CleanerStats;

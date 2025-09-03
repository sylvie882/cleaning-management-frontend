// src/components/Accountant/RevenueChart.jsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const RevenueChart = ({ payments, period = "month" }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!payments || payments.length === 0) {
      setChartData([]);
      return;
    }

    // Filter completed payments only
    const completedPayments = payments.filter(
      (payment) => payment.status === "completed"
    );

    if (period === "week") {
      // Group by day of the week (last 7 days)
      const today = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 6);

      // Initialize data for last 7 days
      const lastWeekData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(oneWeekAgo);
        date.setDate(oneWeekAgo.getDate() + i);
        return {
          date: date.toISOString().split("T")[0],
          name: date.toLocaleDateString("en-US", { weekday: "short" }),
          revenue: 0,
          count: 0,
        };
      });

      // Fill in the data
      completedPayments.forEach((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const dateString = paymentDate.toISOString().split("T")[0];

        const dataPoint = lastWeekData.find((d) => d.date === dateString);
        if (dataPoint) {
          dataPoint.revenue += payment.amount;
          dataPoint.count += 1;
        }
      });

      setChartData(lastWeekData);
    } else if (period === "month") {
      // Group by day of the month (current month)
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      const daysInMonth = lastDayOfMonth.getDate();

      // Initialize data for each day of the month
      const monthData = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(firstDayOfMonth);
        date.setDate(i + 1);
        return {
          date: date.toISOString().split("T")[0],
          name: i + 1, // Day of month as number
          revenue: 0,
          count: 0,
        };
      });

      // Fill in the data
      completedPayments.forEach((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const isCurrentMonth =
          paymentDate.getMonth() === firstDayOfMonth.getMonth() &&
          paymentDate.getFullYear() === firstDayOfMonth.getFullYear();

        if (isCurrentMonth) {
          const dayOfMonth = paymentDate.getDate() - 1; // 0-based index
          monthData[dayOfMonth].revenue += payment.amount;
          monthData[dayOfMonth].count += 1;
        }
      });

      setChartData(monthData);
    } else if (period === "year") {
      // Group by month of the year
      const today = new Date();
      const currentYear = today.getFullYear();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize data for each month
      const yearData = months.map((month, index) => ({
        name: month,
        monthIndex: index,
        revenue: 0,
        count: 0,
      }));

      // Fill in the data
      completedPayments.forEach((payment) => {
        const paymentDate = new Date(payment.createdAt);
        const isCurrentYear = paymentDate.getFullYear() === currentYear;

        if (isCurrentYear) {
          const monthIndex = paymentDate.getMonth();
          yearData[monthIndex].revenue += payment.amount;
          yearData[monthIndex].count += 1;
        }
      });

      setChartData(yearData);
    }
  }, [payments, period]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="revenue">{`Revenue: ${formatCurrency(
            payload[0].value
          )}`}</p>
          <p className="count">{`Payments: ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="revenue-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => value}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#4CAF50"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            name="Number of Payments"
            stroke="#2196F3"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;

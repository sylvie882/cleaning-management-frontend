// src/components/Manager/RevenueChart.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const RevenueChart = ({ data, period = "monthly" }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
    // In a real implementation, we would dispatch an action to fetch new data based on the period
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="revenue">{`Revenue: ${formatCurrency(
            payload[0].value
          )}`}</p>
          <p className="bookings">{`Bookings: ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="revenue-chart-container">
      <div className="chart-header">
        <h3>Revenue Overview</h3>
        <div className="period-selector">
          <button
            className={selectedPeriod === "weekly" ? "active" : ""}
            onClick={() => handlePeriodChange("weekly")}
          >
            Weekly
          </button>
          <button
            className={selectedPeriod === "monthly" ? "active" : ""}
            onClick={() => handlePeriodChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={selectedPeriod === "yearly" ? "active" : ""}
            onClick={() => handlePeriodChange("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
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
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8884d8" />
          <Bar
            yAxisId="right"
            dataKey="bookings"
            name="Bookings"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;

/* eslint-disable no-unused-vars */
// src/pages/Accountant/FinancialReports.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinancialStats } from "../../features/payment/paymentSlice";
import { formatCurrency } from "../../utils/formatters";
import RevenueChart from "../../components/Accoutant/RevenueChart";

const FinancialReports = () => {
  const dispatch = useDispatch();
  const { financialStats, isLoading } = useSelector((state) => state.payment);

  const [period, setPeriod] = useState("monthly");
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    dispatch(getFinancialStats(period));
  }, [dispatch, period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleReportTypeChange = (newType) => {
    setReportType(newType);
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
      getFinancialStats({
        period,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
  };

  const exportReport = (format) => {
    // This would be implemented to export the report in various formats (CSV, PDF, etc.)
    alert(`Exporting ${reportType} report in ${format} format...`);
  };

  // Format data for service distribution chart
  const serviceRevenueData = financialStats?.revenueByService || [];

  // Calculate totals
  const totals = {
    revenue: financialStats?.totalRevenue || 0,
    transactions: financialStats?.totalTransactions || 0,
    avgTransaction: financialStats?.avgTransactionValue || 0,
  };

  const reportTypes = [
    { id: "revenue", label: "Revenue Analysis", icon: "fas fa-chart-line" },
    { id: "services", label: "Service Breakdown", icon: "fas fa-broom" },
    { id: "clients", label: "Client Analysis", icon: "fas fa-users" },
  ];

  const periodOptions = [
    { value: "weekly", label: "Weekly", icon: "fas fa-calendar-week" },
    { value: "monthly", label: "Monthly", icon: "fas fa-calendar-alt" },
    { value: "quarterly", label: "Quarterly", icon: "fas fa-calendar" },
    { value: "yearly", label: "Yearly", icon: "fas fa-calendar-check" },
    { value: "custom", label: "Custom Range", icon: "fas fa-calendar-plus" },
  ];

  const exportOptions = [
    {
      format: "csv",
      label: "CSV",
      icon: "fas fa-file-csv",
      color: "text-green-600",
    },
    {
      format: "pdf",
      label: "PDF",
      icon: "fas fa-file-pdf",
      color: "text-red-600",
    },
    {
      format: "excel",
      label: "Excel",
      icon: "fas fa-file-excel",
      color: "text-emerald-600",
    },
  ];

  const summaryCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totals.revenue),
      icon: "fas fa-dollar-sign",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+12.5%",
      trendPositive: true,
    },
    {
      title: "Total Transactions",
      value: totals.transactions.toLocaleString(),
      icon: "fas fa-exchange-alt",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+8.3%",
      trendPositive: true,
    },
    {
      title: "Average Transaction",
      value: formatCurrency(totals.avgTransaction),
      icon: "fas fa-calculator",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+4.1%",
      trendPositive: true,
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
                Financial Reports
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive financial analysis and reporting dashboard
              </p>
            </div>
            <div className="flex space-x-2">
              {exportOptions.map((option) => (
                <button
                  key={option.format}
                  onClick={() => exportReport(option.format)}
                  className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  title={`Export as ${option.label}`}
                >
                  <i
                    className={`${option.icon} ${option.color} text-sm mr-2`}
                  ></i>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Report Type Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Report Type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      reportType === type.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleReportTypeChange(type.id)}
                  >
                    <i className={`${type.icon} mr-2`}></i>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Period Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Time Period
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {periodOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      period === option.value
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handlePeriodChange(option.value)}
                  >
                    <i className={`${option.icon} mr-2 text-xs`}></i>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Date Range */}
          {period === "custom" && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Custom Date Range
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
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
                  <div className="flex-1">
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
                      className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm p-6 overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-200`}
              ></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <i className={`${card.icon} ${card.textColor} text-lg`}></i>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      card.trendPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <i
                      className={`fas fa-arrow-${
                        card.trendPositive ? "up" : "down"
                      } mr-1`}
                    ></i>
                    <span className="font-medium">{card.trend}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Content */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">
                  Loading financial data...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {reportType === "revenue" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Revenue Analysis
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Track revenue trends over time
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <i className="fas fa-chart-line"></i>
                    <span>Trend Analysis</span>
                  </div>
                </div>
                <div className="h-96">
                  <RevenueChart
                    data={financialStats?.revenueTrends}
                    period={period}
                  />
                </div>
              </div>
            )}

            {reportType === "services" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Revenue by Service Type
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Breakdown of revenue by cleaning services
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <i className="fas fa-chart-pie"></i>
                      <span>Service Analysis</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Average Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {serviceRevenueData.map((service, index) => (
                        <tr
                          key={service._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <i className="fas fa-broom text-blue-600 text-sm"></i>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {service._id}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatCurrency(service.totalRevenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {service.transactionCount || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(
                              service.totalRevenue /
                                (service.transactionCount || 1)
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      (service.totalRevenue /
                                        (totals.revenue || 1)) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">
                                {(
                                  (service.totalRevenue /
                                    (totals.revenue || 1)) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {reportType === "clients" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Top Clients Analysis
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Highest value clients by revenue contribution
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <i className="fas fa-users"></i>
                      <span>Client Analysis</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(financialStats?.topClients || []).map(
                        (client, index) => (
                          <tr
                            key={client._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                                  <span className="text-white font-medium text-sm">
                                    {client.name?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {client.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    #{index + 1} Top Client
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              {formatCurrency(client.totalSpent)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {client.bookingsCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(
                                client.lastTransaction
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReports;

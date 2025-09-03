// src/pages/Manager/Finances.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinancialStats } from "../../features/payment/paymentSlice";
import { formatCurrency } from "../../utils/formatters";
import RevenueChart from "../../components/Manager/RevenueChart";

const Finances = () => {
  const dispatch = useDispatch();
  const { financialStats, isLoading } = useSelector((state) => state.payment);

  const [period, setPeriod] = useState("monthly");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [view, setView] = useState("overview");

  useEffect(() => {
    dispatch(getFinancialStats(period));
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
      getFinancialStats({
        period,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
  };

  const exportFinancials = (format) => {
    // This would be implemented to export financial data in various formats
    alert(`Exporting financial data in ${format} format...`);
  };

  const viewOptions = [
    { id: "overview", label: "Overview", icon: "fas fa-chart-pie" },
    { id: "revenue", label: "Revenue Analysis", icon: "fas fa-chart-line" },
    { id: "expenses", label: "Expenses", icon: "fas fa-file-invoice-dollar" },
    { id: "profit", label: "Profit & Loss", icon: "fas fa-balance-scale" },
  ];

  const periodOptions = [
    { value: "weekly", label: "Weekly", icon: "fas fa-calendar-week" },
    { value: "monthly", label: "Monthly", icon: "fas fa-calendar-alt" },
    { value: "quarterly", label: "Quarterly", icon: "fas fa-calendar" },
    { value: "yearly", label: "Yearly", icon: "fas fa-calendar-check" },
    { value: "custom", label: "Custom", icon: "fas fa-calendar-plus" },
  ];

  const summaryCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(financialStats?.totalRevenue || 0),
      icon: "fas fa-money-bill-wave",
      trend: financialStats?.revenueGrowth || 0,
      trendLabel: "vs. previous period",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(financialStats?.totalExpenses || 0),
      icon: "fas fa-file-invoice-dollar",
      trend: -(financialStats?.expensesGrowth || 0), // Negative because lower expenses are better
      trendLabel: "vs. previous period",
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Net Profit",
      value: formatCurrency(financialStats?.netProfit || 0),
      icon: "fas fa-chart-line",
      trend: financialStats?.profitGrowth || 0,
      trendLabel: "vs. previous period",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Profit Margin",
      value: `${financialStats?.profitMargin?.toFixed(1) || 0}%`,
      icon: "fas fa-percentage",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const TrendIndicator = ({ trend }) => {
    const isPositive = trend >= 0;
    return (
      <div
        className={`flex items-center text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        <i className={`fas fa-arrow-${isPositive ? "up" : "down"} mr-1`}></i>
        <span className="font-medium">{Math.abs(trend).toFixed(1)}%</span>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
          statusConfig[status] || statusConfig.pending
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-chart-bar mr-3 text-green-600"></i>
                Financial Management
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor revenue, expenses, and profitability metrics
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => exportFinancials("csv")}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <i className="fas fa-download mr-2"></i>
                Export Data
              </button>
              <button
                onClick={() => exportFinancials("pdf")}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <i className="fas fa-file-pdf mr-2"></i>
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  view === option.id
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setView(option.id)}
              >
                <i className={`${option.icon} mr-2`}></i>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
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

        {/* Content Area */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">
                  Loading financial data...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {view === "overview" && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <i
                              className={`${card.icon} ${card.iconColor} text-lg`}
                            ></i>
                          </div>
                          {card.trend !== undefined && (
                            <TrendIndicator trend={card.trend} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {card.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 mb-1">
                            {card.value}
                          </p>
                          {card.trendLabel && (
                            <p className="text-xs text-gray-500">
                              {card.trendLabel}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Revenue vs Expenses
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <i className="fas fa-chart-area"></i>
                        <span>Monthly comparison</span>
                      </div>
                    </div>
                    <div className="h-80">
                      <RevenueChart
                        data={financialStats?.revenueVsExpenses || []}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Revenue by Service Type
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <i className="fas fa-chart-bar"></i>
                        <span>Service breakdown</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {(financialStats?.revenueByService || []).map(
                        (service, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {service._id}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {formatCurrency(service.totalRevenue)}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${
                                      (service.totalRevenue /
                                        (financialStats?.totalRevenue || 1)) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recent Transactions
                      </h3>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(financialStats?.recentTransactions || []).map(
                          (transaction, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <i className="fas fa-user text-blue-600 text-xs"></i>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {transaction.client}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {transaction.service}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={transaction.status} />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {view === "revenue" && (
              <div className="bg-white rounded-xl shadow-sm p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-line text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Revenue Analysis
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Detailed revenue analysis and forecasting tools will be
                    available here.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                    <i className="fas fa-cog mr-2"></i>
                    Configure Analysis
                  </button>
                </div>
              </div>
            )}

            {view === "expenses" && (
              <div className="bg-white rounded-xl shadow-sm p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-invoice-dollar text-2xl text-red-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Expenses Tracking
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Comprehensive expense tracking and categorization tools will
                    be implemented here.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                    <i className="fas fa-plus mr-2"></i>
                    Add Expense
                  </button>
                </div>
              </div>
            )}

            {view === "profit" && (
              <div className="bg-white rounded-xl shadow-sm p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-balance-scale text-2xl text-purple-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Profit & Loss Statement
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Detailed profit and loss statements with comprehensive
                    financial reporting.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                    <i className="fas fa-file-alt mr-2"></i>
                    Generate Statement
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;

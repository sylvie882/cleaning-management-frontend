/* eslint-disable no-unused-vars */
// src/pages/Accountant/PaymentsList.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../features/payment/paymentSlice";
import { formatDateTime, formatCurrency } from "../../utils/formatters";
import PaymentModal from "../../components/Accoutant/PaymentModal";

const PaymentsList = () => {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state) => state.payment);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  // Filter, sort, and search payments
  useEffect(() => {
    if (!payments) return;

    let result = [...payments];

    // Filter by status
    if (activeTab !== "all") {
      result = result.filter((payment) => payment.status === activeTab);
    }

    // Search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (payment) =>
          payment.client.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.booking?.serviceType
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          payment.transactionId.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment._id.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Sort
    result.sort((a, b) => {
      let fieldA, fieldB;

      // Determine fields to compare based on sortField
      switch (sortField) {
        case "date":
          fieldA = new Date(a.createdAt).getTime();
          fieldB = new Date(b.createdAt).getTime();
          break;
        case "amount":
          fieldA = a.amount;
          fieldB = b.amount;
          break;
        case "client":
          fieldA = a.client.name.toLowerCase();
          fieldB = b.client.name.toLowerCase();
          break;
        case "transactionId":
          fieldA = a.transactionId.toLowerCase();
          fieldB = b.transactionId.toLowerCase();
          break;
        case "status":
          fieldA = a.status;
          fieldB = b.status;
          break;
        default:
          fieldA = a[sortField];
          fieldB = b[sortField];
      }

      // Compare the fields
      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredPayments(result);
  }, [payments, activeTab, searchTerm, sortField, sortDirection]);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for dates and amounts, ascending for text
      setSortField(field);
      setSortDirection(field === "date" || field === "amount" ? "desc" : "asc");
    }
  };

  // Open payment details modal
  const openPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  // Close payment details modal
  const closePaymentModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  // Handle payment verification
  const handleVerifyPayment = (paymentId, verificationData) => {
    // This would be handled in the PaymentModal component
    closePaymentModal();
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let className = "status-badge";

    switch (status) {
      case "pending":
        className += " pending";
        break;
      case "completed":
        className += " completed";
        break;
      case "failed":
        className += " failed";
        break;
      default:
        break;
    }

    return <span className={className}>{status}</span>;
  };

  return (
    <div className="payments-page">
      <div className="page-header">
        <h1>Payment Management</h1>
        <div className="header-actions">
          <button
            className="refresh-btn"
            onClick={() => dispatch(getPayments())}
            disabled={isLoading}
          >
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      </div>

      <div className="payments-filters">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Payments
          </button>
          <button
            className={`tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Verification
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <button
            className={`tab ${activeTab === "failed" ? "active" : ""}`}
            onClick={() => setActiveTab("failed")}
          >
            Failed
          </button>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading payments...</p>
        </div>
      ) : filteredPayments.length > 0 ? (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("date")}>
                  Date
                  {sortField === "date" && (
                    <i
                      className={`fas fa-sort-${
                        sortDirection === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th onClick={() => handleSort("client")}>
                  Client
                  {sortField === "client" && (
                    <i
                      className={`fas fa-sort-${
                        sortDirection === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th>Service</th>
                <th onClick={() => handleSort("transactionId")}>
                  Transaction ID
                  {sortField === "transactionId" && (
                    <i
                      className={`fas fa-sort-${
                        sortDirection === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th onClick={() => handleSort("amount")}>
                  Amount
                  {sortField === "amount" && (
                    <i
                      className={`fas fa-sort-${
                        sortDirection === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th>Payment Method</th>
                <th onClick={() => handleSort("status")}>
                  Status
                  {sortField === "status" && (
                    <i
                      className={`fas fa-sort-${
                        sortDirection === "asc" ? "up" : "down"
                      }`}
                    ></i>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td className="date-col">
                    {formatDateTime(payment.createdAt)}
                  </td>
                  <td className="client-col">
                    <div className="client-info">
                      <span className="client-name">{payment.client.name}</span>
                      <span className="client-email">
                        {payment.client.email}
                      </span>
                    </div>
                  </td>
                  <td className="service-col">
                    {payment.booking?.serviceType || "N/A"}
                  </td>
                  <td className="transaction-col">{payment.transactionId}</td>
                  <td className="amount-col">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="method-col">{payment.paymentMethod}</td>
                  <td className="status-col">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="actions-col">
                    <button
                      className="action-btn view"
                      onClick={() => openPaymentModal(payment)}
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>

                    {payment.status === "pending" && (
                      <button
                        className="action-btn verify"
                        onClick={() => openPaymentModal(payment)}
                        title="Verify Payment"
                      >
                        <i className="fas fa-check-circle"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-payments">
          <div className="empty-state">
            <i className="fas fa-money-bill-wave"></i>
            <h3>No Payments Found</h3>
            <p>No payments match your current filters.</p>
          </div>
        </div>
      )}

      {isModalOpen && selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onVerify={handleVerifyPayment}
          onClose={closePaymentModal}
        />
      )}
    </div>
  );
};

export default PaymentsList;

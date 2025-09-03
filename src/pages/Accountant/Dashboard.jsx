// src/pages/Accountant/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPayments,
  verifyPayment,
} from "../../features/payment/paymentSlice";
import AccountantStats from "../../components/Accoutant/AccountantStats";
import PaymentModal from "../../components/Accoutant/PaymentModal";

const AccountantDashboard = () => {
  const dispatch = useDispatch();
  const { payments, isLoading, isError, message } = useSelector(
    (state) => state.payment
  );
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  // Debug logging to see what we're getting
  useEffect(() => {
    console.log("=== ACCOUNTANT DASHBOARD DEBUG ===");
    console.log("Payments from Redux:", payments);
    console.log("Type of payments:", typeof payments);
    console.log("Is payments an array?", Array.isArray(payments));
    console.log("================================");
  }, [payments]);

  const openPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleVerifyPayment = (paymentId, verificationData) => {
    dispatch(verifyPayment({ id: paymentId, verificationData })).then(
      (result) => {
        if (verifyPayment.fulfilled.match(result)) {
          closePaymentModal();
          dispatch(getPayments()); // Refresh the payments list
        }
      }
    );
  };

  // Safe filtering with proper error handling
  const filteredPayments = useMemo(() => {
    // Ensure payments is an array before filtering
    if (!Array.isArray(payments)) {
      console.warn("Payments is not an array, received:", payments);
      return [];
    }

    return payments.filter((payment) => {
      if (activeTab === "pending") {
        return payment.status === "pending";
      } else if (activeTab === "verified") {
        return payment.status === "completed";
      } else if (activeTab === "failed") {
        return payment.status === "failed";
      }
      return true;
    });
  }, [payments, activeTab]);

  // Safe payments array for stats component
  const safePayments = Array.isArray(payments) ? payments : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error Loading Payments
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{message}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => dispatch(getPayments())}
                className="bg-red-100 px-4 py-2 rounded text-red-800 hover:bg-red-200 transition-colors"
              >
                <i className="fas fa-redo mr-2"></i>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-calculator mr-3 text-green-600"></i>
                Accountant Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and verify payment transactions
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => dispatch(getPayments())}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                <i
                  className={`fas fa-sync-alt mr-2 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                ></i>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Component */}
        <div className="mb-8">
          <AccountantStats payments={safePayments} />
        </div>

        {/* Payments Manager */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: "pending", label: "Pending Verification" },
                { id: "verified", label: "Verified Payments" },
                { id: "failed", label: "Failed Payments" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } transition-colors duration-200`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {filteredPayments.length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto">
            {filteredPayments.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Ref
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.transactionId || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user text-blue-600"></i>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {payment.client?.name || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.client?.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #
                        {payment.booking?._id?.slice(-6).toUpperCase() || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.booking?.serviceType || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${payment.amount?.toFixed(2) || "0.00"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openPaymentModal(payment)}
                            className="inline-flex items-center p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            title="View Details"
                          >
                            <i className="fas fa-eye text-sm"></i>
                          </button>

                          {payment.status === "pending" && (
                            <button
                              onClick={() => openPaymentModal(payment)}
                              className="inline-flex items-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                              title="Verify Payment"
                            >
                              <i className="fas fa-check-circle text-sm"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-receipt text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No {activeTab} payments found
                </h3>
                <p className="text-gray-600">
                  There are currently no payments with {activeTab} status.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && selectedPayment && (
          <PaymentModal
            payment={selectedPayment}
            onVerify={handleVerifyPayment}
            onClose={closePaymentModal}
          />
        )}
      </div>
    </div>
  );
};

export default AccountantDashboard;

// src/services/paymentService.js
import axios from "axios";

const API_URL = "https://cleaning-management-backend.onrender.com/api/payments/";

// Helper function to get auth config
const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    throw new Error("No authentication token found");
  }

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };
};

// Create a new payment (public)
const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(API_URL, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// Get all payments (protected)
const getPayments = async (filters = {}) => {
  try {
    const config = getAuthConfig();

    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// Get payment by ID (protected)
const getPaymentById = async (id) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(API_URL + id, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
};

// Update payment status (protected)
const updatePaymentStatus = async (id, statusData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(
      API_URL + `${id}/status`,
      statusData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

// Verify payment (protected)
const verifyPayment = async (id, verificationData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(
      API_URL + `${id}/verify`,
      verificationData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Get payment statistics (protected)
const getPaymentStats = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(API_URL + "stats", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    throw error;
  }
};

// Get financial statistics (protected)
const getFinancialStats = async (period) => {
  try {
    const config = getAuthConfig();

    let url = API_URL + "financial-stats";

    if (period) {
      const queryParams = new URLSearchParams();

      if (typeof period === "string") {
        queryParams.append("period", period);
      } else if (typeof period === "object") {
        if (period.period) queryParams.append("period", period.period);
        if (period.startDate) queryParams.append("startDate", period.startDate);
        if (period.endDate) queryParams.append("endDate", period.endDate);
      }

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching financial stats:", error);
    throw error;
  }
};

// Get payments by booking ID (protected)
const getPaymentsByBookingId = async (bookingId) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(API_URL + `booking/${bookingId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments by booking ID:", error);
    throw error;
  }
};

// Process refund (protected)
const processRefund = async (id, refundData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(
      API_URL + `${id}/refund`,
      refundData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error processing refund:", error);
    throw error;
  }
};

// Make a payment (public) - alias for createPayment for backward compatibility
const makePayment = async (paymentData) => {
  return createPayment(paymentData);
};

const paymentService = {
  createPayment,
  makePayment, // alias for backward compatibility
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  verifyPayment,
  getPaymentStats,
  getFinancialStats,
  getPaymentsByBookingId,
  processRefund,
};

export default paymentService;

// src/services/bookingService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/bookings/";
const GET_ALL_BOOKINGS_URL = "https://sylvie-kg23.onrender.com/api/bookings/";

// Get booking by ID (protected) - Enhanced with better error handling
const getBookingById = async (id) => {
  try {
    console.log("=== BOOKING SERVICE DEBUG ===");
    console.log("Attempting to fetch booking with ID:", id);
    console.log("Full URL:", API_URL + id);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      throw new Error("No authentication token found");
    }

    console.log("User token exists:", !!user.token);
    console.log("Token preview:", user.token.substring(0, 20) + "...");

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Making request with config:", config);

    const response = await axios.get(API_URL + id, config);

    console.log("API Response Status:", response.status);
    console.log("API Response Data:", response.data);
    console.log("=============================");

    return response.data;
  } catch (error) {
    console.error("=== BOOKING SERVICE ERROR ===");
    console.error("Error fetching booking:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error message:", error.message);
    console.error("=============================");
    throw error;
  }
};

// Create a new booking (public)
const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};

// Get booking by ID and token (public)
const getBookingByToken = async (id, token) => {
  const response = await axios.get(API_URL + `${id}/${token}`);
  return response.data;
};

// Submit rating (public)
const submitRating = async (id, token, ratingData) => {
  const response = await axios.post(
    API_URL + `${id}/${token}/rate`,
    ratingData
  );
  return response.data;
};

// Approve/reject budget (public - no authentication required)
const approveBudget = async (id, token, approved) => {
  const response = await axios.post(API_URL + `${id}/${token}/approve-budget`, {
    approved,
  });
  return response.data;
};

// Get all bookings (protected)
const getAllBookings = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get pending bookings (for head of cleaning)
const getPendingBookings = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "pending", config);
  return response.data;
};

// Get bookings assigned to cleaner
const getCleanerBookings = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "cleaner", config);
  return response.data;
};

// Update booking status (for head of cleaning)
const updateBookingStatus = async (id, data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, data, config);
  return response.data;
};

// Update cleaner progress
const updateCleanerProgress = async (id, data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id + "/progress", data, config);
  console.log(API_URL + id + "/progress");
  return response.data;
};

// Get booking statistics (for manager dashboard)
const getBookingStats = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Fetching booking stats with token:", token);
  const response = await axios.get(`${API_URL}stats`, config);
  console.log("Booking stats response:", response.data);
  return response.data;
};

const bookingService = {
  createBooking,
  getBookingByToken,
  submitRating,
  approveBudget,
  getAllBookings,
  getPendingBookings,
  getCleanerBookings,
  updateBookingStatus,
  updateCleanerProgress,
  getBookingStats,
  getBookingById,
};

export default bookingService;

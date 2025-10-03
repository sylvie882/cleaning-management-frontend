/* eslint-disable no-unused-vars */
// src/services/serviceService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/v1/services";
// const LOCAL_API_URL = "http://localhost:8000/api/v1/services";

// Get all services
const getServices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get service by ID
const getServiceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log("Service fetched by ID:", response.data);
  return response.data;
};

// Create service (admin only) with proper error handling
const createService = async (serviceData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    console.log("Service Data being sent:", serviceData);
    console.log("YouTube videos in create:", serviceData.youtubeVideos);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(API_URL, serviceData, config);

    console.log("Service created successfully:", response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error("Create Service Error:");

    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Response Data:", error.response.data);

      // Throw the server error message for the UI to handle
      throw new Error(
        error.response.data?.message || `Server Error: ${error.response.status}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server");
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      // Something else happened (like localStorage issues)
      console.error("Error:", error.message);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

const updateService = async (id, serviceData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    console.log("=== UPDATE SERVICE DEBUG ===");
    console.log("Service ID:", id);
    console.log("Service Data being sent for update:", serviceData);
    console.log("YouTube videos in update:", serviceData.youtubeVideos);
    console.log("Images in update:", serviceData.images);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // FIXED: Use PUT instead of PATCH to match your backend route
    const response = await axios.put(`${API_URL}/${id}`, serviceData, config);

    console.log("Service updated successfully:", response.data);
    console.log(
      "Updated service YouTube videos:",
      response.data.data?.youtubeVideos
    );
    return response.data;
  } catch (error) {
    console.error("Update Service Error:");
    console.error("Error details:", error.response?.data);
    console.error("Service data that failed:", serviceData);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response Data:", error.response.data);
      throw new Error(
        error.response.data?.message || `Server Error: ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No response received from server");
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      console.error("Error:", error.message);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

// Delete service (admin only)
const deleteService = async (id) => {
  try {
    console.log("Attempting to delete service with ID:", id);

    // Check if user exists in localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      throw new Error("No user found in localStorage");
    }

    const parsedUser = JSON.parse(user);
    if (!parsedUser.token) {
      throw new Error("No token found in user data");
    }

    const token = parsedUser.token;
    console.log("Token retrieved successfully");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${API_URL}/${id}`;
    console.log("Making DELETE request to:", url);

    const response = await axios.delete(url, config);

    console.log("Delete service response:", response);
    console.log("Delete service response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in deleteService function:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    console.error("Full error object:", error);

    // Re-throw the error so it can be handled by Redux
    throw error;
  }
};

// Get featured services
const getFeaturedServices = async () => {
  const response = await axios.get(`${API_URL}/featured`);
  return response.data;
};

// Get services by category
const getServicesByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/category/${category}`);
  return response.data;
};

const serviceService = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getFeaturedServices,
  getServicesByCategory,
};

export default serviceService;

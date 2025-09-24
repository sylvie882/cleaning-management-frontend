// src/services/userService.js
import axios from "axios";

const API_URL = "https://cleaning-management-backend.onrender.com/api/auth/register";
const GET_UERS_URL = "https://cleaning-management-backend.onrender.com/api/auth/users";
const GET_USER_BY_ROLE =
  "https://cleaning-management-backend.onrender.com/api/auth/users/role/";
const BASE_URL = "https://cleaning-management-backend.onrender.com/api/auth/users";

// Get all users
const getUsers = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(GET_UERS_URL, config);
  console.log("getUsers response", response);
  return response.data;
};

// Get user by ID
const getUserById = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Create user
const createUser = async (userData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("userData", userData);
    const response = await axios.post(API_URL, userData, config);

    console.log("User created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:");

    // Check if it's an axios error with response from server
    if (error.response) {
      console.error("Server responded with error:");
      console.error("Status:", error.response.status);
      console.error("Error data:", error.response.data);
      console.error("Headers:", error.response.headers);

      // Throw the server error message for the calling function to handle
      throw new Error(
        error.response.data.error ||
          error.response.data.message ||
          `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      // Network error - request was made but no response received
      console.error("Network error - no response received:");
      console.error("Request:", error.request);
      throw new Error("Network error: Unable to reach server");
    } else {
      // Something else happened in setting up the request
      console.error("Error setting up request:", error.message);
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Update user
const updateUser = async (id, userData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${BASE_URL}/${id}`, userData, config);
  return response.data;
};

// Delete user
const deleteUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${BASE_URL}/${id}`, config);
  return response.data;
};

// Get cleaners
const getCleaners = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${GET_USER_BY_ROLE}cleaner`, config);
  return response.data;
};

// Get user statistics
const getUserStats = async (period) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = API_URL + "/stats";

  if (period) {
    url += `?period=${typeof period === "string" ? period : period.period}`;

    if (period.startDate && period.endDate) {
      url += `&startDate=${period.startDate}&endDate=${period.endDate}`;
    }
  }

  const response = await axios.get(url, config);
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "profile", userData, config);

  if (response.data) {
    // Update user in localStorage with new data
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify({ ...user, ...response.data }));
  }

  return response.data;
};

// Change password
const changePassword = async (passwordData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "change-password",
    passwordData,
    config
  );
  return response.data;
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCleaners,
  getUserStats,
  updateProfile,
  changePassword,
};

export default userService;

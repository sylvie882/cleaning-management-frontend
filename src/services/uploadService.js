// services/uploadService.js
import axios from "axios";

const API_URL = "https://cleaning-management-backend.onrender.com";

// Get auth token from localStorage
const getAuthToken = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

// Create axios instance with auth header
const createAuthAxios = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Upload single image
export const uploadSingleImage = async (file) => {
  try {
    const token = getAuthToken();
    console.log("Token available:", !!token);
    console.log("File to upload:", file.name, file.size, file.type);

    const formData = new FormData();
    formData.append("image", file);

    const response = await createAuthAxios().post(
      "/api/upload/single",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Upload single image error:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await createAuthAxios().post(
      "/api/upload/multiple",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Upload multiple images error:", error);
    throw error;
  }
};

// Delete uploaded image
export const deleteUploadedImage = async (filename) => {
  try {
    const response = await createAuthAxios().delete(`/api/upload/${filename}`);
    return response.data;
  } catch (error) {
    console.error("Delete image error:", error);
    throw error;
  }
};

// Validate file before upload
export const validateImageFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPEG, PNG, GIF, and WebP images are allowed",
    };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "File size must be less than 5MB" };
  }

  return { isValid: true };
};

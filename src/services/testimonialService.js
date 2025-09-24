// src/services/testimonialService.js
import axios from "axios";

const API_URL = "https://cleaning-management-backend.onrender.com/api/testimonials/";

// Get all public testimonials
const getTestimonials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get featured testimonials
const getFeaturedTestimonials = async (limit = 5) => {
  const response = await axios.get(`${API_URL}featured?limit=${limit}`);
  return response.data;
};

// Get all testimonials (admin/manager)
const getAllTestimonials = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

// Get testimonial by ID
const getTestimonialById = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Create testimonial
const createTestimonial = async (testimonialData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, testimonialData, config);
  return response.data;
};

// Update testimonial
const updateTestimonial = async (id, testimonialData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, testimonialData, config);
  return response.data;
};

// Delete testimonial
const deleteTestimonial = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

// Approve testimonial
const approveTestimonial = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${id}/approve`, {}, config);
  return response.data;
};

// Get testimonials by client
const getClientTestimonials = async (clientId) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `client/${clientId}`, config);
  return response.data;
};

const testimonialService = {
  getTestimonials,
  getFeaturedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
  getClientTestimonials,
};

export default testimonialService;

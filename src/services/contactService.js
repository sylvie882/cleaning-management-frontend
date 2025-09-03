// src/services/contactService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/contact/";

// Send contact message (public)
const sendContactMessage = async (messageData) => {
  const response = await axios.post(API_URL, messageData);
  return response.data;
};

// Get all contact messages (admin only)
const getContactMessages = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get contact message by ID (admin only)
const getContactMessageById = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update contact message status (admin only)
const updateContactMessage = async (id, updateData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, updateData, config);
  return response.data;
};

// Delete contact message (admin only)
const deleteContactMessage = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const contactService = {
  sendContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
};

export default contactService;

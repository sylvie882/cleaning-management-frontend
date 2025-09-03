// src/services/notificationService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/notifications/";

// Create notification (public or can be secured based on requirements)
const createNotification = async (notificationData) => {
  const response = await axios.post(API_URL, notificationData);
  return response.data;
};

// Get all notifications (admin only)
const getNotifications = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get notification by ID (admin only)
const getNotificationById = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update notification (admin only)
const updateNotification = async (id, updateData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, updateData, config);
  return response.data;
};

// Mark notification as read (can be admin or user based on implementation)
const markAsRead = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + id + "/read", {}, config);
  return response.data;
};

// Mark all notifications as read (can be admin or user based on implementation)
const markAllAsRead = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + "read-all", {}, config);
  return response.data;
};

// Delete notification (admin only)
const deleteNotification = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

// Get unread notifications count (can be admin or user based on implementation)
const getUnreadCount = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "unread/count", config);
  return response.data;
};

const notificationService = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};

export default notificationService;

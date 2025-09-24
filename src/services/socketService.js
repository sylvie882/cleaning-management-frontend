// src/services/socketService.js
import { io } from "socket.io-client";
import { store } from "../store";

import { createNotification } from "../features//notification/notificationSlice";

let socket;

/**
 * Initialize socket connection
 * @returns {object|null} The socket instance or null if connection fails
 */
const initSocketConnection = () => {
  // Get token from auth state
  const token = store.getState().auth.user?.token;

  if (!token) {
    console.error("Cannot initialize socket: No auth token available");
    return null;
  }

  // Connect to the socket server
  socket = io(
    import.meta.env.VITE_API_URL || "https://cleaning-management-backend.onrender.com",
    {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }
  );

  // Handle connection events
  socket.on("connect", () => {
    console.log("Socket connected successfully");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${reason}`);
  });

  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(`Socket reconnect attempt: ${attemptNumber}`);
  });

  socket.on("reconnect_failed", () => {
    console.error("Socket reconnection failed after maximum attempts");
  });

  // Handle notifications
  socket.on("notification", (notification) => {
    console.log("Received notification:", notification);
    store.dispatch(createNotification(notification));

    // Show browser notification if permitted
    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/logo.png",
      });
    }
  });

  // Handle booking updates
  socket.on("booking_update", (booking) => {
    console.log("Booking update received:", booking);
    // This event would typically trigger a Redux action to update the booking in the store
    // The specific action would depend on the user's role and current view
  });

  // Handle task assignments
  socket.on("task_assigned", (task) => {
    console.log("New task assigned:", task);
    // This would typically trigger a notification and update the task list
  });

  // Handle payment verifications
  socket.on("payment_verified", (payment) => {
    console.log("Payment verification update:", payment);
    // This would update the payment status in the store if relevant
  });

  return socket;
};

/**
 * Disconnect the socket
 */
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected by client");
  }
};

/**
 * Get the socket instance
 * @returns {object|null} The socket instance or null if not connected
 */
const getSocket = () => socket;

/**
 * Join a room
 * @param {string} room - Room name to join
 */
const joinRoom = (room) => {
  if (socket) {
    socket.emit("join_room", room);
    console.log(`Joined room: ${room}`);
  }
};

/**
 * Leave a room
 * @param {string} room - Room name to leave
 */
const leaveRoom = (room) => {
  if (socket) {
    socket.emit("leave_room", room);
    console.log(`Left room: ${room}`);
  }
};

/**
 * Send a message to a specific room
 * @param {string} room - Target room
 * @param {string} event - Event name
 * @param {any} data - Data to send
 */
const sendToRoom = (room, event, data) => {
  if (socket) {
    socket.emit("room_message", { room, event, data });
  }
};

/**
 * Subscribe to booking updates
 * @param {string} bookingId - ID of the booking to subscribe to
 */
const subscribeToBooking = (bookingId) => {
  if (socket) {
    socket.emit("subscribe_booking", bookingId);
    console.log(`Subscribed to booking updates: ${bookingId}`);
  }
};

/**
 * Unsubscribe from booking updates
 * @param {string} bookingId - ID of the booking to unsubscribe from
 */
const unsubscribeFromBooking = (bookingId) => {
  if (socket) {
    socket.emit("unsubscribe_booking", bookingId);
    console.log(`Unsubscribed from booking updates: ${bookingId}`);
  }
};

/**
 * Subscribe to cleaner updates
 * @param {string} cleanerId - ID of the cleaner to subscribe to
 */
const subscribeToCleaner = (cleanerId) => {
  if (socket) {
    socket.emit("subscribe_cleaner", cleanerId);
    console.log(`Subscribed to cleaner updates: ${cleanerId}`);
  }
};

/**
 * Unsubscribe from cleaner updates
 * @param {string} cleanerId - ID of the cleaner to unsubscribe from
 */
const unsubscribeFromCleaner = (cleanerId) => {
  if (socket) {
    socket.emit("unsubscribe_cleaner", cleanerId);
    console.log(`Unsubscribed from cleaner updates: ${cleanerId}`);
  }
};

/**
 * Send booking status update
 * @param {string} bookingId - ID of the booking to update
 * @param {string} status - New status
 * @param {object} additionalData - Additional data to send with the update
 */
const sendBookingUpdate = (bookingId, status, additionalData = {}) => {
  if (socket) {
    socket.emit("update_booking", {
      bookingId,
      status,
      ...additionalData,
      timestamp: new Date(),
    });
  }
};

/**
 * Send GPS location update (for cleaners)
 * @param {string} cleanerId - ID of the cleaner
 * @param {object} location - GPS coordinates { lat, lng }
 */
const sendLocationUpdate = (cleanerId, location) => {
  if (socket && location && location.lat && location.lng) {
    socket.emit("update_location", {
      cleanerId,
      location,
      timestamp: new Date(),
    });
  }
};

const socketService = {
  initSocketConnection,
  disconnectSocket,
  getSocket,
  joinRoom,
  leaveRoom,
  sendToRoom,
  subscribeToBooking,
  unsubscribeFromBooking,
  subscribeToCleaner,
  unsubscribeFromCleaner,
  sendBookingUpdate,
  sendLocationUpdate,
};

export default socketService;

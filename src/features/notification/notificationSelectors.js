// src/features/notification/notificationSelectors.js
// Select all notifications
export const selectAllNotifications = (state) =>
  state.notification.notifications;

// Select current notification
export const selectCurrentNotification = (state) =>
  state.notification.currentNotification;

// Select notification loading state
export const selectNotificationLoading = (state) =>
  state.notification.isLoading;

// Select notification success state
export const selectNotificationSuccess = (state) =>
  state.notification.isSuccess;

// Select notification error state
export const selectNotificationError = (state) => state.notification.isError;

// Select notification error message
export const selectNotificationErrorMessage = (state) =>
  state.notification.errorMessage;

// Select unread notifications
export const selectUnreadNotifications = (state) =>
  state.notification.notifications.filter((notification) => !notification.read);

// Select read notifications
export const selectReadNotifications = (state) =>
  state.notification.notifications.filter((notification) => notification.read);

// Select notifications by type
export const selectNotificationsByType = (type) => (state) =>
  state.notification.notifications.filter(
    (notification) => notification.type === type
  );

// Select notification by ID
export const selectNotificationById = (id) => (state) =>
  state.notification.notifications.find(
    (notification) => notification._id === id
  );

// Select total unread notifications count
export const selectUnreadNotificationsCount = (state) =>
  state.notification.notifications.filter((notification) => !notification.read)
    .length;

// Select recent notifications (last 7 days)
export const selectRecentNotifications = (state) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return state.notification.notifications.filter(
    (notification) => new Date(notification.createdAt) >= sevenDaysAgo
  );
};

// Select priority notifications
export const selectPriorityNotifications = (state) =>
  state.notification.notifications.filter(
    (notification) => notification.priority === "high"
  );

// Select notifications by status
export const selectNotificationsByStatus = (status) => (state) =>
  state.notification.notifications.filter(
    (notification) => notification.status === status
  );

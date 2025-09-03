// src/features/contact/contactSelectors.js

// Select all contact messages
export const selectAllContactMessages = (state) => state.contact.messages;

// Select current contact message
export const selectCurrentContactMessage = (state) => state.contact.message;

// Select contact loading state
export const selectContactLoading = (state) => state.contact.isLoading;

// Select contact success state
export const selectContactSuccess = (state) => state.contact.isSuccess;

// Select contact error state
export const selectContactError = (state) => state.contact.isError;

// Select contact error message
export const selectContactErrorMessage = (state) => state.contact.errorMessage;

// Select unread contact messages
export const selectUnreadContactMessages = (state) =>
  state.contact.messages.filter((message) => !message.read);

// Select read contact messages
export const selectReadContactMessages = (state) =>
  state.contact.messages.filter((message) => message.read);

// Select contact messages by status
export const selectContactMessagesByStatus = (status) => (state) =>
  state.contact.messages.filter((message) => message.status === status);

// Select contact message by ID
export const selectContactMessageById = (id) => (state) =>
  state.contact.messages.find((message) => message._id === id);

// Select total unread messages count
export const selectUnreadMessagesCount = (state) =>
  state.contact.messages.filter((message) => !message.read).length;

// Select recent contact messages (last 30 days)
export const selectRecentContactMessages = (state) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return state.contact.messages.filter(
    (message) => new Date(message.createdAt) >= thirtyDaysAgo
  );
};

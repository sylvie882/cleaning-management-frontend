// src/features/notification/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../services/notificationService";

const initialState = {
  notifications: [],
  currentNotification: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Send notification (public or admin based on implementation)
export const createNotification = createAsyncThunk(
  "notification/create",
  async (notificationData, thunkAPI) => {
    try {
      return await notificationService.createNotification(notificationData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all notifications (admin only)
export const getNotifications = createAsyncThunk(
  "notification/getAll",
  async (_, thunkAPI) => {
    try {
      return await notificationService.getNotifications();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get notification by ID (admin only)
export const getNotificationById = createAsyncThunk(
  "notification/getById",
  async (id, thunkAPI) => {
    try {
      return await notificationService.getNotificationById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update notification status (admin only)
export const updateNotification = createAsyncThunk(
  "notification/update",
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await notificationService.updateNotification(id, updateData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark notification as read (admin or user)
export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id, thunkAPI) => {
    try {
      return await notificationService.markAsRead(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark all notifications as read (admin or user)
export const markAllAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (_, thunkAPI) => {
    try {
      return await notificationService.markAllAsRead();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete notification (admin only)
export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (id, thunkAPI) => {
    try {
      return await notificationService.deleteNotification(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
    clearCurrentNotification: (state) => {
      state.currentNotification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create notification
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get all notifications
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get notification by ID
      .addCase(getNotificationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentNotification = action.payload;
      })
      .addCase(getNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update notification
      .addCase(updateNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = state.notifications.map((notification) =>
          notification._id === action.payload._id
            ? action.payload
            : notification
        );
        if (
          state.currentNotification &&
          state.currentNotification._id === action.payload._id
        ) {
          state.currentNotification = action.payload;
        }
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Mark as read
      .addCase(markAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = state.notifications.map((notification) =>
          notification._id === action.payload._id
            ? action.payload
            : notification
        );
        if (
          state.currentNotification &&
          state.currentNotification._id === action.payload._id
        ) {
          state.currentNotification = action.payload;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Mark all as read
      .addCase(markAllAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
        if (state.currentNotification) {
          const updatedNotification = action.payload.find(
            (notification) => notification._id === state.currentNotification._id
          );
          if (updatedNotification) {
            state.currentNotification = updatedNotification;
          }
        }
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== action.payload.id
        );
        if (
          state.currentNotification &&
          state.currentNotification._id === action.payload.id
        ) {
          state.currentNotification = null;
        }
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset, clearCurrentNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

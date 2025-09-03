// src/features/booking/bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "../../services/bookingService";

// Create a new booking (public)
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.createBooking(bookingData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get booking by ID and token (public)
export const getBookingByToken = createAsyncThunk(
  "booking/getByToken",
  async ({ id, token }, thunkAPI) => {
    try {
      return await bookingService.getBookingByToken(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Submit rating (public)
export const submitRating = createAsyncThunk(
  "booking/submitRating",
  async ({ id, token, ratingData }, thunkAPI) => {
    try {
      return await bookingService.submitRating(id, token, ratingData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve/reject budget (public - no authentication required)
export const approveBudget = createAsyncThunk(
  "booking/approveBudget",
  async ({ id, token, approved }, thunkAPI) => {
    try {
      return await bookingService.approveBudget(id, token, approved);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all bookings (for admin, head of cleaning, manager)
export const getAllBookings = createAsyncThunk(
  "booking/getAll",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getAllBookings();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get pending bookings (for head of cleaning)
export const getPendingBookings = createAsyncThunk(
  "booking/getPending",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getPendingBookings();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get bookings assigned to cleaner
export const getCleanerBookings = createAsyncThunk(
  "booking/getCleanerBookings",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getCleanerBookings();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update booking status (for head of cleaning)
export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      return await bookingService.updateBookingStatus(id, data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update cleaner progress
export const updateCleanerProgress = createAsyncThunk(
  "booking/updateProgress",
  async ({ id, data }, thunkAPI) => {
    try {
      return await bookingService.updateCleanerProgress(id, data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get booking statistics (for manager dashboard)
export const getBookingStats = createAsyncThunk(
  "booking/getStats",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getBookingStats();
      // src/features/booking/bookingSlice.js (continued)
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get specific booking by ID
export const getBookingById = createAsyncThunk(
  "booking/getById",
  async (id, thunkAPI) => {
    try {
      return await bookingService.getBookingById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getRecentBookings = createAsyncThunk(
  "booking/getRecent",
  async (limit = 5, thunkAPI) => {
    try {
      return await bookingService.getRecentBookings(limit);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  bookings: [],
  booking: null,
  bookingStats: null,
  recentBookings: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get booking by token
      .addCase(getBookingByToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingByToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(getBookingByToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Submit rating
      .addCase(submitRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitRating.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Approve budget
      .addCase(approveBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveBudget.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(approveBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get all bookings
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get pending bookings
      .addCase(getPendingBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPendingBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getPendingBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get cleaner bookings
      .addCase(getCleanerBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCleanerBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getCleanerBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update booking status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        // Update the booking in the bookings array if it exists
        if (state.bookings.length > 0) {
          state.bookings = state.bookings.map((booking) =>
            booking._id === action.payload._id ? action.payload : booking
          );
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update cleaner progress
      .addCase(updateCleanerProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCleanerProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        // Update the booking in the bookings array if it exists
        if (state.bookings.length > 0) {
          state.bookings = state.bookings.map((booking) =>
            booking._id === action.payload._id ? action.payload : booking
          );
        }
      })
      .addCase(updateCleanerProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get booking stats
      .addCase(getBookingStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookingStats = action.payload;
      })
      .addCase(getBookingStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get recent bookings
      .addCase(getRecentBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getRecentBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get booking by ID
      .addCase(getBookingById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;

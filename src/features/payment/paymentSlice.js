// src/features/payment/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../../services/paymentService";

// Get all payments
export const getPayments = createAsyncThunk(
  "payment/getAll",
  async (_, thunkAPI) => {
    try {
      return await paymentService.getPayments();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get payment by ID
export const getPaymentById = createAsyncThunk(
  "payment/getById",
  async (id, thunkAPI) => {
    try {
      return await paymentService.getPaymentById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Make a payment
export const makePayment = createAsyncThunk(
  "payment/make",
  async (paymentData, thunkAPI) => {
    try {
      return await paymentService.makePayment(paymentData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async ({ id, data }, thunkAPI) => {
    try {
      return await paymentService.verifyPayment(id, data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get payment statistics
export const getPaymentStats = createAsyncThunk(
  "payment/getStats",
  async (_, thunkAPI) => {
    try {
      return await paymentService.getPaymentStats();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get financial statistics
export const getFinancialStats = createAsyncThunk(
  "payment/getFinancialStats",
  async (period, thunkAPI) => {
    try {
      return await paymentService.getFinancialStats(period);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  payments: [],
  payment: null,
  paymentStats: null,
  financialStats: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const paymentSlice = createSlice({
  name: "payment",
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
      // Get all payments
      .addCase(getPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payments = action.payload;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get payment by ID
      .addCase(getPaymentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Make payment
      .addCase(makePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payment = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payment = action.payload;
        // Update payment in the payments array
        if (state.payments.length > 0) {
          state.payments = state.payments.map((payment) =>
            payment._id === action.payload._id ? action.payload : payment
          );
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get payment statistics
      .addCase(getPaymentStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentStats = action.payload;
      })
      .addCase(getPaymentStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get financial statistics
      .addCase(getFinancialStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFinancialStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.financialStats = action.payload;
      })
      .addCase(getFinancialStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;

// src/features/testimonial/testimonialSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testimonialService from "../../services/testimonialService";

const initialState = {
  testimonials: [],
  currentTestimonial: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Submit testimonial (public)
export const submitTestimonial = createAsyncThunk(
  "testimonial/submit",
  async (testimonialData, thunkAPI) => {
    try {
      return await testimonialService.submitTestimonial(testimonialData);
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

// Add alias for consistent naming with other features
export const addTestimonial = submitTestimonial;

// Get all testimonials (admin or public)
export const getTestimonials = createAsyncThunk(
  "testimonial/getAll",
  async (publicOnly = false, thunkAPI) => {
    try {
      return await testimonialService.getTestimonials(publicOnly);
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

// Get testimonial by ID (admin only)
export const getTestimonialById = createAsyncThunk(
  "testimonial/getById",
  async (id, thunkAPI) => {
    try {
      return await testimonialService.getTestimonialById(id);
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

// Update testimonial status (admin only)
export const updateTestimonial = createAsyncThunk(
  "testimonial/update",
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await testimonialService.updateTestimonial(id, updateData);
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

// Delete testimonial (admin only)
export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id, thunkAPI) => {
    try {
      return await testimonialService.deleteTestimonial(id);
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

// Get featured testimonials (public)
export const getFeaturedTestimonials = createAsyncThunk(
  "testimonial/getFeatured",
  async (_, thunkAPI) => {
    try {
      return await testimonialService.getFeaturedTestimonials();
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

// Toggle featured status (admin only)
export const toggleFeatured = createAsyncThunk(
  "testimonial/toggleFeatured",
  async (id, thunkAPI) => {
    try {
      return await testimonialService.toggleFeatured(id);
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

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
    clearCurrentTestimonial: (state) => {
      state.currentTestimonial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit testimonial
      .addCase(submitTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Only add to state if admin is logged in, as this is a public submission
        if (state.testimonials.length > 0) {
          state.testimonials.push(action.payload);
        }
      })
      .addCase(submitTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get all testimonials
      .addCase(getTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get testimonial by ID
      .addCase(getTestimonialById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestimonialById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentTestimonial = action.payload;
      })
      .addCase(getTestimonialById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update testimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = state.testimonials.map((testimonial) =>
          testimonial._id === action.payload._id ? action.payload : testimonial
        );
        if (
          state.currentTestimonial &&
          state.currentTestimonial._id === action.payload._id
        ) {
          state.currentTestimonial = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Delete testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial._id !== action.payload.id
        );
        if (
          state.currentTestimonial &&
          state.currentTestimonial._id === action.payload.id
        ) {
          state.currentTestimonial = null;
        }
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get featured testimonials
      .addCase(getFeaturedTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // If we already have a full list, don't override it
        if (state.testimonials.length <= action.payload.length) {
          state.testimonials = action.payload;
        }
      })
      .addCase(getFeaturedTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Toggle featured status
      .addCase(toggleFeatured.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleFeatured.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.testimonials = state.testimonials.map((testimonial) =>
          testimonial._id === action.payload._id ? action.payload : testimonial
        );
        if (
          state.currentTestimonial &&
          state.currentTestimonial._id === action.payload._id
        ) {
          state.currentTestimonial = action.payload;
        }
      })
      .addCase(toggleFeatured.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset, clearCurrentTestimonial } = testimonialSlice.actions;
export default testimonialSlice.reducer;

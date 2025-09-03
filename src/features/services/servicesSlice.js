// src/features/services/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceService from "../../services/serviceService";

// Get all services
export const getServices = createAsyncThunk(
  "services/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await serviceService.getServices();
      // Ensure we return an array
      return Array.isArray(response) ? response : response.data || [];
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get service by ID
export const getServiceById = createAsyncThunk(
  "services/getById",
  async (id, thunkAPI) => {
    try {
      const response = await serviceService.getServiceById(id);
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create service
export const createService = createAsyncThunk(
  "services/create",
  async (serviceData, thunkAPI) => {
    try {
      const response = await serviceService.createService(serviceData);
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, serviceData }, thunkAPI) => {
    try {
      const response = await serviceService.updateService(id, serviceData);
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, thunkAPI) => {
    try {
      const response = await serviceService.deleteService(id);
      // Return the ID for deletion
      return { id, ...response };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get featured services
export const getFeaturedServices = createAsyncThunk(
  "services/getFeatured",
  async (_, thunkAPI) => {
    try {
      const response = await serviceService.getFeaturedServices();
      // Ensure we return an array
      return Array.isArray(response) ? response : response.data || [];
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get services by category
export const getServicesByCategory = createAsyncThunk(
  "services/getByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await serviceService.getServicesByCategory(category);
      // Ensure we return an array
      return Array.isArray(response) ? response : response.data || [];
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  services: [],
  service: null,
  currentService: null,
  featuredServices: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.error = null;
    },
    clearService: (state) => {
      state.service = null;
      state.currentService = null;
    },
    clearCurrentService: (state) => {
      state.currentService = null;
      state.service = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all services
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        // Ensure services is always an array
        state.services = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
        state.services = []; // Reset to empty array on error
      })

      // Get service by ID
      .addCase(getServiceById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.service = action.payload;
        state.currentService = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
        state.service = null;
        state.currentService = null;
      })

      // Create service
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;

        // Ensure services is an array before pushing
        if (Array.isArray(state.services)) {
          state.services.push(action.payload);
        } else {
          state.services = [action.payload];
        }
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
      })

      // Update service
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.service = action.payload;
        state.currentService = action.payload;

        // Update the service in the services array
        if (Array.isArray(state.services)) {
          const index = state.services.findIndex(
            (service) => service._id === action.payload._id
          );
          if (index !== -1) {
            state.services[index] = action.payload;
          }
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
      })

      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;

        // Remove the deleted service from the services array
        if (Array.isArray(state.services)) {
          state.services = state.services.filter(
            (service) => service._id !== action.payload.id
          );
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
      })

      // Get featured services
      .addCase(getFeaturedServices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(getFeaturedServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        // Ensure featuredServices is always an array
        state.featuredServices = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getFeaturedServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
        state.featuredServices = []; // Reset to empty array on error
      })

      // Get services by category
      .addCase(getServicesByCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.message = "";
      })
      .addCase(getServicesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        // Ensure services is always an array
        state.services = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getServicesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.error = action.payload;
        state.services = []; // Reset to empty array on error
      });
  },
});

export const { reset, clearService, clearCurrentService } =
  servicesSlice.actions;
export default servicesSlice.reducer;

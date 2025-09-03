/* eslint-disable no-unused-vars */
// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";

// Get all users
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUsers();
      console.log("getUsers API response:", response);

      // Access response.users instead of response.data
      return Array.isArray(response.users) ? response.users : [];
    } catch (error) {
      console.error("getUsers error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  "users/getById",
  async (id, thunkAPI) => {
    try {
      const response = await userService.getUserById(id);
      console.log("getUserById API response:", response);
      return response.data || response;
    } catch (error) {
      console.error("getUserById error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.createUser(userData);
      console.log("createUser API response:", response);
      return response.data || response;
    } catch (error) {
      console.error("createUser error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log("updateUser called with ID:", id, "and data:", data);
      const response = await userService.updateUser(id, data);
      // console.log("updateUser API response:", response);
      return response.data || response;
    } catch (error) {
      console.error("updateUser error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const response = await userService.deleteUser(id);
      console.log("deleteUser API response:", response);
      // Return the ID for deletion
      return { id, ...response };
    } catch (error) {
      console.error("deleteUser error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get cleaners
// Get cleaners
export const getCleaners = createAsyncThunk(
  "users/getCleaners",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getCleaners();
      console.log("getCleaners API response:", response);

      // The API returns {users: Array, count: number, role: string}
      // We need to access response.users, not response.data
      return Array.isArray(response.users) ? response.users : [];
    } catch (error) {
      console.error("getCleaners error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user statistics
export const getUserStats = createAsyncThunk(
  "users/getStats",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUserStats();
      console.log("getUserStats API response:", response);
      return response.data || response;
    } catch (error) {
      console.error("getUserStats error:", error);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  users: [],
  user: null,
  cleaners: [],
  userStats: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        console.log("getUsers fulfilled payload:", action.payload);
        // Ensure users is always an array
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.users = []; // Reset to empty array on error
      })

      // Get user by ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        console.log("createUser fulfilled payload:", action.payload);

        // Ensure users is an array before pushing
        if (Array.isArray(state.users)) {
          state.users.push(action.payload);
        } else {
          console.warn(
            "state.users is not an array, reinitializing:",
            state.users
          );
          state.users = [action.payload];
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;

        console.log("updateUser fulfilled payload:", action.payload);

        // Update user in the users array
        if (Array.isArray(state.users) && state.users.length > 0) {
          const userIndex = state.users.findIndex((user) => {
            // Handle both direct user objects and nested user objects
            const userId =
              user._id ||
              user.id ||
              (user.user && (user.user._id || user.user.id));
            const payloadId = action.payload._id || action.payload.id;
            return userId === payloadId;
          });

          if (userIndex !== -1) {
            state.users[userIndex] = action.payload;
          }
        }

        // Update user in the cleaners array if it exists
        if (Array.isArray(state.cleaners) && state.cleaners.length > 0) {
          const cleanerIndex = state.cleaners.findIndex((cleaner) => {
            const cleanerId =
              cleaner._id ||
              cleaner.id ||
              (cleaner.user && (cleaner.user._id || cleaner.user.id));
            const payloadId = action.payload._id || action.payload.id;
            return cleanerId === payloadId;
          });

          if (cleanerIndex !== -1) {
            state.cleaners[cleanerIndex] = action.payload;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        console.log("deleteUser fulfilled payload:", action.payload);

        // Remove user from users array
        if (Array.isArray(state.users)) {
          state.users = state.users.filter((user) => {
            const userId =
              user._id ||
              user.id ||
              (user.user && (user.user._id || user.user.id));
            return userId !== action.payload.id;
          });
        }

        // Remove user from cleaners array if it exists
        if (Array.isArray(state.cleaners) && state.cleaners.length > 0) {
          state.cleaners = state.cleaners.filter((cleaner) => {
            const cleanerId =
              cleaner._id ||
              cleaner.id ||
              (cleaner.user && (cleaner.user._id || cleaner.user.id));
            return cleanerId !== action.payload.id;
          });
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Get cleaners
      .addCase(getCleaners.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getCleaners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        console.log("getCleaners fulfilled payload:", action.payload);

        // Ensure cleaners is always an array
        state.cleaners = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getCleaners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.cleaners = []; // Reset to empty array on error
      })

      // Get user statistics
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userStats = action.payload;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.userStats = null;
      });
  },
});

export const { reset, clearUser } = userSlice.actions;
export default userSlice.reducer;

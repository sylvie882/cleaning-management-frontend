// src/features/settings/settingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsService from "../../services/settingsService";

const initialState = {
  settings: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Get all settings
export const getSettings = createAsyncThunk(
  "settings/getAll",
  async (publicOnly = false, thunkAPI) => {
    try {
      return await settingsService.getSettings(publicOnly);
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

// Get settings by category
export const getSettingsByCategory = createAsyncThunk(
  "settings/getByCategory",
  async (category, thunkAPI) => {
    try {
      return await settingsService.getSettingsByCategory(category);
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

// Get setting by key
export const getSettingByKey = createAsyncThunk(
  "settings/getByKey",
  async (key, thunkAPI) => {
    try {
      return await settingsService.getSettingByKey(key);
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

// Update setting
export const updateSetting = createAsyncThunk(
  "settings/update",
  async ({ key, value }, thunkAPI) => {
    try {
      return await settingsService.updateSetting(key, value);
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

// Bulk update settings
export const bulkUpdateSettings = createAsyncThunk(
  "settings/bulkUpdate",
  async (settingsData, thunkAPI) => {
    try {
      return await settingsService.bulkUpdateSettings(settingsData);
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

// Delete setting
export const deleteSetting = createAsyncThunk(
  "settings/delete",
  async (key, thunkAPI) => {
    try {
      return await settingsService.deleteSetting(key);
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

// Reset settings to default
export const resetSettings = createAsyncThunk(
  "settings/reset",
  async (_, thunkAPI) => {
    try {
      return await settingsService.resetSettings();
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

// Export settings
export const exportSettings = createAsyncThunk(
  "settings/export",
  async (_, thunkAPI) => {
    try {
      const blob = await settingsService.exportSettings();
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "settings.json";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      return { success: true };
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

// Import settings
export const importSettings = createAsyncThunk(
  "settings/import",
  async (settingsFile, thunkAPI) => {
    try {
      return await settingsService.importSettings(settingsFile);
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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all settings
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get settings by category
      .addCase(getSettingsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettingsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Merge with existing settings, replacing any with the same key
        const existingKeys = new Set(
          action.payload.map((setting) => setting.key)
        );
        state.settings = [
          ...state.settings.filter((setting) => !existingKeys.has(setting.key)),
          ...action.payload,
        ];
      })
      .addCase(getSettingsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Get setting by key
      .addCase(getSettingByKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettingByKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Replace or add the setting
        const index = state.settings.findIndex(
          (s) => s.key === action.payload.key
        );
        if (index !== -1) {
          state.settings[index] = action.payload;
        } else {
          state.settings.push(action.payload);
        }
      })
      .addCase(getSettingByKey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Update setting
      .addCase(updateSetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Replace or add the updated setting
        const index = state.settings.findIndex(
          (s) => s.key === action.payload.key
        );
        if (index !== -1) {
          state.settings[index] = action.payload;
        } else {
          state.settings.push(action.payload);
        }
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Bulk update settings
      .addCase(bulkUpdateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bulkUpdateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Replace all settings with the updated ones
        state.settings = action.payload;
      })
      .addCase(bulkUpdateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Delete setting
      .addCase(deleteSetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the deleted setting
        state.settings = state.settings.filter(
          (setting) => setting.key !== action.payload.key
        );
      })
      .addCase(deleteSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Reset settings
      .addCase(resetSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.settings = action.payload;
      })
      .addCase(resetSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Export settings
      .addCase(exportSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportSettings.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // No state update needed as we just downloaded a file
      })
      .addCase(exportSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Import settings
      .addCase(importSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.settings = action.payload;
      })
      .addCase(importSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = settingsSlice.actions;
export default settingsSlice.reducer;

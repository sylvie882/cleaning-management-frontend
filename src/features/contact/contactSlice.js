/* eslint-disable no-unused-vars */
// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "../../services/contactService";

// Send contact message
export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      return await contactService.sendContactMessage(messageData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all contact messages (admin only)
export const getContactMessages = createAsyncThunk(
  "contact/getAll",
  async (_, thunkAPI) => {
    try {
      return await contactService.getContactMessages();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get contact message by ID (admin only)
export const getContactMessageById = createAsyncThunk(
  "contact/getById",
  async (id, thunkAPI) => {
    try {
      return await contactService.getContactMessageById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update contact message status (admin only)
export const updateContactMessage = createAsyncThunk(
  "contact/update",
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await contactService.updateContactMessage(id, updateData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete contact message (admin only)
export const deleteContactMessage = createAsyncThunk(
  "contact/delete",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteContactMessage(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  messages: [],
  message: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const contactSlice = createSlice({
  name: "contact",
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
      // Send contact message
      .addCase(sendContactMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Get all contact messages
      .addCase(getContactMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(getContactMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Get contact message by ID
      .addCase(getContactMessageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getContactMessageById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Update contact message
      .addCase(updateContactMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        // Update the message in the messages array
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(updateContactMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Delete contact message
      .addCase(deleteContactMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Remove the deleted message from the messages array
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload.id
        );
      })
      .addCase(deleteContactMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;

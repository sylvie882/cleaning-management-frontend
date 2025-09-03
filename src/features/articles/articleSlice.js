/* eslint-disable no-unused-vars */
// src/features/articles/articleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articleService from "../../services/articleService";

// Async thunks
export const createArticle = createAsyncThunk(
  "articles/create",
  async (articleData, thunkAPI) => {
    try {
      const response = await articleService.createArticle(articleData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllArticles = createAsyncThunk(
  "articles/getAll",
  async (params, thunkAPI) => {
    try {
      const response = await articleService.getAllArticles(params);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticleById = createAsyncThunk(
  "articles/getById",
  async (id, thunkAPI) => {
    try {
      const response = await articleService.getArticleById(id);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticleBySlug = createAsyncThunk(
  "articles/getBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await articleService.getArticleBySlug(slug);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/update",
  async ({ id, articleData }, thunkAPI) => {
    try {
      const response = await articleService.updateArticle(id, articleData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (id, thunkAPI) => {
    try {
      await articleService.deleteArticle(id);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const toggleArticleStatus = createAsyncThunk(
  "articles/toggleStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await articleService.toggleArticleStatus(id, status);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addComment = createAsyncThunk(
  "articles/addComment",
  async ({ id, commentData }, thunkAPI) => {
    try {
      const response = await articleService.addComment(id, commentData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticleStats = createAsyncThunk(
  "articles/getStats",
  async (_, thunkAPI) => {
    try {
      const response = await articleService.getArticleStats();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRelatedArticles = createAsyncThunk(
  "articles/getRelated",
  async ({ id, limit }, thunkAPI) => {
    try {
      const response = await articleService.getRelatedArticles(id, limit);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  articles: [],
  currentArticle: null,
  relatedArticles: [],
  stats: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    status: "",
    category: "",
    search: "",
    tags: "",
  },
};

// Slice
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        category: "",
        search: "",
        tags: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Article
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles.unshift(action.payload.data);
        state.message = "Article created successfully";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All Articles
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Article By ID
      .addCase(getArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentArticle = action.payload.data;
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Article By Slug
      .addCase(getArticleBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticleBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentArticle = action.payload.data;
      })
      .addCase(getArticleBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Article
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.articles.findIndex(
          (article) => article._id === action.payload.data._id
        );
        if (index !== -1) {
          state.articles[index] = action.payload.data;
        }
        if (
          state.currentArticle &&
          state.currentArticle._id === action.payload.data._id
        ) {
          state.currentArticle = action.payload.data;
        }
        state.message = "Article updated successfully";
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Article
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = state.articles.filter(
          (article) => article._id !== action.payload
        );
        if (
          state.currentArticle &&
          state.currentArticle._id === action.payload
        ) {
          state.currentArticle = null;
        }
        state.message = "Article deleted successfully";
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Toggle Article Status
      .addCase(toggleArticleStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleArticleStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.articles.findIndex(
          (article) => article._id === action.payload.data._id
        );
        if (index !== -1) {
          state.articles[index] = action.payload.data;
        }
        if (
          state.currentArticle &&
          state.currentArticle._id === action.payload.data._id
        ) {
          state.currentArticle = action.payload.data;
        }
        state.message = `Article ${action.payload.data.status} successfully`;
      })
      .addCase(toggleArticleStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Comment added successfully";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Article Stats
      .addCase(getArticleStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticleStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload.data;
      })
      .addCase(getArticleStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Related Articles
      .addCase(getRelatedArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelatedArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.relatedArticles = action.payload.data;
      })
      .addCase(getRelatedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCurrentArticle, setFilters, clearFilters } =
  articleSlice.actions;
export default articleSlice.reducer;

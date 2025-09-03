// src/services/articleService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/articles";

// Get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Create axios instance with auth header
const createAuthInstance = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Create a new article
const createArticle = async (articleData) => {
  const instance = createAuthInstance();
  const response = await instance.post("/", articleData);
  return response;
};

// Get all articles with optional filters
const getAllArticles = async (params = {}) => {
  const instance = createAuthInstance();
  const response = await instance.get("/", { params });
  return response;
};

// Get article by ID
const getArticleById = async (id) => {
  const instance = createAuthInstance();
  const response = await instance.get(`/${id}`);
  return response;
};

// Get article by slug (public route)
const getArticleBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/public/slug/${slug}`);
  return response;
};

// Update article
const updateArticle = async (id, articleData) => {
  const instance = createAuthInstance();
  const response = await instance.put(`/${id}`, articleData);
  return response;
};

// Delete article
const deleteArticle = async (id) => {
  const instance = createAuthInstance();
  const response = await instance.delete(`/${id}`);
  return response;
};

// Toggle article status
const toggleArticleStatus = async (id, status) => {
  const instance = createAuthInstance();
  const response = await instance.patch(`/${id}/status`, { status });
  return response;
};

// Add comment to article (public route)
const addComment = async (id, commentData) => {
  const response = await axios.post(
    `${API_URL}/public/${id}/comments`,
    commentData
  );
  return response;
};

// Get article statistics
const getArticleStats = async () => {
  const instance = createAuthInstance();
  const response = await instance.get("/stats");
  return response;
};

// Get related articles (public route)
const getRelatedArticles = async (id, limit = 5) => {
  const response = await axios.get(`${API_URL}/public/related/${id}`, {
    params: { limit },
  });
  return response;
};

// Upload image for article
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const token = getAuthToken();
  const response = await axios.post(`${API_URL}/upload-image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// Search articles
const searchArticles = async (query, filters = {}) => {
  const instance = createAuthInstance();
  const response = await instance.get("/", {
    params: {
      search: query,
      ...filters,
    },
  });
  return response;
};

// Get articles by category
const getArticlesByCategory = async (category, params = {}) => {
  const instance = createAuthInstance();
  const response = await instance.get("/", {
    params: {
      category,
      ...params,
    },
  });
  return response;
};

// Get articles by author
const getArticlesByAuthor = async (authorId, params = {}) => {
  const instance = createAuthInstance();
  const response = await instance.get("/", {
    params: {
      author: authorId,
      ...params,
    },
  });
  return response;
};

// Get articles by tags
const getArticlesByTags = async (tags, params = {}) => {
  const instance = createAuthInstance();
  const response = await instance.get("/", {
    params: {
      tags,
      ...params,
    },
  });
  return response;
};

// Bulk operations
const bulkUpdateArticles = async (articleIds, updateData) => {
  const instance = createAuthInstance();
  const response = await instance.patch("/bulk-update", {
    articleIds,
    updateData,
  });
  return response;
};

const bulkDeleteArticles = async (articleIds) => {
  const instance = createAuthInstance();
  const response = await instance.delete("/bulk-delete", {
    data: { articleIds },
  });
  return response;
};

const bulkPublishArticles = async (articleIds) => {
  const instance = createAuthInstance();
  const response = await instance.patch("/bulk-publish", {
    articleIds,
  });
  return response;
};

// Export functions
const articleService = {
  createArticle,
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  toggleArticleStatus,
  addComment,
  getArticleStats,
  getRelatedArticles,
  uploadImage,
  searchArticles,
  getArticlesByCategory,
  getArticlesByAuthor,
  getArticlesByTags,
  bulkUpdateArticles,
  bulkDeleteArticles,
  bulkPublishArticles,
};

export default articleService;

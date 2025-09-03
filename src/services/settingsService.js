// src/services/settingsService.js
import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/settings/";

// Get all settings (public can access public settings, admin can access all)
const getSettings = async (publicOnly = false) => {
  if (publicOnly) {
    const response = await axios.get(API_URL + "public");
    return response.data;
  } else {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
  }
};

// Get settings by category
const getSettingsByCategory = async (category) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "category/" + category, config);
  return response.data;
};

// Get setting by key
const getSettingByKey = async (key) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "key/" + key, config);
  return response.data;
};

// Create or update setting (admin only)
const updateSetting = async (key, value) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + key, { value }, config);
  return response.data;
};

// Bulk update settings (admin only)
const bulkUpdateSettings = async (settingsData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "bulk",
    { settings: settingsData },
    config
  );
  return response.data;
};

// Delete setting (admin only)
const deleteSetting = async (key) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + key, config);
  return response.data;
};

// Reset settings to default (admin only)
const resetSettings = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "reset", {}, config);
  return response.data;
};

// Export settings (admin only)
const exportSettings = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };

  const response = await axios.get(API_URL + "export", config);
  return response.data;
};

// Import settings (admin only)
const importSettings = async (settingsFile) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const formData = new FormData();
  formData.append("settings", settingsFile);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(API_URL + "import", formData, config);
  return response.data;
};

const settingsService = {
  getSettings,
  getSettingsByCategory,
  getSettingByKey,
  updateSetting,
  bulkUpdateSettings,
  deleteSetting,
  resetSettings,
  exportSettings,
  importSettings,
};

export default settingsService;

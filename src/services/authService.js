import axios from "axios";

const API_URL = "https://sylvie-kg23.onrender.com/api/auth/";

// Login user
const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", { email, password });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Change password
const changePassword = async (userId, currentPassword, newPassword) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${userId}/password`,
    { currentPassword, newPassword },
    config
  );

  return response.data;
};

const updateProfile = async (userId, profileData) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // If the profileData contains a profile image as a File object, we'll need to use FormData
  if (profileData.profileImage instanceof File) {
    const formData = new FormData();

    // Add all other fields to the formData
    Object.keys(profileData).forEach((key) => {
      if (key === "profileImage") {
        formData.append("profileImage", profileData.profileImage);
      } else {
        formData.append(key, profileData[key]);
      }
    });

    config.headers["Content-Type"] = "multipart/form-data";

    const response = await axios.put(
      `${API_URL}${userId}/profile`,
      formData,
      config
    );

    return response.data;
  }

  // If there's no file upload, use regular JSON
  const response = await axios.put(
    `${API_URL}${userId}/profile`,
    profileData,
    config
  );

  return response.data;
};

// Add this to your exported service object
const authService = {
  login,
  logout,
  changePassword,
  updateProfile, // Add this line
  // other methods...
};
export default authService;

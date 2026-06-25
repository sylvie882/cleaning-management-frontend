/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "https://api.sylviecleaningservices.com/api/v1/services";
// const LOCAL_API_URL = "http://localhost:8000/api/v1/services";

// Helper function to clean HTML, markdown, and format text properly
const cleanText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  let cleaned = text
    // Remove HTML tags
    .replace(/<[^>]*>/g, ' ')
    // Remove markdown headers (###, ####, etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove markdown links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove multiple line breaks
    .replace(/\n\s*\n/g, ' ')
    .replace(/\n/g, ' ')
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  // Remove if it's just a number or single character
  if (cleaned.length <= 2 && /^\d+$/.test(cleaned)) {
    return '';
  }
  
  return cleaned;
};

// Extract a nice short title from description (first meaningful sentence)
const extractShortTitle = (description) => {
  if (!description) return '';
  
  const cleaned = cleanText(description);
  
  // Look for patterns like "### Title" or "**Title**" in original text
  const titleMatch = description.match(/^###\s+([^\n]+)/m);
  if (titleMatch) {
    return cleanText(titleMatch[1]);
  }
  
  const boldMatch = description.match(/^\*\*([^*]+)\*\*/m);
  if (boldMatch) {
    return cleanText(boldMatch[1]);
  }
  
  // Take first 60-80 characters as title
  const firstSentence = cleaned.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.length > 10) {
    return firstSentence.length > 80 
      ? firstSentence.substring(0, 80).trim() + '...'
      : firstSentence.trim();
  }
  
  // Fallback: take first 60 characters
  return cleaned.substring(0, 60).trim() + (cleaned.length > 60 ? '...' : '');
};

// Extract a clean, readable description (remove redundant title parts)
const extractCleanDescription = (description, title) => {
  if (!description) return '';
  
  let cleaned = cleanText(description);
  
  // Remove the title from beginning if it appears
  if (title && cleaned.toLowerCase().startsWith(title.toLowerCase())) {
    cleaned = cleaned.substring(title.length).trim();
  }
  
  // Remove any remaining markdown artifacts
  cleaned = cleaned
    .replace(/^[\d\-\\*•]+/gm, '') // Remove bullet points
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  // Limit description length for card view
  if (cleaned.length > 150) {
    cleaned = cleaned.substring(0, 150).trim() + '...';
  }
  
  return cleaned || "Professional cleaning service tailored to your needs.";
};

// Extract key features from description
const extractFeaturesFromDescription = (description) => {
  if (!description) return [];
  
  const features = [];
  
  // Look for bullet points or numbered lists
  const bulletPattern = /[•\-*]\s*([^\n•\-*]+)/g;
  const numberPattern = /\d+\.\s*([^\n\d]+)/g;
  const checkPattern = /✓\s*([^\n✓]+)/g;
  
  let match;
  
  // Extract bullet points
  while ((match = bulletPattern.exec(description)) !== null) {
    const feature = cleanText(match[1]);
    if (feature && feature.length > 5 && feature.length < 100) {
      features.push(feature);
    }
  }
  
  // Extract numbered items
  while ((match = numberPattern.exec(description)) !== null) {
    const feature = cleanText(match[1]);
    if (feature && feature.length > 5 && feature.length < 100) {
      features.push(feature);
    }
  }
  
  // Extract checkmark items
  while ((match = checkPattern.exec(description)) !== null) {
    const feature = cleanText(match[1]);
    if (feature && feature.length > 5 && feature.length < 100) {
      features.push(feature);
    }
  }
  
  // If no features found, extract key phrases
  if (features.length === 0) {
    const sentences = cleanText(description).split(/[.!?]/);
    for (const sentence of sentences.slice(0, 4)) {
      if (sentence.length > 10 && sentence.length < 100) {
        features.push(sentence.trim());
      }
    }
  }
  
  // Return unique features, max 4
  return [...new Set(features)].slice(0, 4);
};

// Clean features array from API
const cleanFeatures = (features, description) => {
  if (features && Array.isArray(features) && features.length > 0) {
    return features
      .map(f => cleanText(f))
      .filter(f => f && f.length > 0 && f.length > 5)
      .slice(0, 4);
  }
  
  // Extract from description if no features array
  return extractFeaturesFromDescription(description);
};

// Clean the entire service object with nice formatting
const cleanServiceData = (service) => {
  if (!service) return service;
  
  const cleanedDescription = cleanText(service.description);
  const shortTitle = extractShortTitle(service.description);
  const niceDescription = extractCleanDescription(service.description, shortTitle);
  const extractedFeatures = cleanFeatures(service.features, service.description);
  
  return {
    ...service,
    // Original data
    originalDescription: service.description,
    originalFeatures: service.features,
    
    // Cleaned and formatted data for display
    title: shortTitle || service.name,
    displayTitle: (shortTitle || service.name).substring(0, 50),
    description: niceDescription,
    fullDescription: cleanedDescription,
    features: extractedFeatures,
    
    // Additional formatted fields
    shortDescription: niceDescription.length > 100 
      ? niceDescription.substring(0, 100).trim() + '...'
      : niceDescription,
    
    // For card display
    cardTitle: (shortTitle || service.name).substring(0, 40),
    cardDescription: niceDescription.substring(0, 120),
  };
};

// Get all services with cleaned and formatted data
const getServices = async () => {
  const response = await axios.get(API_URL);
  
  // Clean and format the service data in the response
  if (response.data && response.data.data && Array.isArray(response.data.data)) {
    response.data.data = response.data.data.map(cleanServiceData);
  } else if (Array.isArray(response.data)) {
    response.data = response.data.map(cleanServiceData);
  } else if (response.data && response.data.services && Array.isArray(response.data.services)) {
    response.data.services = response.data.services.map(cleanServiceData);
  }
  
  return response.data;
};

// Get service by ID with cleaned and formatted data
const getServiceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  
  // Clean and format the single service data
  if (response.data && response.data.data) {
    response.data.data = cleanServiceData(response.data.data);
  } else if (response.data) {
    response.data = cleanServiceData(response.data);
  }
  
  console.log("Service fetched by ID:", response.data);
  return response.data;
};

// Create service (admin only) with proper error handling
const createService = async (serviceData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    console.log("Service Data being sent:", serviceData);
    console.log("YouTube videos in create:", serviceData.youtubeVideos);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(API_URL, serviceData, config);

    console.log("Service created successfully:", response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error("Create Service Error:");

    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Response Data:", error.response.data);

      // Throw the server error message for the UI to handle
      throw new Error(
        error.response.data?.message || `Server Error: ${error.response.status}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server");
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      // Something else happened (like localStorage issues)
      console.error("Error:", error.message);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

const updateService = async (id, serviceData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    console.log("=== UPDATE SERVICE DEBUG ===");
    console.log("Service ID:", id);
    console.log("Service Data being sent for update:", serviceData);
    console.log("YouTube videos in update:", serviceData.youtubeVideos);
    console.log("Images in update:", serviceData.images);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // FIXED: Use PUT instead of PATCH to match your backend route
    const response = await axios.put(`${API_URL}/${id}`, serviceData, config);

    console.log("Service updated successfully:", response.data);
    console.log(
      "Updated service YouTube videos:",
      response.data.data?.youtubeVideos
    );
    return response.data;
  } catch (error) {
    console.error("Update Service Error:");
    console.error("Error details:", error.response?.data);
    console.error("Service data that failed:", serviceData);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response Data:", error.response.data);
      throw new Error(
        error.response.data?.message || `Server Error: ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No response received from server");
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      console.error("Error:", error.message);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

// Delete service (admin only)
const deleteService = async (id) => {
  try {
    console.log("Attempting to delete service with ID:", id);

    // Check if user exists in localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      throw new Error("No user found in localStorage");
    }

    const parsedUser = JSON.parse(user);
    if (!parsedUser.token) {
      throw new Error("No token found in user data");
    }

    const token = parsedUser.token;
    console.log("Token retrieved successfully");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${API_URL}/${id}`;
    console.log("Making DELETE request to:", url);

    const response = await axios.delete(url, config);

    console.log("Delete service response:", response);
    console.log("Delete service response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in deleteService function:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    console.error("Full error object:", error);

    // Re-throw the error so it can be handled by Redux
    throw error;
  }
};

// Get featured services with cleaned and formatted data
const getFeaturedServices = async () => {
  const response = await axios.get(`${API_URL}/featured`);
  
  // Clean and format the featured services data
  if (response.data && response.data.data && Array.isArray(response.data.data)) {
    response.data.data = response.data.data.map(cleanServiceData);
  } else if (Array.isArray(response.data)) {
    response.data = response.data.map(cleanServiceData);
  }
  
  return response.data;
};

// Get services by category with cleaned and formatted data
const getServicesByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/category/${category}`);
  
  // Clean and format the services data by category
  if (response.data && response.data.data && Array.isArray(response.data.data)) {
    response.data.data = response.data.data.map(cleanServiceData);
  } else if (Array.isArray(response.data)) {
    response.data = response.data.map(cleanServiceData);
  }
  
  return response.data;
};

const serviceService = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getFeaturedServices,
  getServicesByCategory,
};

export default serviceService;
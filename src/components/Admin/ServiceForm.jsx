/* eslint-disable no-unused-vars */
// src/components/Admin/ServiceForm.jsx
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "./RichTextEditor";
import {
  formatContentForStorage,
  formatContentForDisplay,
} from "../../utils/markdownUtils";
import {
  uploadSingleImage,
  validateImageFile,
} from "../../services/uploadService";

const ServiceForm = ({ mode, service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    basePrice: "",
    duration: "15", // Changed default to 15 to meet minimum requirement
    category: "residential",
    isActive: true,
    images: [],
    youtubeVideos: [],
    features: [],
    requirements: [],
  });

  const [newFeature, setNewFeature] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newYouTubeUrl, setNewYouTubeUrl] = useState("");
  const [descriptionMode, setDescriptionMode] = useState("rich"); // 'rich' or 'preview'
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && service) {
      // Handle backward compatibility for services with single image
      let serviceImages = [];
      if (service.images && Array.isArray(service.images)) {
        serviceImages = service.images;
      } else if (service.image || service.imageUrl) {
        serviceImages = [service.image || service.imageUrl];
      }

      setFormData({
        name: service.name || "",
        description: formatContentForDisplay(service.description || "", false), // Convert markdown to HTML for editor
        price: service.price || service.basePrice || "",
        basePrice: service.basePrice || service.price || "",
        duration: service.duration || "15", // Ensure minimum 15
        category: service.category || "residential",
        isActive: service.isActive !== undefined ? service.isActive : true,
        images: serviceImages,
        youtubeVideos: service.youtubeVideos || [],
        features: service.features || [],
        requirements: service.requirements || [],
      });
    }
  }, [mode, service]);

  // Handle rich text editor content changes
  const handleDescriptionChange = (htmlContent) => {
    setFormData({
      ...formData,
      description: htmlContent,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;

    // Remove any whitespace
    url = url.trim();

    // Very permissive patterns to handle ALL YouTube URL formats
    const patterns = [
      // Standard youtube.com URLs with any parameters
      /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      // youtu.be short URLs
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      // youtube.com embed URLs
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      // youtube.com/v/ URLs
      /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      // Mobile youtube URLs
      /(?:m\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      // Gaming youtube URLs
      /(?:gaming\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      // Any other youtube format - catch all
      /(?:youtube.*\/.*v[=/])([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }

    // If no pattern matches but it's clearly a YouTube URL, generate a random ID for storage
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Extract any 11-character alphanumeric sequence that could be a video ID
      const fallbackMatch = url.match(/[a-zA-Z0-9_-]{11}/);
      if (fallbackMatch) {
        return fallbackMatch[0];
      }
      // Last resort: use the last 11 characters or generate a placeholder
      return (
        url
          .replace(/[^a-zA-Z0-9_-]/g, "")
          .slice(-11)
          .padStart(11, "0") || "placeholder01"
      );
    }

    return null;
  };

  // Helper function to get YouTube thumbnail
  const getYouTubeThumbnail = (videoId) => {
    if (!videoId)
      return "https://via.placeholder.com/320x180/ff0000/ffffff?text=YouTube+Video";
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Helper function to validate YouTube URL
  const isValidYouTubeUrl = (url) => {
    if (!url || typeof url !== "string") return false;

    const trimmedUrl = url.trim();

    // Very permissive validation - just check if it contains youtube
    const isYouTubeURL =
      trimmedUrl.includes("youtube.com") ||
      trimmedUrl.includes("youtu.be") ||
      trimmedUrl.includes("youtube"); // Even more permissive

    // Always return true if it looks like a YouTube URL
    return isYouTubeURL;
  };

  // Image management functions
  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()],
      });
      setNewImageUrl("");
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const moveImageUp = (index) => {
    if (index > 0) {
      const newImages = [...formData.images];
      [newImages[index], newImages[index - 1]] = [
        newImages[index - 1],
        newImages[index],
      ];
      setFormData({
        ...formData,
        images: newImages,
      });
    }
  };

  const moveImageDown = (index) => {
    if (index < formData.images.length - 1) {
      const newImages = [...formData.images];
      [newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index],
      ];
      setFormData({
        ...formData,
        images: newImages,
      });
    }
  };

  // File upload functions
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadSingleImage(file);
      if (response.success) {
        // Add the uploaded image URL to the images array
        setFormData({
          ...formData,
          images: [...formData.images, response.data.url],
        });
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image: " + response.message);
      }
    } catch (error) {
      console.error("Upload error:", error);

      // Check if it's an authentication error
      if (error.response?.status === 401) {
        alert(
          "Authentication failed. Please log in again and try uploading the image."
        );
      } else if (error.response?.status === 404) {
        alert(
          "Upload service not available. Please use the URL option to add images for now."
        );
      } else {
        alert(
          "Error uploading image. Please try using the URL option instead."
        );
      }
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // YouTube video management functions
  const addYouTubeVideo = () => {
    if (newYouTubeUrl.trim()) {
      const videoId =
        extractYouTubeVideoId(newYouTubeUrl.trim()) || "default_id";
      const videoData = {
        url: newYouTubeUrl.trim(),
        videoId: videoId,
        thumbnail: getYouTubeThumbnail(videoId),
        title: "", // Can be filled later
        description: "", // Can be filled later
      };

      setFormData({
        ...formData,
        youtubeVideos: [...formData.youtubeVideos, videoData],
      });
      setNewYouTubeUrl("");
    }
  };

  const removeYouTubeVideo = (index) => {
    setFormData({
      ...formData,
      youtubeVideos: formData.youtubeVideos.filter((_, i) => i !== index),
    });
  };

  const moveYouTubeVideoUp = (index) => {
    if (index > 0) {
      const newVideos = [...formData.youtubeVideos];
      [newVideos[index], newVideos[index - 1]] = [
        newVideos[index - 1],
        newVideos[index],
      ];
      setFormData({
        ...formData,
        youtubeVideos: newVideos,
      });
    }
  };

  const moveYouTubeVideoDown = (index) => {
    if (index < formData.youtubeVideos.length - 1) {
      const newVideos = [...formData.youtubeVideos];
      [newVideos[index], newVideos[index + 1]] = [
        newVideos[index + 1],
        newVideos[index],
      ];
      setFormData({
        ...formData,
        youtubeVideos: newVideos,
      });
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()],
      });
      setNewRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enhanced validation
    if (!formData.name?.trim()) {
      alert("Please enter a service name");
      return;
    }

    if (!formData.description?.trim()) {
      alert("Please enter a service description");
      return;
    }

    const duration = parseInt(formData.duration);
    if (isNaN(duration) || duration < 15) {
      alert("Duration must be at least 15 minutes");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    const price = parseFloat(formData.price || formData.basePrice);
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price");
      return;
    }

    // Format the data for submission
    const serviceData = {
      name: formData.name.trim(),
      description: formatContentForStorage(formData.description.trim(), true), // Convert HTML to markdown
      price: price,
      basePrice: price,
      duration: duration,
      category: formData.category,
      isActive: formData.isActive,
      images: formData.images,
      youtubeVideos: formData.youtubeVideos,
      features: formData.features,
      requirements: formData.requirements,
    };

    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Mode:", mode);
    console.log("Service ID:", service?._id);
    console.log("Submitting service data:", serviceData);

    if (mode === "create") {
      console.log("Creating new service...");
      onSubmit(serviceData);
    } else {
      // Include the service ID in the service data for updates
      const updateData = {
        ...serviceData,
        _id: service._id,
      };
      console.log("Updating service with ID:", service._id);
      console.log("Update data being sent:", updateData);
      onSubmit(updateData);
    }
  };

  const categoryOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "specialized", label: "Specialized" },
    { value: "move-in-out", label: "Move In/Out" },
    { value: "post-construction", label: "Post Construction" },
    { value: "house-cleaning", label: "House Cleaning" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-auto animate-fadeIn max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add New Service" : "Edit Service"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Service Name - Required Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g., Deep House Cleaning"
              />
            </div>

            {/* Enhanced Description - Required Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>

              {/* Mode Toggle */}
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setDescriptionMode(
                      descriptionMode === "rich" ? "preview" : "rich"
                    )
                  }
                  className="px-3 py-1 text-xs bg-blue-100 border border-blue-300 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  title={descriptionMode === "rich" ? "Preview" : "Edit"}
                >
                  {descriptionMode === "rich" ? "👁 Preview" : "✏️ Edit"}
                </button>
              </div>

              {/* Editor/Preview Area */}
              <div className="relative">
                {descriptionMode === "rich" ? (
                  <RichTextEditor
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Describe the service in detail with rich formatting..."
                  />
                ) : (
                  <div className="border border-gray-300 rounded-md p-4 min-h-[300px] bg-white prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          formatContentForDisplay(formData.description, true) ||
                          '<p class="text-gray-400">Preview will appear here...</p>',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Help Text */}
              <div className="mt-2 text-xs text-gray-500">
                <strong>Rich Text Editor:</strong> Use the toolbar above to
                format your text. You can create tables, add links, insert
                images, and format text with bold, italic, and headers.
              </div>
            </div>

            {/* Price and Duration - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="basePrice"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Base Price (Ksh) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Ksh</span>
                  </div>
                  <input
                    type="number"
                    id="basePrice"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="appearance-none block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duration (minutes) <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-1">(min. 15)</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="15"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="15"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category - Required Field */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Multiple Images Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Images
              </label>

              {/* Images Grid Display */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {formData.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      {/* Primary Image Badge */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
                          Primary
                        </div>
                      )}

                      {/* Image Preview */}
                      <div className="relative h-32 w-full rounded-md border border-gray-300 overflow-hidden mb-3">
                        <img
                          src={imageUrl}
                          alt={`Service image ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22200%22 height%3D%22150%22 viewBox%3D%220 0 200 150%22%3E%3Cpath fill%3D%22%23f0f0f0%22 d%3D%22M0 0h200v150H0z%22%2F%3E%3Cpath fill%3D%22%23ccc%22 d%3D%22M20 60h160v70H20z%22%2F%3E%3Ccircle fill%3D%22%23ccc%22 cx%3D%22100%22 cy%3D%2240%22 r%3D%2220%22%2F%3E%3Ctext x%3D%22100%22 y%3D%22100%22 text-anchor%3D%22middle%22 fill%3D%22%23999%22 font-size%3D%2212%22%3EImage Error%3C%2Ftext%3E%3C%2Fsvg%3E";
                          }}
                        />
                      </div>

                      {/* Image URL Display */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Image URL:</p>
                        <p
                          className="text-sm text-gray-900 break-all"
                          title={imageUrl}
                        >
                          {imageUrl.length > 50
                            ? `${imageUrl.substring(0, 50)}...`
                            : imageUrl}
                        </p>
                      </div>

                      {/* Controls for IMAGES */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => moveImageUp(index)}
                            disabled={index === 0}
                            className={`p-2 rounded-md ${
                              index === 0
                                ? "text-gray-300 cursor-not-allowed bg-gray-100"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                            title="Move up"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => moveImageDown(index)}
                            disabled={index === formData.images.length - 1}
                            className={`p-2 rounded-md ${
                              index === formData.images.length - 1
                                ? "text-gray-300 cursor-not-allowed bg-gray-100"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                            title="Move down"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
                            title="Remove image"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Image Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {formData.images.length === 0
                      ? "Add your first image"
                      : "Add another image"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload images from your device or add image URLs
                  </p>
                  <p className="mt-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    ⚠️ File upload may not be available yet. You can use image
                    URLs as an alternative.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* File Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload Image from Device
                    </label>

                    {/* Drag & Drop Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isUploading
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {isUploading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-8 w-8 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="ml-3 text-blue-600">
                            Uploading...
                          </span>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">
                              Drag and drop an image here, or{" "}
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                              >
                                browse files
                              </button>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF, WebP up to 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* URL Input Section */}
                  <div>
                    <label
                      htmlFor="newImageUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        id="newImageUrl"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/your-image.jpg"
                        className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addImage())
                        }
                      />
                      <button
                        type="button"
                        onClick={addImage}
                        disabled={!newImageUrl.trim()}
                        className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                          newImageUrl.trim()
                            ? "text-white bg-blue-600 hover:bg-blue-700"
                            : "text-gray-400 bg-gray-200 cursor-not-allowed"
                        }`}
                      >
                        Add Image
                      </button>
                    </div>
                  </div>

                  {/* Preview new image URL */}
                  {newImageUrl.trim() && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-700 mb-2">Preview:</p>
                      <div className="relative h-24 w-32 rounded-md border border-gray-300 overflow-hidden">
                        <img
                          src={newImageUrl}
                          alt="New image preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22128%22 height%3D%2296%22 viewBox%3D%220 0 128 96%22%3E%3Cpath fill%3D%22%23f0f0f0%22 d%3D%22M0 0h128v96H0z%22%2F%3E%3Cpath fill%3D%22%23ff6b6b%22 d%3D%22M10 30h108v40H10z%22%2F%3E%3Ctext x%3D%2264%22 y%3D%2255%22 text-anchor%3D%22middle%22 fill%3D%22white%22 font-size%3D%2210%22%3EInvalid URL%3C%2Ftext%3E%3C%2Fsvg%3E";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* YouTube Videos Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                YouTube Videos
              </label>

              {/* YouTube Videos Grid Display */}
              {formData.youtubeVideos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {formData.youtubeVideos.map((video, index) => (
                    <div
                      key={index}
                      className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      {/* Primary Video Badge */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
                          Primary Video
                        </div>
                      )}

                      {/* Video Thumbnail */}
                      <div className="relative h-32 w-full rounded-md border border-gray-300 overflow-hidden mb-3">
                        <img
                          src={video.thumbnail}
                          alt={`YouTube video ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/320x180/ff0000/ffffff?text=YouTube+Video";
                          }}
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600 bg-opacity-80 rounded-full p-3">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Video URL Display */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">
                          YouTube URL:
                        </p>
                        <p
                          className="text-sm text-gray-900 break-all"
                          title={video.url}
                        >
                          {video.url.length > 50
                            ? `${video.url.substring(0, 50)}...`
                            : video.url}
                        </p>
                      </div>

                      {/* Controls for YOUTUBE VIDEOS */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => moveYouTubeVideoUp(index)}
                            disabled={index === 0}
                            className={`p-2 rounded-md ${
                              index === 0
                                ? "text-gray-300 cursor-not-allowed bg-gray-100"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                            title="Move up"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => moveYouTubeVideoDown(index)}
                            disabled={
                              index === formData.youtubeVideos.length - 1
                            }
                            className={`p-2 rounded-md ${
                              index === formData.youtubeVideos.length - 1
                                ? "text-gray-300 cursor-not-allowed bg-gray-100"
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                            title="Move down"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeYouTubeVideo(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
                            title="Remove video"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New YouTube Video Section */}
              <div className="border-2 border-dashed border-red-300 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {formData.youtubeVideos.length === 0
                      ? "Add your first YouTube video"
                      : "Add another YouTube video"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add any YouTube video link - no restrictions!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="newYouTubeUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      YouTube Video URL (Any Format Accepted)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="newYouTubeUrl"
                        value={newYouTubeUrl}
                        onChange={(e) => setNewYouTubeUrl(e.target.value)}
                        placeholder="Paste any YouTube link here..."
                        className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addYouTubeVideo())
                        }
                      />
                      <button
                        type="button"
                        onClick={addYouTubeVideo}
                        disabled={!newYouTubeUrl.trim()}
                        className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                          newYouTubeUrl.trim()
                            ? "text-white bg-red-600 hover:bg-red-700"
                            : "text-gray-400 bg-gray-200 cursor-not-allowed"
                        }`}
                      >
                        Add Video
                      </button>
                    </div>
                  </div>

                  {/* Preview new YouTube video */}
                  {newYouTubeUrl.trim() && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-700 mb-2">Preview:</p>
                      <div className="relative h-24 w-32 rounded-md border border-gray-300 overflow-hidden">
                        <img
                          src={getYouTubeThumbnail(
                            extractYouTubeVideoId(newYouTubeUrl.trim())
                          )}
                          alt="YouTube video preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/128x96/ff0000/ffffff?text=YouTube+Video";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600 bg-opacity-80 rounded-full p-2">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Updated Help Text for YouTube */}
              <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      <strong>All YouTube URLs Accepted!</strong> You can paste
                      any YouTube link format - standard URLs, short links,
                      mobile links, embedded links, or any variation. The system
                      will automatically process and store your video.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                  >
                    <span className="flex-1 text-sm">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                  >
                    <span className="flex-1 text-sm">{requirement}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add a requirement..."
                    className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addRequirement())
                    }
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Active Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isActive" className="font-medium text-gray-700">
                  Active (available for booking)
                </label>
                <p className="text-gray-500">
                  Inactive services won't be visible to clients.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === "create" ? "Create Service" : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;

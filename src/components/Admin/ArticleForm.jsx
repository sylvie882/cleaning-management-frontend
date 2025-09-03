// src/components/Admin/ArticleForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Save,
  Eye,
  EyeOff,
  Upload,
  Tag,
  Hash,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  createArticle,
  updateArticle,
  reset,
} from "../../features/articles/articleSlice";
import {
  selectArticleLoading,
  selectArticleSuccess,
  selectArticleError,
  selectArticleMessage,
} from "../../features/articles/articleSelectors";
import { toast } from "react-toastify";

const ArticleForm = ({ mode, article, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectArticleLoading);
  const isSuccess = useSelector(selectArticleSuccess);
  const isError = useSelector(selectArticleError);
  const message = useSelector(selectArticleMessage);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    category: "cleaning-tips",
    tags: [],
    featuredImage: "",
    status: "draft",
    schemaType: "Article",
    structuredData: {},
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newTag, setNewTag] = useState("");
  const [seoScore, setSeoScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (mode === "edit" && article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        excerpt: article.excerpt || "",
        metaTitle: article.metaTitle || article.title || "",
        metaDescription: article.metaDescription || article.excerpt || "",
        keywords: article.keywords || [],
        category: article.category || "cleaning-tips",
        tags: article.tags || [],
        featuredImage: article.featuredImage || "",
        status: article.status || "draft",
        schemaType: article.schemaType || "Article",
        structuredData: article.structuredData || {},
      });
    }
  }, [mode, article]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      onClose();
    }
  }, [isError, isSuccess, message, dispatch, onClose]);

  // Calculate SEO score and word count
  useEffect(() => {
    let score = 0;
    const words = formData.content.trim().split(/\s+/).length;
    setWordCount(words);
    setReadingTime(Math.ceil(words / 200));

    // Title length (optimal: 50-60 characters)
    if (
      formData.title &&
      formData.title.length >= 30 &&
      formData.title.length <= 60
    ) {
      score += 20;
    } else if (formData.title && formData.title.length > 0) {
      score += 10;
    }

    // Meta description length (optimal: 150-160 characters)
    if (
      formData.metaDescription &&
      formData.metaDescription.length >= 120 &&
      formData.metaDescription.length <= 160
    ) {
      score += 20;
    } else if (
      formData.metaDescription &&
      formData.metaDescription.length > 0
    ) {
      score += 10;
    }

    // Content length (minimum 300 words for good SEO)
    if (words >= 300) {
      score += 20;
    } else if (words >= 150) {
      score += 10;
    }

    // Keywords presence
    if (formData.keywords && formData.keywords.length >= 3) {
      score += 15;
    } else if (formData.keywords && formData.keywords.length > 0) {
      score += 5;
    }

    // Featured image
    if (formData.featuredImage) {
      score += 10;
    }

    // Excerpt
    if (formData.excerpt && formData.excerpt.length >= 100) {
      score += 10;
    }

    // Tags
    if (formData.tags && formData.tags.length >= 3) {
      score += 5;
    }

    setSeoScore(Math.min(score, 100));
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (mode === "create") {
      dispatch(createArticle(formData));
    } else {
      dispatch(updateArticle({ id: article._id, articleData: formData }));
    }
  };

  const getSeoScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeoScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />;
    if (score >= 60) return <Clock className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const categories = [
    { value: "cleaning-tips", label: "Cleaning Tips" },
    { value: "eco-friendly-cleaning", label: "Eco-Friendly Cleaning" },
    { value: "commercial-cleaning", label: "Commercial Cleaning" },
    { value: "residential-cleaning", label: "Residential Cleaning" },
    { value: "cleaning-products", label: "Cleaning Products" },
    { value: "maintenance", label: "Maintenance" },
    { value: "health-safety", label: "Health & Safety" },
    { value: "industry-news", label: "Industry News" },
    { value: "company-updates", label: "Company Updates" },
    { value: "testimonials", label: "Testimonials" },
    { value: "how-to-guides", label: "How-To Guides" },
    { value: "seasonal-cleaning", label: "Seasonal Cleaning" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Create New Article" : "Edit Article"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* SEO Score */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  SEO Score
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 ${getSeoScoreColor(
                  seoScore
                )}`}
              >
                {getSeoScoreIcon(seoScore)}
                <span className="text-lg font-bold">{seoScore}%</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span>{wordCount} words</span>
              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter article title..."
                  maxLength={200}
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.title.length}/200 characters
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your article content here..."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary of the article..."
                  maxLength={300}
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.excerpt.length}/300 characters
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    handleInputChange("featuredImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddKeyword())
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add keyword..."
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Hash className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Tag className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              SEO Meta Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    handleInputChange("metaTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SEO title for search engines..."
                  maxLength={60}
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.metaTitle.length}/60 characters
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    handleInputChange("metaDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SEO description for search engines..."
                  maxLength={160}
                />
                <div className="mt-1 text-xs text-gray-500">
                  {formData.metaDescription.length}/160 characters
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {mode === "create" ? "Create Article" : "Update Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;

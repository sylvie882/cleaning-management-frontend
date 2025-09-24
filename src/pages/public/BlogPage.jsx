/* eslint-disable no-unused-vars */
// src/pages/public/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  Clock,
  Tag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  getAllArticles,
  getRelatedArticles,
} from "../../features/articles/articleSlice";
import {
  selectArticles,
  selectArticleLoading,
  selectArticlePagination,
  selectRelatedArticles,
} from "../../features/articles/articleSelectors";

const BlogPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticleLoading);
  const pagination = useSelector(selectArticlePagination);
  const relatedArticles = useSelector(selectRelatedArticles);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
    page: parseInt(searchParams.get("page")) || 1,
  });

  // SEO Metadata for blog page
  const seoData = {
    title: "Cleaning Tips & Articles | Sylvie Cleaning Services Blog",
    description: "Discover expert cleaning tips, industry insights, and best practices from Nairobi's top cleaning professionals. Learn how to keep your space spotless and healthy.",
    canonicalUrl: "https://www.sylviecleaningservices.com/blog",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/blog-social.jpg",
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road,Fox Close",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      }
    }
  };

  // Structured data for blog
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoData.canonicalUrl
    },
    "headline": seoData.title,
    "description": seoData.description,
    "image": seoData.socialImage,
    "publisher": {
      "@type": "Organization",
      "name": seoData.businessInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoData.businessInfo.logo
      }
    },
    "author": {
      "@type": "Organization",
      "name": seoData.businessInfo.name
    }
  };

  useEffect(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;
    if (filters.page > 1) params.page = filters.page;

    setSearchParams(params);

    dispatch(
      getAllArticles({
        status: "published",
        ...filters,
        limit: 9,
      })
    );
  }, [dispatch, filters, setSearchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      "cleaning-tips": "bg-blue-100 text-blue-800",
      "eco-friendly-cleaning": "bg-green-100 text-green-800",
      "commercial-cleaning": "bg-purple-100 text-purple-800",
      "residential-cleaning": "bg-orange-100 text-orange-800",
      "cleaning-products": "bg-yellow-100 text-yellow-800",
      maintenance: "bg-indigo-100 text-indigo-800",
      "health-safety": "bg-red-100 text-red-800",
      "industry-news": "bg-pink-100 text-pink-800",
      "company-updates": "bg-teal-100 text-teal-800",
      testimonials: "bg-cyan-100 text-cyan-800",
      "how-to-guides": "bg-lime-100 text-lime-800",
      "seasonal-cleaning": "bg-amber-100 text-amber-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          categoryColors[category] || "bg-gray-100 text-gray-800"
        }`}
      >
        {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    );
  };

  const categories = [
    { value: "", label: "All Categories" },
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

  if (isLoading && !articles.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.sylviecleaningservices.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with SEO-friendly heading structure */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cleaning Tips & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert cleaning tips, industry insights, and best practices
            to keep your space spotless and healthy.
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search blog articles"
                />
              </div>
            </div>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setFilters({ category: "", search: "", page: 1 });
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <>
            <section aria-labelledby="articles-heading">
              <h2 id="articles-heading" className="sr-only">Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {articles.map((article) => (
                  <article
                    key={article._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    {/* Featured Image */}
                    {article.featuredImage && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                          itemProp="image"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-3">
                        {getCategoryBadge(article.category)}
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <time dateTime={article.publishedAt || article.createdAt} itemProp="datePublished">
                            {formatDate(article.publishedAt || article.createdAt)}
                          </time>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link
                          to={`/blog/${article.slug}`}
                          className="hover:text-blue-600 transition-colors duration-200"
                          itemProp="url"
                        >
                          <span itemProp="headline">{article.title}</span>
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                        {article.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <User className="h-4 w-4 mr-1" />
                          <span itemProp="name">{article.author?.name || "Admin"}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span itemProp="interactionCount">{article.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{article.readingTime} min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              itemProp="keywords"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{article.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="mt-4">
                        <Link
                          to={`/blog/${article.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                          aria-label={`Read more about ${article.title}`}
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <nav aria-label="Pagination">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={!pagination.hasPrev}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    aria-label="Previous page"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          page === filters.page
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === filters.page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={!pagination.hasNext}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    aria-label="Next page"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
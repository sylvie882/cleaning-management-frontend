// src/pages/Public/ServiceDetailPage.jsx
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServiceById } from "../../features/services/servicesSlice";
import { formatContentForDisplay } from "../../utils/markdownUtils";
import { Helmet } from "react-helmet";

// Component to handle formatted description display
const FormattedDescription = ({ description, className = "" }) => {
  const htmlContent = formatContentForDisplay(description, false); // Convert markdown to HTML

  return (
    <div
      className={`prose prose-lg max-w-none text-gray-600 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

// Video Player Component
const VideoPlayer = ({ video, isActive, onPlay }) => {
  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;

    url = url.trim();

    const patterns = [
      /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /(?:m\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:gaming\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtube.*\/.*v[=/])([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = video.videoId || getYouTubeVideoId(video.url);

  if (!videoId) {
    return (
      <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <svg
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500">Video not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}${
          isActive ? "?autoplay=1" : ""
        }`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        onLoad={onPlay}
      />
    </div>
  );
};

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentService, isLoading, error } = useSelector(
    (state) => state.services
  );

  const [activeTab, setActiveTab] = useState("overview");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getServiceById(id));
    }
  }, [dispatch, id]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Extract YouTube video ID from URL with enhanced pattern matching
  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;

    url = url.trim();

    const patterns = [
      /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /(?:m\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:gaming\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtube.*\/.*v[=/])([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }

    return null;
  };

  // SEO Metadata for service detail page
  const getSeoData = () => {
    if (!currentService) return null;
    
    const service = currentService;
    const serviceName = service.name || "Cleaning Service";
    const serviceDescription = service.description 
      ? service.description.substring(0, 160) 
      : `Professional ${serviceName} services in Nairobi. Expert cleaning with eco-friendly products and guaranteed satisfaction.`;
    
    const serviceImage = service.images && service.images.length > 0 
      ? service.images[0] 
      : "https://www.sylviecleaningservices.com/services-social.jpg";
    
    const canonicalUrl = `https://www.sylviecleaningservices.com/services/${service.slug || service._id}`;
    
    return {
      title: `${serviceName} | Professional Cleaning Services Nairobi | Sylvie Cleaning`,
      description: serviceDescription,
      canonicalUrl: canonicalUrl,
      siteName: "Sylvie Cleaning Services",
      twitterHandle: "@sylviecleaning",
      socialImage: serviceImage,
      service: service,
      businessInfo: {
        name: "Sylvie Cleaning Services",
        url: "https://www.sylviecleaningservices.com",
        logo: "https://www.sylviecleaningservices.com/logo.png",
        phone: "+254726933261",
        address: {
          street: "Dale House, Rhapta Road Westlands",
          city: "Nairobi",
          state: "Nairobi",
          zip: "00100",
          country: "KE"
        }
      }
    };
  };

  // Structured data for service
  const getStructuredData = (seoData) => {
    if (!seoData || !seoData.service) return null;
    
    const service = seoData.service;
    const serviceName = service.name || "Cleaning Service";
    
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": seoData.description,
      "provider": {
        "@type": "Organization",
        "name": seoData.businessInfo.name,
        "url": seoData.businessInfo.url,
        "logo": {
          "@type": "ImageObject",
          "url": seoData.businessInfo.logo
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": seoData.businessInfo.address.street,
          "addressLocality": seoData.businessInfo.address.city,
          "addressRegion": seoData.businessInfo.address.state,
          "postalCode": seoData.businessInfo.address.zip,
          "addressCountry": seoData.businessInfo.address.country
        },
        "telephone": seoData.businessInfo.phone
      },
      "areaServed": "Nairobi, Kenya",
      "serviceType": serviceName,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KES",
        "description": serviceName
      }
    };
  };

  if (isLoading) {
    const seoData = {
      title: "Loading Service Details | Sylvie Cleaning Services",
      description: "Professional cleaning services in Nairobi. Expert cleaning with eco-friendly products and guaranteed satisfaction.",
      canonicalUrl: "https://www.sylviecleaningservices.com/services"
    };
    
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <link rel="canonical" href={seoData.canonicalUrl} />
        </Helmet>
        
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentService) {
    const seoData = {
      title: "Service Not Found | Sylvie Cleaning Services",
      description: "Professional cleaning services in Nairobi. Expert cleaning with eco-friendly products and guaranteed satisfaction.",
      canonicalUrl: "https://www.sylviecleaningservices.com/services"
    };
    
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <link rel="canonical" href={seoData.canonicalUrl} />
        </Helmet>
        
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-lg shadow-md p-12">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Service Not Found
            </h3>
            <p className="text-gray-500 mb-6">
              The service you're looking for doesn't exist or has been removed.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Go Back
              </button>
              <Link
                to="/services"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const service = currentService;
  const seoData = getSeoData();
  const structuredData = getStructuredData(seoData);

  // Function to convert old upload URLs to new format
  const convertImageUrl = (url) => {
    if (!url) return url;

    // Convert old /uploads/ URLs to new /images/services/ format
    if (url.includes("/uploads/") && !url.includes("/images/services/")) {
      return url.replace("/uploads/", "/images/services/");
    }

    return url;
  };

  // Use service images from backend, fallback to default
  const serviceImages =
    service.images && service.images.length > 0
      ? service.images.map(convertImageUrl)
      : [
          convertImageUrl(service.image) ||
            "https://picsum.photos/800/600?random=1",
        ];

  // Use YouTube videos from backend if available
  const serviceVideos =
    service.youtubeVideos && service.youtubeVideos.length > 0
      ? service.youtubeVideos.map((video, index) => ({
          id: index + 1,
          title: video.title || `${service.name} - Video ${index + 1}`,
          url: video.url,
          description:
            video.description ||
            `Watch our ${service.name?.toLowerCase()} process`,
          videoId: video.videoId,
        }))
      : [
          {
            id: 1,
            title: `Professional ${service.name} - Before & After`,
            url: "https://www.youtube.com/shorts/W8JF0rO5WyE",
            description: "Watch our team transform this space",
          },
          {
            id: 2,
            title: `${service.name} Process Walkthrough`,
            url: "https://www.youtube.com/shorts/Kw6f68X3HKg",
            description: "Step-by-step process demonstration",
          },
        ];

  // Determine if we should show videos instead of images
  const hasValidImages = serviceImages.some(
    (img) => img && img !== "https://picsum.photos/800/600?random=1"
  );
  const hasValidVideos = serviceVideos.some(
    (video) => video.videoId || getYouTubeVideoId(video.url)
  );

  // Show videos if no valid images, or if user toggles to videos
  const shouldShowVideos = !hasValidImages || showVideos;

  const serviceFAQs = service.faqs || [
    {
      question: `How long does ${service.name?.toLowerCase()} typically take?`,
      answer: `The duration of ${service.name?.toLowerCase()} depends on the size and condition of the space. On average, it takes ${
        service.duration >= 60
          ? `${Math.floor(service.duration / 60)} hour${
              Math.floor(service.duration / 60) > 1 ? "s" : ""
            }${
              service.duration % 60 > 0
                ? ` and ${service.duration % 60} minutes`
                : ""
            }`
          : `${service.duration} minutes`
      }.`,
    },
    {
      question: `What's included in the ${service.name?.toLowerCase()} service?`,
      answer: `Our ${service.name?.toLowerCase()} service includes all the essential cleaning tasks to ensure your space is spotless. We bring our own equipment and eco-friendly cleaning supplies.`,
    },
    {
      question: "Do you offer any guarantees?",
      answer:
        "Yes, we offer a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll return within 24 hours to address any concerns at no additional cost.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 48 hours in advance to secure your preferred time slot. However, we do our best to accommodate same-day or next-day requests when possible.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
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
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.sylviecleaningservices.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.sylviecleaningservices.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": service.name,
                "item": seoData.canonicalUrl
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-600">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Media Gallery */}
            <div className="space-y-4">
              {/* Toggle Buttons for Images/Videos */}
              {hasValidImages && hasValidVideos && (
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setShowVideos(false)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      !showVideos
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <i className="fas fa-images mr-2"></i>
                    Images
                  </button>
                  <button
                    onClick={() => setShowVideos(true)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      showVideos
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <i className="fas fa-play mr-2"></i>
                    Videos
                  </button>
                </div>
              )}

              {/* Main Media Display */}
              <div className="aspect-w-16 aspect-h-12">
                {shouldShowVideos ? (
                  // Video Display
                  <VideoPlayer
                    video={serviceVideos[selectedVideoIndex]}
                    isActive={true}
                  />
                ) : (
                  // Image Display
                  <img
                    src={serviceImages[selectedImageIndex]}
                    alt={service.name}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/800/600?random=1";
                    }}
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {shouldShowVideos
                ? // Video Thumbnails
                  serviceVideos.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {serviceVideos.map((video, index) => {
                        const videoId =
                          video.videoId || getYouTubeVideoId(video.url);
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedVideoIndex(index)}
                            className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 transition-colors ${
                              selectedVideoIndex === index
                                ? "border-blue-600"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {videoId ? (
                              <img
                                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-20 object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://picsum.photos/200/200?random=1";
                                }}
                              />
                            ) : (
                              <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                                <i className="fas fa-play text-gray-400"></i>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )
                : // Image Thumbnails
                  serviceImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {serviceImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index
                              ? "border-blue-600"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${service.name} ${index + 1}`}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://picsum.photos/200/200?random=1";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}

              {/* Video Section Below Images */}
              {!shouldShowVideos && hasValidVideos && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    <i className="fas fa-play mr-2 text-blue-600"></i>
                    Watch Our Work in Action
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceVideos.slice(0, 2).map((video, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <VideoPlayer video={video} isActive={false} />
                        <div className="p-3">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {video.title}
                          </h4>
                          <p className="text-gray-600 text-xs mt-1">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  {service.name}
                </h1>
                {/* Updated to use FormattedDescription component */}
                <FormattedDescription description={service.description} />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Link
                  to={`/book?service=${service._id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Book This Service
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-center px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section - Responsive */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4">
          {/* Mobile: Stacked buttons approach */}
          <div className="block sm:hidden py-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "What's Included" },
                { id: "process", label: "Our Process" },
                { id: "videos", label: "Work Examples" },
                { id: "faq", label: "FAQ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tablet: Scrollable tabs */}
          <div className="hidden sm:block lg:hidden">
            <div className="flex space-x-4 border-b overflow-x-auto pb-0">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "What's Included" },
                { id: "process", label: "Our Process" },
                { id: "videos", label: "Work Examples" },
                { id: "faq", label: "FAQ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Full tabs */}
          <div className="hidden lg:block">
            <div className="flex space-x-8 border-b">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "What's Included" },
                { id: "process", label: "Our Process" },
                { id: "videos", label: "Work Examples" },
                { id: "faq", label: "FAQ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                About {service.name}
              </h2>
              <FormattedDescription
                description={
                  service.longDescription ||
                  service.description ||
                  `Our ${service.name?.toLowerCase()} service is designed to provide you with a comprehensive cleaning solution that exceeds your expectations. We understand that every space is unique, which is why we tailor our approach to meet your specific needs and requirements.

Our professional team uses state-of-the-art equipment and eco-friendly cleaning products to ensure your space is not only clean but also safe for your family, pets, and the environment. We take pride in our attention to detail and commitment to excellence.

Whether you need a one-time deep clean or regular maintenance, our ${service.name?.toLowerCase()} service will leave your space spotless and fresh, giving you more time to focus on what matters most to you.`
                }
              />
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                What's Included in {service.name}
              </h2>
              {service.features && service.features.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <p className="text-gray-600">
                    Detailed features list will be provided during your
                    consultation. Our team will customize the service based on
                    your specific needs.
                  </p>
                </div>
              )}

              {/* Show requirements if available */}
              {service.requirements && service.requirements.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Requirements & Preparation
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="space-y-3">
                      {service.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Our {service.name} Process
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Initial Assessment",
                    description: `We begin with a thorough assessment of your space to understand the scope of the ${service.name?.toLowerCase()} required and identify any special requirements.`,
                  },
                  {
                    step: 2,
                    title: "Preparation",
                    description:
                      "Our team prepares the necessary equipment and eco-friendly cleaning supplies specific to your service needs.",
                  },
                  {
                    step: 3,
                    title: "Systematic Cleaning",
                    description: `We follow a systematic approach to ensure every area is thoroughly cleaned according to our ${service.name?.toLowerCase()} standards.`,
                  },
                  {
                    step: 4,
                    title: "Quality Inspection",
                    description:
                      "A comprehensive quality check is performed to ensure all areas meet our high standards before completion.",
                  },
                  {
                    step: 5,
                    title: "Final Walkthrough",
                    description:
                      "We conduct a final walkthrough with you to ensure complete satisfaction with the service provided.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                See Our Work in Action
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceVideos.map((video) => {
                  const videoId = video.videoId || getYouTubeVideoId(video.url);
                  return (
                    <div
                      key={video.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        {videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48"
                          ></iframe>
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <svg
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-200">
                {serviceFAQs.map((faq, index) => (
                  <div key={index} className="py-6">
                    <button
                      className="flex justify-between items-center w-full text-left focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <svg
                        className={`h-6 w-6 text-blue-600 transform transition-transform flex-shrink-0 ${
                          activeFAQ === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`mt-4 transition-all duration-300 overflow-hidden ${
                        activeFAQ === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Book {service.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the difference professional cleaning makes. Get started
            with a free consultation and quote.
          </p>
          <div className="space-x-4">
            <Link
              to={`/book?service=${service._id}`}
              className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg shadow-md transition-colors"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
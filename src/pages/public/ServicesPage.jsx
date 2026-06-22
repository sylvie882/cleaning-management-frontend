/* eslint-disable no-unused-vars */
// src/pages/Public/ServicesPage.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { getServices } from "../../features/services/servicesSlice";
import { formatContentForDisplay } from "../../utils/markdownUtils";

// ─── Color Palette ──────────────────────────────────────────────
const colors = {
  primary: "#1E5AA8",      // Blue - trust, professionalism
  primaryDark: "#16447D",  // Darker blue
  primaryLight: "#E8EEF7", // Light blue background
  primaryHover: "#153D6B", // Hover state
  accent: "#D62828",       // Red - CTAs, energy
  accentDark: "#B71C1C",   // Darker red
  accentLight: "#FDE8E8",  // Light red background
  white: "#FFFFFF",
  gray: "#F7F8FA",
  text: "#1A1A2E",
};

const ServicesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { services, isLoading } = useSelector((state) => state.services);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    categories: false,
    services: false,
    process: false,
    faq: false,
    cta: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(12); // Changed from 10 to 12

  // SEO Metadata for services page
  const seoData = {
    title: "Professional Cleaning Services Nairobi | Sylvie Cleaning Services",
    description: "Expert residential, commercial & post-construction cleaning services in Nairobi. Deep cleaning, office cleaning, move-in/move-out cleaning with eco-friendly products.",
    canonicalUrl: "https://www.sylviecleaningservices.com/services",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/services-social.jpg",
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

  // Structured data for services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cleaning Services",
    "description": seoData.description,
    "url": seoData.canonicalUrl,
    "numberOfItems": services.length,
    "itemListElement": services.slice(0, 10).map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description.replace(/<[^>]*>/g, '').substring(0, 200),
        "provider": {
          "@type": "Organization",
          "name": seoData.businessInfo.name
        },
        "areaServed": "Nairobi, Kenya",
        "serviceType": service.category
      }
    }))
  };

  // LocalBusiness structured data
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": seoData.businessInfo.name,
    "image": seoData.businessInfo.logo,
    "@id": seoData.businessInfo.url,
    "url": seoData.businessInfo.url,
    "telephone": seoData.businessInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoData.businessInfo.address.street,
      "addressLocality": seoData.businessInfo.address.city,
      "addressRegion": seoData.businessInfo.address.state,
      "postalCode": seoData.businessInfo.address.zip,
      "addressCountry": seoData.businessInfo.address.country
    },
    "priceRange": "$$",
    "openingHours": "Mo-Su 08:00-20:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -1.2921,
        "longitude": 36.8219
      },
      "geoRadius": "50000"
    }
  };

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!services || !Array.isArray(services)) {
      setFilteredServices([]);
      return;
    }
    
    // Sort services: YouTube videos first, then others
    const sortedServices = [...services].sort((a, b) => {
      const aHasVideo = a.youtubeVideos && a.youtubeVideos.length > 0;
      const bHasVideo = b.youtubeVideos && b.youtubeVideos.length > 0;
      
      if (aHasVideo && !bHasVideo) return -1;
      if (!aHasVideo && bHasVideo) return 1;
      return 0;
    });

    if (activeCategory === "all") {
      setFilteredServices(sortedServices);
    } else {
      setFilteredServices(
        sortedServices.filter((service) => service.category === activeCategory)
      );
    }
    setCurrentPage(1);
  }, [services, activeCategory]);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const totalServices = filteredServices.length;

  const categories = [
    { id: "all", name: "All Services", icon: "fas fa-th-large" },
    { id: "residential", name: "Residential", icon: "fas fa-home" },
    { id: "commercial", name: "Commercial", icon: "fas fa-building" },
    {
      id: "post-construction",
      name: "Post Construction",
      icon: "fas fa-hammer",
    },
    { id: "house-cleaning", name: "House Cleaning", icon: "fas fa-broom" },
  ];

  const getServiceMedia = (service) => {
    // Function to convert old upload URLs to new format
    const convertImageUrl = (url) => {
      if (!url) return url;

      // Convert old /uploads/ URLs to new /images/services/ format
      if (url.includes("/uploads/") && !url.includes("/images/services/")) {
        return url.replace("/uploads/", "/images/services/");
      }

      return url;
    };

    if (service.youtubeVideos && service.youtubeVideos.length > 0) {
      const video = service.youtubeVideos[0];
      return {
        type: "video",
        thumbnail: video.thumbnail,
        url: video.url,
        videoId: video.videoId,
      };
    }
    if (service.images && service.images.length > 0) {
      return { type: "image", url: convertImageUrl(service.images[0]) };
    }
    if (service.image && service.image.length > 0) {
      return { type: "image", url: convertImageUrl(service.image[0]) };
    }
    // Use a placeholder image service instead of local file
    return {
      type: "image",
      url: "https://picsum.photos/400/300?random=1",
    };
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push("...");
      }
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };
  const [activeFAQ, setActiveFAQ] = useState(null);
  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* ── SEO Meta Tags — Services Page ── */}
      <Helmet>
        <title>Cleaning Services Nairobi | House, Office, Carpet & Deep Cleaning | Sylvie</title>
        <meta name="description" content="All professional cleaning services in Nairobi: house cleaning from KES 1,500, office cleaning, carpet cleaning, sofa cleaning, deep cleaning & post-construction cleaning. ★4.9 rated. Book online or call 0726 933 261." />
        <meta name="keywords" content="cleaning services Nairobi, house cleaning Nairobi, office cleaning Nairobi, carpet cleaning Nairobi, sofa cleaning Nairobi, deep cleaning Nairobi, post construction cleaning Nairobi, move in cleaning Nairobi, specialized cleaning Kenya, professional cleaners Nairobi Kenya" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={seoData.canonicalUrl} />

        {/* Geo signals */}
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sylvie Cleaning Services" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content="All Cleaning Services in Nairobi | Sylvie Cleaning Services ★4.9" />
        <meta property="og:description" content="House cleaning from KES 1,500 | Office, carpet, sofa, deep & post-construction cleaning in Nairobi. Trusted by 5,000+ clients. Book online!" />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sylviecleaning" />
        <meta name="twitter:creator" content="@sylviecleaning" />
        <meta name="twitter:title" content="Cleaning Services Nairobi | Sylvie Cleaning Services" />
        <meta name="twitter:description" content="House, office, carpet, sofa, deep & post-construction cleaning in Nairobi. ★4.9 rated. Book now!" />
        <meta name="twitter:image" content={seoData.socialImage} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessStructuredData)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sylviecleaningservices.com" },
              { "@type": "ListItem", "position": 2, "name": "Cleaning Services Nairobi", "item": seoData.canonicalUrl }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does cleaning cost in Nairobi?", "acceptedAnswer": { "@type": "Answer", "text": "House cleaning starts from KES 1,500 for a studio, KES 2,500 for 1-bedroom, and KES 3,500–5,000 for 2–3 bedroom homes. Carpet cleaning is from KES 1,000/room, sofa cleaning from KES 800/seat, and deep cleaning from KES 4,000. Contact us for a free quote." } },
              { "@type": "Question", "name": "Do you offer same-day cleaning services in Nairobi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Sylvie Cleaning Services offers same-day and emergency cleaning services across Nairobi, subject to availability. Call or WhatsApp us at +254726933261 to check availability and book." } },
              { "@type": "Question", "name": "What is included in deep cleaning services in Nairobi?", "acceptedAnswer": { "@type": "Answer", "text": "Our deep cleaning service includes thorough cleaning of all rooms, inside cupboards, behind appliances, ceiling fans, light fixtures, baseboards, grout scrubbing, sanitizing bathrooms and kitchen, carpet and upholstery cleaning, and window interiors." } }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Banner - Using Blue Primary */}
      <div
        className="relative h-80 md:h-96 w-full overflow-hidden shadow-xl pt-32"
        style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}
        data-section="hero"
      >
        {/* Animated background icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              <i
                className={`fas ${
                  [
                    "fa-broom",
                    "fa-spray-can",
                    "fa-tint",
                    "fa-sparkles",
                    "fa-home",
                    "fa-building",
                    "fa-leaf",
                    "fa-shield-alt",
                  ][i % 8]
                }`}
              ></i>
            </div>
          ))}
        </div>
        <div
          className={`relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-10 transition-all duration-1000 ${
            isVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-xl">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
              Cleaning Services
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Professional cleaning solutions for every need
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Category Navigation */}
        <div className="mb-16" data-section="categories">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible.categories
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Service
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive range of professional cleaning services
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`group px-6 py-4 md:px-8 md:py-4 rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  activeCategory === category.id
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300"
                }`}
                style={{
                  background: activeCategory === category.id ? colors.primary : "white",
                  boxShadow: activeCategory === category.id ? `0 10px 25px ${colors.primary}40` : undefined,
                  transitionDelay: `${index * 100}ms`
                }}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="flex items-center space-x-3">
                  <i
                    className={`${category.icon} text-lg ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-blue-600"
                    }`}
                  ></i>
                  <span>{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        {!isLoading && filteredServices.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
            <div className="text-gray-700 text-center sm:text-left">
              <span className="font-semibold" style={{ color: colors.primary }}>
                {indexOfFirstService + 1}-
                {Math.min(indexOfLastService, totalServices)}
              </span>{" "}
              of <span className="font-semibold">{totalServices}</span> services
              {activeCategory !== "all" && (
                <span className="font-medium ml-2" style={{ color: colors.primary }}>
                  in {categories.find((cat) => cat.id === activeCategory)?.name}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Loading professional services...
            </p>
          </div>
        ) : currentServices.length > 0 ? (
          <>
            {/* Services List - Grid with 12 cards per page */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16"
              data-section="services"
            >
              {currentServices.map((service, index) => {
                const media = getServiceMedia(service);
                return (
                  <div
                    key={service._id}
                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 animate-fade-in ${
                      isVisible.services
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    itemScope
                    itemType="https://schema.org/Service"
                  >
                    {/* Service Media (Video or Image) */}
                    <div className="h-48 relative overflow-hidden">
                      {media.type === "video" ? (
                        <div className="w-full h-full relative group">
                          <iframe
                            src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&loop=1&playlist=${media.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
                            title={`${service.name} - Demo Video`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            onLoad={(e) => {
                              const iframe = e.target;
                              iframe.contentWindow.postMessage('{"event":"command","func":"loopVideo","args":""}', '*');
                            }}
                          ></iframe>
                          <div className="absolute top-3 right-3 text-white text-[10px] px-2 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-fade-in" style={{ background: colors.accent }}>
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="font-semibold">Video</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                      ) : (
                        <div
                          className="h-full bg-cover bg-center relative group transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${media.url})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute top-3 right-3 text-white text-[10px] px-2 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-fade-in" style={{ background: colors.primary }}>
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-semibold">Photo</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Service Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-lg font-bold text-gray-800 flex-1 group-hover transition-colors duration-300 leading-tight" style={{ color: colors.primary }} itemProp="name">
                          {service.name}
                        </h2>
                        {media.type === "video" && (
                          <div className="ml-2 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-semibold animate-pulse flex-shrink-0" style={{ background: colors.accentLight }}>
                            VIDEO
                          </div>
                        )}
                      </div>
                      <div
                        className="text-gray-600 mb-4 leading-relaxed animate-fade-in prose prose-sm max-w-none text-sm"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        itemProp="description"
                        dangerouslySetInnerHTML={{
                          __html: formatContentForDisplay(
                            service.description,
                            false
                          ),
                        }}
                      />
                      {service.youtubeVideos &&
                        service.youtubeVideos.length > 1 && (
                          <div className="mb-4">
                            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full animate-fade-in">
                              <i className="fas fa-video mr-1.5" style={{ color: colors.primary }}></i>
                              +{service.youtubeVideos.length - 1} more
                            </span>
                          </div>
                        )}
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Link
                          to={`/book?service=${service._id}`}
                          className="flex-1 text-white text-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group animate-fade-in"
                          style={{ 
                            background: colors.accent,
                            boxShadow: `0 8px 20px ${colors.accent}40`
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = colors.accentDark}
                          onMouseLeave={(e) => e.currentTarget.style.background = colors.accent}
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <i className="fas fa-calendar-check text-xs"></i>
                            <span>Book Now</span>
                          </span>
                        </Link>
                        <Link
                          to={`/services/${service._id}`}
                          className="flex-1 text-gray-700 text-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 animate-fade-in border-2"
                          style={{ borderColor: colors.primary }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.primaryLight;
                            e.currentTarget.style.borderColor = colors.primaryDark;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = colors.primary;
                          }}
                        >
                          <i className="fas fa-info-circle text-xs"></i>
                          <span>Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center space-y-6 bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 transform hover:scale-105"
                    }`}
                    style={{ borderColor: currentPage === 1 ? undefined : colors.primary }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {getPageNumbers().map((pageNumber, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof pageNumber === "number" &&
                        handlePageChange(pageNumber)
                      }
                      disabled={pageNumber === "..."}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                        pageNumber === currentPage
                          ? "text-white shadow-lg"
                          : pageNumber === "..."
                          ? "bg-transparent text-gray-400 cursor-default"
                          : "bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 transform hover:scale-105"
                      }`}
                      style={{
                        background: pageNumber === currentPage ? colors.primary : "white",
                        borderColor: pageNumber === currentPage ? colors.primary : undefined,
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 transform hover:scale-105"
                    }`}
                    style={{ borderColor: currentPage === totalPages ? undefined : colors.primary }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  Showing{" "}
                  <span className="font-semibold" style={{ color: colors.primary }}>
                    {indexOfFirstService + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold" style={{ color: colors.primary }}>
                    {Math.min(indexOfLastService, totalServices)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold" style={{ color: colors.primary }}>
                    {totalServices}
                  </span>{" "}
                  results
                </div>
                {totalPages > 10 && (
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-gray-600 font-medium">
                      Go to page:
                    </span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          handlePageChange(page);
                        }
                      }}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ focusRing: colors.primary }}
                    />
                    <span className="text-gray-600 font-medium">
                      of {totalPages}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: colors.primaryLight }}>
              <svg
                className="h-12 w-12"
                style={{ color: colors.primary }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Services Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeCategory === "all"
                ? "No services are available at the moment. Please check back later or contact us for custom solutions."
                : `No services are available in the "${
                    categories.find((cat) => cat.id === activeCategory)?.name
                  }" category. We're constantly adding new services.`}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                background: colors.primary,
                boxShadow: `0 10px 25px ${colors.primary}40`
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.background = colors.primary}
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </Link>
          </div>
        )}
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 4s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
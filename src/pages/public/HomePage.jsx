/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import heroImage from "../../assets/images/banner.png";
import cleaner1 from "../../assets/images/newSlider1.jpg";
import cleaner2 from "../../assets/images/newSlider2.jpg";
import cleaner3 from "../../assets/images/newSlider3.jpg";
import cleaner4 from "../../assets/images/newSlider4.jpg";
import cleaner9 from "../../assets/images/newSlider5.jpg";
import cleaner10 from "../../assets/images/newSlider7.jpg";
import cleaner5 from "../../assets/images/Luxury_Home.png";
import cleaner6 from "../../assets/images/Corporate_Office.png";
import cleaner7 from "../../assets/images/Resturant_Deep.png";
import cleaner8 from "../../assets/images/Event_venue.png";
import { useEffect, useState } from "react";
import { getTestimonials } from "../../features/testimonial/testimonialSlice";
import "../../styles/animations.css";
import { ArrowUp } from "lucide-react";

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatingText, setAnimatingText] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    whyChoose: false,
    howItWorks: false,
    videos: false,
    projects: false,
    testimonials: false,
    cta: false,
    trust: false,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Effect to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ENHANCED SEO Metadata with Nairobi-specific optimization - FIXED KEYWORDS
  const seoData = {
    title: "Best Cleaning Services in Nairobi Kenya | Professional House & Office Cleaning | Sylvie Cleaning Services",
    description: "Top-rated cleaning company in Nairobi Kenya offering professional house cleaning, office cleaning, carpet cleaning, sofa cleaning & deep cleaning services. Affordable prices with satisfaction guarantee. Book online today!",
    canonicalUrl: "https://www.sylviecleaningservices.com",
    siteName: "Sylvie Cleaning Services Nairobi Kenya",
    twitterHandle: "@sylviecleaning",
    socialImage: heroImage,
    businessInfo: {
      name: "Sylvie Cleaning Services Nairobi Kenya",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road, Fox Close",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      },
      openingHours: "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
      priceRange: "$$",
      sameAs: [
        "https://web.facebook.com/sylvie.cleaning",
        "https://www.instagram.com/sylviecleaning",
        "https://x.com/sylviecleaning"
      ],
      areasServed : [
        "Nairobi", "Westlands", "Karen", "Runda", "Kileleshwa", "Lavington", "Kilimani",
        "Ngong", "Upper Hill", "Naivasha", "Nakuru County", "Narok", "Kiambu", "Thika", "Ongata Rongai", "Parklands", "Highridge", "Syokimau", "Kitengela",
        "Horse Shoe Village", "Barton Estate", "Whispers Estate", "Migaa Golf Estate", "Daisy Road", "Tara Road", "Fairview Estate", "Riverrun Estates", "Amani Ridge", "Zaria Village", "Karogo Estate", "Mind Bridge Gardens", "Mhasibu Silver Birch Estate", "Royale Ville Gardens", "Mitini Scapes Migaa", "Rose Gate Estate", "Nawiri Estate", "Nderi Road", "Shanzu Road", "Kibarage Estate", "Gitanga Road", "Waithaka Estate", "Muthithi Gardens", "Ngong Forest View", "Langata Forest View Estate", "Karen Greens Estate", "Karen Ridge Estate", "Karen Road", "Langata Road", "Marula Lane", "Karen Brooks Estate", "Karen Brooks Road", "Acacia Drive", "Situ Village", "Ololua Ridge", "Diepolos Road", "Kangawa Road", "Zambia Road", "Baboon Crescent", "Cedar Road", "Gitonga Drive", "Windy Ridge", "Pepo Lane", "Rhino Park Road", "Elgeyo Marakwet Road", "Safari Park Avenue", "Kivuli Lane", "Usiu Road", "Nyati Road", "Kenyatta Road", "Makuyu Ridge", "Isinya", "Tuala", "Diadpora Village", "Meadows Estate", "Mimosa Road", "Eliud Mathu Street", "Benin Drive", "Glory Road", "Egrets Drive Road", "Red Hill Drive", "Thigiri Ridge Road", "Ndoto Road", "Kisaju", "Olooloitikosh", "Magadi Road", "Amboseli Road", "Convent Road", "Kaptagat Road", "Southern Bypass", "MCAKECH Residence", "Natala Ranch", "Grace Hill Gardens", "Maasai Road", "Olepolos", "Mbagathi Way", "Makuyu", "Samaki Drive", "Nyati Drive", "Lukenya Hills Estate", "Paradise Park Estate", "Thome Estate", "Garden Estate", "Silanga Road", "Kombe Road", "Fana Road", "Mokoyeti South Road", "Mokoyeti West Road", "Karen C Road", "Kumbe Road", "Santack Estate", "Jamhuri Estate", "Kilimani", "Woodley Estate", "Golf Course Estate", "Akinseye Estate", "Muguga Green Estate", "Kitisuru Country Homes", "Shinyalu Road", "D134 Kamau Residency", "Ngenda Road", "Sahara Estate", "Toll Estate", "Wendani Estate", "Zahara Estate", "Saitoti Road", "Shombole Road", "Gem Lane", "Taita Villas", "Natare Gardens", "Eve Gardens Estate", "Third Brooks Avenue", "Ngong Road", "Street Elizabeth", "Ngong View Road", "Ngong View Rise", "Forest Line Road", "Muteero Ridge", "Kay Estate", "Brook View Estate", "Kihanya Estate", "Mugumo Crescent", "Kyuna Road", "Kyuna Crescent", "Utawala", "Ruai", "Kangundo Road", "Ruaka", "Nandi Road Karen", "Bogani Karen", "Karen Hills Estate", "Kikenni Drive", "Mukoma Estate", "Sandalwood Estate Karen", "Runda Mhasibu", "Kugeria North Close", "Ridgeways", "Ridgeways Drive", "Kigwa Road", "Edenville Estate", "Balozi Estate", "Fourways Junction", "Paradise Lost", "Evergreen", "Tigoni", "Limuru", "Athi River", "Muthaiga North", "Muthaiga South", "Juja", "Wakigwa Estate", "Adams Park Estate", "Juja South Estate", "Chai Estate", "Lower Kabete Road", "Upper Kabete Road", "Spring Valley", "Sports Road", "David Osieli Road", "Mvuli Road", "Lantana Road", "Terrace Close", "Church Road", "Blueman Road", "Parklands Road", "Maasai Lodge Road", "Ndorobo Road", "Muhiti Road", "Gataka Road", "Mayor Road", "Bosto Road", "Mahiga Mairu Avenue", "Riara Road", "Flame Tree Drive", "Safari Park View Estate", "Chady Road", "Airport North Road", "Fahari Close", "Kiambu Road", "Mukabi Road", "Hinga Road", "Loresho Lane", "Thindigua", "Kasarini", "Mushroom Road", "Riabai Road", "Muchatha", "Boma Road", "Kiratina Road", "Kitisuru Road", "Marurui Road", "Githunguri-Githiga Road", "Kamiti Road", "Eastern Bypass Road", "Northern Bypass Road", "Mombasa Road", "Katani Road", "Bustani Estate", "Mwananchi Road", "Muthama Access Road", "Athi River Road", "Loneview Access Road", "Epco Road", "Namanga Road", "Chuna Road", "EPZ Road", "Gesora Road", "Kayole Road", "Uhuru Gardens Estate", "Runda Road", "Runda Grove", "Ruaka Road", "UN Avenue", "Eagle Park", "Andrew Zagoritis Street", "Pan Africa Insurance Avenue", "Elia Zagoritis Road", "Elia Zagoritis Avenue", "Glory Drive", "Alibiza Drive"
      ],
      services: ["House Cleaning Nairobi", "Office Cleaning Nairobi", "Deep Cleaning Services", "Carpet Cleaning Nairobi", "Sofa Cleaning Nairobi", "Post Construction Cleaning", "Move-In/Move-Out Cleaning Nairobi"]
    }
  };

  // Enhanced Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": seoData.businessInfo.name,
    "image": seoData.socialImage,
    "@id": seoData.canonicalUrl,
    "url": seoData.canonicalUrl,
    "telephone": seoData.businessInfo.phone,
    "priceRange": seoData.businessInfo.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoData.businessInfo.address.street,
      "addressLocality": seoData.businessInfo.address.city,
      "addressRegion": seoData.businessInfo.address.state,
      "postalCode": seoData.businessInfo.address.zip,
      "addressCountry": seoData.businessInfo.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2921",  // More accurate Nairobi coordinates
      "longitude": "36.8219"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": seoData.businessInfo.sameAs,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-1.2921",
        "longitude": "36.8219"
      },
      "geoRadius": "50000"  // 50km radius from Nairobi center
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services in Nairobi Kenya",
      "itemListElement": seoData.businessInfo.services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "description": `Professional ${service} in Nairobi Kenya`,
          "provider": {
            "@type": "Organization",
            "name": "Sylvie Cleaning Services"
          }
        }
      }))
    },
    "serviceType": "Cleaning Services",
    "provider": {
      "@type": "Organization",
      "name": "Sylvie Cleaning Services"
    }
  };

  // Carousel data with Nairobi-specific content - ENHANCED KEYWORDS
  const carouselData = [
    {
      image: cleaner1,
      title: "Best Cleaning Services in Nairobi Kenya - Professional House & Office Cleaning",
      subtitle: "Top-rated Cleaning Company in Nairobi, Westlands, Karen & Surrounding Areas",
      description: "Professional cleaning services in Nairobi Kenya for homes and offices. Expert carpet cleaning, sofa cleaning, deep cleaning services at affordable prices.",
      serviceType: "Nairobi Cleaning Services",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      image: cleaner2,
      title: "House Cleaning Services Nairobi Kenya | Affordable Home Cleaning",
      subtitle: "Professional Residential Cleaning in Nairobi Kenya",
      description: "Expert house cleaning services in Nairobi. Deep cleaning, regular maintenance, move-in/out cleaning for homes across Nairobi County.",
      serviceType: "House Cleaning Nairobi",
      accent: "from-green-500 to-emerald-500",
    },
    {
      image: cleaner3,
      title: "Office Cleaning Nairobi Kenya | Commercial Cleaning Services",
      subtitle: "Professional Office Cleaning Company in Nairobi",
      description: "Commercial cleaning services for offices, businesses, and corporate spaces in Nairobi. Post-construction cleaning, carpet cleaning, and more.",
      serviceType: "Office Cleaning Nairobi",
      accent: "from-purple-500 to-indigo-500",
    },
  ];

  const cleaningVideos = [
    {
      id: "6s2Vp91YUHw",
      title: "Professional Home Deep Cleaning Process in Nairobi",
      description:
        "Watch our Nairobi cleaning team transform a family home with our comprehensive deep cleaning service.",
      category: "Deep Cleaning Nairobi",
    },
    {
      id: "GgoW5zpDVaM",
      title: "Commercial Office Cleaning Standards in Nairobi Kenya",
      description:
        "See how we maintain the highest cleaning standards for corporate environments in Nairobi.",
      category: "Commercial Cleaning Nairobi",
    },
    {
      id: "U_Wa8nol86k",
      title: "Move-Out Cleaning Transformation in Nairobi",
      description:
        "Complete move-out cleaning service in Nairobi that ensures you get your full deposit back.",
      category: "Move-Out Cleaning Nairobi",
    },
    {
      id: "MA3sA8Yt62Q",
      title: "Eco-Friendly Cleaning Techniques in Nairobi Kenya",
      description:
        "Learn about our environmentally safe cleaning methods and products used in Nairobi.",
      category: "Residential Cleaning Nairobi",
    },
  ];

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     try {
  //       const data = await getTestimonials();
  //       setTestimonials(data);
  //     } catch (error) {
  //       console.error("Failed to fetch testimonials:", error);
  //     }
  //   };

  //   fetchTestimonials();
  // }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Hero carousel auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingText(true);
      setTimeout(() => {
        setCurrentSlide((prev) =>
          prev === carouselData.length - 1 ? 0 : prev + 1
        );
        setTimeout(() => {
          setAnimatingText(false);
        }, 100);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Intersection Observer for animations
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

  // ENHANCED Services with Nairobi keywords
  const services = [
    {
      title: "House Cleaning Nairobi",
      description:
        "Professional residential cleaning services in Nairobi Kenya for homes, apartments, and estates across Nairobi County.",
      icon: "fas fa-home",
      features: [
        "Regular Maintenance Cleaning",
        "Deep Cleaning Services",
        "Move-in/out Cleaning",
        "Custom Cleaning Schedules",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Office Cleaning Nairobi",
      description:
        "Commercial cleaning solutions for offices, retail spaces, and businesses in Nairobi Kenya.",
      icon: "fas fa-building",
      features: [
        "Office Cleaning Nairobi",
        "Retail Space Cleaning",
        "Industrial Cleaning",
        "24/7 Cleaning Service",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Deep Cleaning Services Nairobi",
      description:
        "Intensive deep cleaning services in Nairobi to remove deep-seated dirt, allergens, and bacteria.",
      icon: "fas fa-broom",
      features: [
        "Allergen Removal Nairobi",
        "Sanitization Services",
        "Hard-to-reach Areas",
        "Eco-friendly Cleaning",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Specialized Cleaning Nairobi",
      description:
        "Specialized cleaning services in Nairobi for carpets, upholstery, windows, and post-construction.",
      icon: "fas fa-sparkles",
      features: [
        "Carpet Cleaning Nairobi",
        "Sofa Cleaning Nairobi",
        "Post-construction Cleaning",
        "Event Cleanup Services",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  // Project showcase data with Nairobi context
  const projects = [
    {
      title: "Luxury Home Cleaning in Karen Nairobi",
      description:
        "Complete cleaning transformation of a 5-bedroom luxury home in Karen Nairobi",
      image: cleaner1,
      video: "https://youtu.be/XpvmwxpQaGo?si=15-wQ-dyMH3fMCSq",
      category: "Residential Cleaning Nairobi",
      stats: { area: "4,500 sq ft", time: "6 hours", team: "4 cleaners" },
    },
    {
      title: "Corporate Office Cleaning in Westlands Nairobi",
      description:
        "Post-construction cleaning for a new corporate headquarters in Westlands Nairobi",
      image: cleaner3,
      category: "Commercial Cleaning Nairobi",
      stats: { area: "25,000 sq ft", time: "3 days", team: "12 cleaners" },
    },
    {
      title: "Restaurant Deep Clean in Nairobi CBD",
      description: "Overnight deep cleaning for a popular local restaurant in Nairobi CBD",
      image: cleaner4,
      video: "https://youtu.be/TQG_WgXoytk?si=jcUiX7jVG86sCcYp",
      category: "Deep Cleaning Nairobi",
      stats: { area: "3,200 sq ft", time: "8 hours", team: "6 cleaners" },
    },
    {
      title: "Event Venue Cleaning in Nairobi",
      description: "Same-day cleaning for a major corporate event venue in Nairobi",
      image: cleaner10,
      video: "https://youtu.be/So3b46JgkAc?si=y7HJtpqvZ6B6UWPH",
      category: "Special Services Nairobi",
      stats: { area: "15,000 sq ft", time: "4 hours", team: "8 cleaners" },
    },
  ];

  // Why choose us data with Nairobi focus
  const chooseBenefits = [
    {
      title: "Experienced Nairobi Cleaning Team",
      description:
        "Our Nairobi-based staff has over 10 years of experience in professional cleaning with certified training.",
      icon: "fas fa-user-tie",
      stat: "10+ Years in Nairobi",
    },
    {
      title: "Custom Cleaning Solutions in Nairobi",
      description:
        "Personalized cleaning plans tailored to your specific needs and preferences in Nairobi.",
      icon: "fas fa-sliders-h",
      stat: "100% Custom",
    },
    {
      title: "Satisfaction Guarantee Nairobi",
      description:
        "If you're not satisfied with our Nairobi cleaning services, we'll re-clean at no additional cost.",
      icon: "fas fa-medal",
      stat: "100% Guarantee",
    },
    {
      title: "COVID-19 Safe Protocols in Nairobi",
      description:
        "Enhanced disinfection procedures and safety protocols for your health and safety in Nairobi.",
      icon: "fas fa-shield-virus",
      stat: "Safe & Secure",
    },
    {
      title: "Flexible Scheduling in Nairobi",
      description:
        "Choose from one-time, weekly, bi-weekly, or monthly service to fit your Nairobi schedule.",
      icon: "fas fa-calendar-alt",
      stat: "24/7 Booking",
    },
    {
      title: "Transparent Pricing Nairobi",
      description:
        "No hidden fees or surprise charges. Clear, upfront pricing for all Nairobi cleaning services.",
      icon: "fas fa-tag",
      stat: "No Hidden Fees",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* ENHANCED SEO Meta Tags with Nairobi keywords */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Primary Keywords for Nairobi Cleaning Services */}
        <meta name="keywords" content="cleaning services nairobi, house cleaning nairobi, office cleaning nairobi, cleaning company nairobi, carpet cleaning nairobi, sofa cleaning nairobi, deep cleaning services nairobi, professional cleaners nairobi, cleaning services in nairobi kenya, best cleaning company nairobi" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:region" content="KE-110" />
        <meta property="og:country-name" content="Kenya" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        
        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sylvie Cleaning Services",
            "description": "Professional cleaning services in Nairobi Kenya offering house cleaning, office cleaning, carpet cleaning, and deep cleaning services.",
            "url": "https://www.sylviecleaningservices.com",
            "telephone": "+254726933261",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dale House, Rhapta Road, Fox Close",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "postalCode": "00100",
              "addressCountry": "KE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-1.2921",
              "longitude": "36.8219"
            },
            "openingHours": "Mo-Fr 08:00-20:00, Sa 09:00-15:00",
            "areaServed": "Nairobi and surrounding areas",
            "serviceType": "Cleaning Services"
          })}
        </script>
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Enhanced Geo Tags for Local SEO */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <meta name="description" content={seoData.description} />
        
        {/* Location Specific Meta Tags */}
        <meta name="city" content="Nairobi" />
        <meta name="country" content="Kenya" />
        <meta name="distribution" content="local" />
        <meta name="target" content="Nairobi, Kenya" />
      </Helmet>

      {/* Hero Section with Enhanced Nairobi Keywords */}
      <section
        className="relative h-screen overflow-hidden pt-44 md:pt-44 lg:pt-44"
        data-section="hero"
      >

        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
          {/* Professional cleaning icons floating */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`icon-${i}`}
              className="absolute text-white/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
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

        {/* Content */}
        <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 flex items-center justify-center">
          <div className="text-center max-w-5xl w-full px-2">
            <div
              className={`transition-all duration-700 ease-out ${
                isVisible.hero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform -translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].title}
              </h1>
              <h2
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-blue-200 mb-6 transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].subtitle}
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${
                  animatingText
                    ? "opacity-0 transform translate-y-10"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {carouselData[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/book"
                  className={`inline-flex items-center bg-gradient-to-r ${carouselData[currentSlide].accent} hover:scale-105 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform shadow-2xl hover:shadow-blue-500/25 btn-primary animate-pulse-glow text-base sm:text-lg`}
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book {carouselData[currentSlide].serviceType}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform border border-white/20 text-base sm:text-lg"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  Learn More
                </Link>
              </div>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center mt-12 sm:mt-16 space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAnimatingText(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setTimeout(() => {
                        setAnimatingText(false);
                      }, 100);
                    }, 500);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "bg-blue-500 w-10 sm:w-12 h-2 sm:h-3 shadow-lg shadow-blue-500/50"
                      : "bg-white/30 w-2 sm:w-3 h-2 sm:h-3 hover:bg-white/50"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section - ENHANCED with Nairobi context */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "5000+", label: "Happy Clients in Nairobi", icon: "fas fa-smile" },
              {
                number: "10+",
                label: "Years Experience in Nairobi",
                icon: "fas fa-award",
              },
              {
                number: "24/7",
                label: "Nairobi Customer Support",
                icon: "fas fa-headset",
              },
              {
                number: "100%",
                label: "Satisfaction Rate Nairobi",
                icon: "fas fa-star",
              },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 counter">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-blue-100 mb-3">{stat.label}</div>
                <div className="text-2xl sm:text-3xl text-blue-200">
                  <i className={stat.icon}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Nairobi Keywords */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
        data-section="services"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.services
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Professional Cleaning Services in Nairobi Kenya
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive cleaning solutions in Nairobi designed to meet your specific needs with the highest standards of quality and professionalism. Serving homes and businesses across Nairobi County.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover-lift hover-glow ${
                  isVisible.services
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${service.icon} text-white text-xl sm:text-2xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs sm:text-sm text-gray-500"
                    >
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Nairobi Focus */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-indigo-50"
        data-section="whyChoose"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.whyChoose
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Why Nairobi Customers Choose Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference when you choose our professional cleaning services in Nairobi Kenya, backed by years of expertise and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chooseBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-blue-500 ${
                  isVisible.whyChoose
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 sm:p-4 rounded-2xl mr-3 sm:mr-4 shadow-lg">
                    <i className={`${benefit.icon} text-white text-xl sm:text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <div className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold inline-block">
                      {benefit.stat}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Nairobi Context */}
      <section className="py-16 sm:py-24 bg-white" data-section="howItWorks">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.howItWorks
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              How Our Nairobi Cleaning Service Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple steps to get your Nairobi space cleaned professionally with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Book Nairobi Cleaning Service",
                description:
                  "Fill out our simple booking form to request a cleaning service tailored to your Nairobi location.",
                icon: "fas fa-calendar-plus",
              },
              {
                step: "2",
                title: "Nairobi Pre-Visit Assessment",
                description:
                  "Our Nairobi head of cleaning will visit to assess your needs and provide a detailed quote.",
                icon: "fas fa-clipboard-check",
              },
              {
                step: "3",
                title: "Professional Cleaning in Nairobi",
                description:
                  "Our skilled Nairobi cleaners will provide exceptional service with attention to every detail.",
                icon: "fas fa-broom",
              },
              {
                step: "4",
                title: "Quality Assurance in Nairobi",
                description:
                  "Enjoy your clean Nairobi space and provide feedback. We guarantee your satisfaction.",
                icon: "fas fa-star",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-500 ${
                  isVisible.howItWorks
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto shadow-xl">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <i className={`${step.icon} text-white text-xs sm:text-sm`}></i>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-1 bg-gradient-to-r from-blue-200 to-cyan-200 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos Section with Nairobi Context */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
        data-section="videos"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.videos
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              See Our Nairobi Team in Action
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch our professional cleaning experts in Nairobi deliver exceptional results with our proven methods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {cleaningVideos.map((video, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.videos
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative group">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-t-2xl"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <i className="fas fa-play-circle mr-2 text-red-500"></i>
                      <span>Watch on YouTube</span>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Full Video
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <a
              href="https://www.youtube.com/@yourchannelname"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/25 text-sm sm:text-base"
            >
              <i className="fab fa-youtube mr-2 sm:mr-3 text-lg sm:text-xl"></i>
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Our Projects Section with Nairobi Context */}
      <section className="py-16 sm:py-24 bg-white" data-section="projects">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our Recent Nairobi Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See the difference our professional cleaning services can make in transforming spaces across Nairobi Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  {project.video ? (
                    <iframe
                      src={
                        project.video.includes("youtube.com") ||
                        project.video.includes("youtu.be")
                          ? (() => {
                              let videoId;
                              if (project.video.includes("watch?v=")) {
                                videoId = project.video
                                  .split("watch?v=")[1]
                                  .split("&")[0];
                              } else if (project.video.includes("youtu.be/")) {
                                videoId = project.video
                                  .split("youtu.be/")[1]
                                  .split("?")[0];
                              }
                              return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&enablejsapi=1`;
                            })()
                          : project.video
                      }
                      title={project.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <Link
                    to="/projects"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm group-hover:translate-x-1 transition-all duration-300"
                  >
                    View Project
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/projects"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 text-sm sm:text-base"
            >
              <i className="fas fa-images mr-2"></i>
              View All Nairobi Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Nairobi Context */}
      {testimonials.length > 0 && (
        <section
          className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
          data-section="testimonials"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div
              className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
                isVisible.testimonials
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                What Our Nairobi Clients Say
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Hear from our satisfied Nairobi customers about their experience with our professional cleaning services in Kenya
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div
                className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden transition-all duration-1000 ${
                  isVisible.testimonials
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"></div>
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>

                <div className="flex items-center mb-6 sm:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${
                        i < testimonials[currentTestimonial]?.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 italic mb-6 sm:mb-10 leading-relaxed">
                  "{testimonials[currentTestimonial]?.comment}"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <p className="font-bold text-gray-800 text-base sm:text-lg">
                        {testimonials[currentTestimonial]?.name}
                      </p>
                      <p className="text-gray-500 text-sm sm:text-base">
                        {testimonials[currentTestimonial]?.serviceType} - Nairobi
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                          currentTestimonial === index
                            ? "bg-blue-600 w-6 sm:w-8 shadow-lg"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
        </section>
      )}

      {/* Professional Features Section - ENHANCED with Nairobi */}
      <section className="py-16 sm:py-24 bg-white" data-section="features">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Why Choose Our Nairobi Cleaning Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our cleaning services in Nairobi stand out from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "fas fa-shield-alt",
                title: "Fully Insured in Nairobi",
                description: "Complete coverage for your peace of mind in Nairobi",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "fas fa-clock",
                title: "Punctual Nairobi Service",
                description: "We value your time and always arrive on schedule in Nairobi",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "fas fa-leaf",
                title: "Eco-Friendly Nairobi Cleaning",
                description: "Environmentally safe cleaning products in Nairobi",
                color: "from-green-400 to-teal-500",
              },
              {
                icon: "fas fa-user-check",
                title: "Vetted Nairobi Staff",
                description: "Background-checked and trained Nairobi professionals",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: "fas fa-medal",
                title: "Nairobi Quality Guarantee",
                description: "100% satisfaction or we'll re-clean for free in Nairobi",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: "fas fa-credit-card",
                title: "Flexible Nairobi Payment",
                description: "Multiple payment options for your Nairobi convenience",
                color: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <i className={`${feature.icon} text-white text-2xl sm:text-3xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action with Nairobi Keywords */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden"
        data-section="cta"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-800/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Ready to Experience Professional Cleaning in Nairobi?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Book your Nairobi cleaning service today and enjoy a cleaner, healthier space with our guaranteed satisfaction
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/book"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-700 font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25 text-base sm:text-lg"
              >
                <i className="fas fa-calendar-check mr-2 sm:mr-3 text-lg sm:text-xl"></i>
                Book Nairobi Service Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-base sm:text-lg"
              >
                <i className="fas fa-phone mr-2 sm:mr-3 text-lg sm:text-xl"></i>
                Call Nairobi Office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Badges Section with Nairobi */}
      <section className="py-16 sm:py-20 bg-white" data-section="trust">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 ${
              isVisible.trust
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: "fas fa-shield-alt",
                title: "Insured & Bonded Nairobi",
                description: "Your Nairobi property is fully protected",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "fas fa-user-check",
                title: "Screened Nairobi Staff",
                description: "Background checked Nairobi professionals",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "fas fa-clock",
                title: "Reliable Nairobi Service",
                description: "On-time, every time guarantee in Nairobi",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: "fas fa-leaf",
                title: "Eco-Friendly Nairobi",
                description: "Green cleaning options available in Nairobi",
                color: "from-green-400 to-teal-500",
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${badge.color} rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={badge.icon}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {badge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`fixed bottom-28 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } hover:from-blue-700 hover:to-indigo-800 transform hover:scale-110`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
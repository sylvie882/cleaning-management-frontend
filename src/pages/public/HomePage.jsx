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
import { useEffect, useState, useCallback, useRef } from "react";
import { getTestimonials } from "../../features/testimonial/testimonialSlice";
import { ArrowUp, Star, MapPin, Shield, Clock, Leaf, Award, CreditCard, Play, X } from "lucide-react";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, BUSINESS_INFO, BASE_KEYWORDS } from "../../utils/seo";
import serviceService from "../../services/serviceService";

// ─── All Nairobi marketing areas (SEO-only, hidden from view) ───
const marketingAreas = {
  "Karen & Langata Region": ["Karen Road","Karen C Road","Karen Greens Estate","Karen Ridge Estate","Karen Brooks Estate","Langata Road","Langata Forest View Estate","Amani Ridge Karen","Nandi Road Karen","Bogani Karen","Sandalwood Estate Karen","Ololua Ridge","Marula Lane","Acacia Drive","Windy Ridge","Pepo Lane","Rhino Park Road","Elgeyo Marakwet Road","Safaripark Avenue","USIU Road","Kenyatta Road","Mokoyeti South Road","Mokoyeti West Road","Silanga Road","Giraffe Center","Bogani Rd","Park Place","Simba Hill","Saifee Park","Kipevu"],
  "Westlands & Parklands": ["Westlands","Parklands Road","Parklands","1st Parklands","2nd Parklands","3rd Parklands","4th Parklands","5th Parklands","6th Parklands","Loresho Lane","Loresho Ridge","Kyuna Road","Kyuna Crescent","Spring Valley","Muthangari Road","Lower Kabete Road","Upper Kabete Road","Dennis Pritt Road","Wood Avenue","General Mathenge Road","Eldama Ravine Road","Ojijo Road","Wambugu Road","Mwanzi Road","Runda Estate","Runda Road","Runda Grove","Runda Mumwe","Runda Riviera","Ridgeways","Ridgeways Drive","Rosslyn Green Close","Rosslyn Green Crescent","Thigiri Ridge","Thigiri Lane","Thigiri Valley"],
  "Kilimani & Kileleshwa": ["Kilimani Estate","Kileleshwa","Argwings Kodhek Road","Lenana Road","Ring Road Kilimani","Woodley Estate","Jamhuri Estate","Muthithi Road","Mpaka Road","Mogotio Road","Gitanga Road","Ngong Road","Valley Arcade","Braeside Gardens","Chania Avenue","Kirichwa Road"],
  "Lavington & Surrounding": ["Lavington","James Gichuru Road","Muthithi Gardens","Mugumo Crescent","Mbaazi Avenue","Msanduku Lane","Othaya Road","Kolloh Road","Cotton Road","Kayawe Road","Galana Road"],
  "Ngong & Surrounding Areas": ["Ngong Road","Ngong Forest View","Ngong View Road","Forest Line Road","Kiserian","Isinya","Tuala","Kisaju","Magadi Road","Amboseli Road","Olepolos","Maasai Road","Mbagathi Way","Narok","Naivasha","Nakuru County"],
  "Eastlands & Embakasi": ["Eastleigh Estate","California Estate","South C","South End Estate","Uhuru Gardens Estate","Highview Estate","Popo Road","Jogoo Road","Buruburu Phase 5","Kayole Road","Nasra Estate","Spine Road","Airport North Road","Syokimau","EPZ Road","Athi River","Mombasa Road","Katani Road"],
  "Kiambu & Thika Road Corridor": ["Kiambu Road","Thika Road","Ruaka","Ruiru","Juja","Garden Estate","Thome Estate","Ridgeways","Mangu Road","Kamiti Road","Kahawa West","Kahawa Sukari","Muthiga","Kinoo","Uthiru","Kikuyu Road","Dagoretti Road"],
  "Upperhill & City Center": ["Upper Hill","Museum Hill","University Way","Haile Selassie","Mamlaka Road","Nyerere Road","Parliament Road","Koinange Street","Moi Avenue","Kenyatta Avenue","Tom Mboya Street"],
};

const carouselData = [
  { image: cleaner1, title: "Professional Cleaning Services Across Nairobi", subtitle: "Serving Karen, Westlands, Runda, Kilimani & All Nairobi Areas", description: "Expert cleaning for homes and offices across all Nairobi neighborhoods. Carpet cleaning, sofa cleaning, deep cleaning at affordable prices.", serviceType: "Nairobi-Wide Cleaning" },
  { image: cleaner2, title: "House Cleaning Services | All Nairobi Estates Covered", subtitle: "Professional Residential Cleaning Across Nairobi", description: "Expert house cleaning for all estates in Karen, Lavington, Kileleshwa, Westlands, and surrounding areas. Deep cleaning, regular maintenance, move-in/out cleaning.", serviceType: "Estate Cleaning" },
  { image: cleaner3, title: "Office & Commercial Cleaning | Nairobi Business Districts", subtitle: "Trusted by 500+ Businesses Across Nairobi", description: "Commercial cleaning for offices and corporate spaces in Westlands, Upperhill, CBD, and beyond. Post-construction cleaning, carpet cleaning, and more.", serviceType: "Commercial Cleaning" },
];

const staticServices = [
  { title: "House Cleaning", description: "Professional residential cleaning for homes and apartments across all Nairobi neighborhoods.", icon: "fas fa-home", features: ["Regular Maintenance Cleaning", "Deep Cleaning Services", "Move-in/out Cleaning", "Custom Cleaning Schedules"], slug: "residential" },
  { title: "Office Cleaning", description: "Commercial cleaning solutions for offices, retail spaces, and businesses in Nairobi.", icon: "fas fa-building", features: ["Office Cleaning", "Retail Space Cleaning", "Industrial Cleaning", "24/7 Cleaning Service"], slug: "commercial" },
  { title: "Deep Cleaning", description: "Intensive cleaning to remove deep-seated dirt, allergens, and bacteria for all property types.", icon: "fas fa-broom", features: ["Allergen Removal", "Sanitization Services", "Hard-to-reach Areas", "Eco-friendly Cleaning"], slug: "deep-cleaning" },
  { title: "Specialized Cleaning", description: "Carpet, upholstery, windows, and post-construction cleaning across Nairobi.", icon: "fas fa-sparkles", features: ["Carpet Cleaning", "Sofa Cleaning", "Post-construction Cleaning", "Event Cleanup Services"], slug: "specialized" },
];

const chooseBenefits = [
  { title: "Nairobi-Wide Coverage", description: "We serve all areas: Karen, Westlands, Runda, Kilimani, Lavington, and 500+ more neighborhoods.", icon: "fas fa-map-marker-alt", stat: "500+ Areas Served" },
  { title: "Custom Cleaning Plans", description: "Personalized plans tailored to your specific needs and your location's requirements.", icon: "fas fa-sliders-h", stat: "100% Custom" },
  { title: "Satisfaction Guarantee", description: "Not satisfied? We'll re-clean at no cost. Your happiness is our commitment.", icon: "fas fa-medal", stat: "100% Guarantee" },
  { title: "Local Area Experts", description: "Our teams know every Nairobi neighborhood and understand local cleaning requirements.", icon: "fas fa-users", stat: "Local Knowledge" },
  { title: "Flexible Scheduling", description: "One-time, weekly, bi-weekly, or monthly — book any time across all areas.", icon: "fas fa-calendar-alt", stat: "24/7 Booking" },
  { title: "Transparent Pricing", description: "No hidden fees. Clear, upfront pricing for all cleaning services in all areas.", icon: "fas fa-tag", stat: "No Hidden Fees" },
];

const cleaningVideos = [
  { id: "6s2Vp91YUHw", title: "Professional Home Deep Cleaning Process", description: "Watch our team transform a family home with our comprehensive deep cleaning.", category: "Deep Cleaning" },
  { id: "GgoW5zpDVaM", title: "Commercial Office Cleaning Standards", description: "See how we maintain the highest cleaning standards for corporate environments.", category: "Commercial" },
  { id: "U_Wa8nol86k", title: "Move-Out Cleaning Transformation", description: "Complete move-out cleaning service that ensures you get your full deposit back.", category: "Move-Out" },
  { id: "MA3sA8Yt62Q", title: "Eco-Friendly Cleaning Techniques", description: "Our environmentally safe cleaning methods and premium products.", category: "Residential" },
];

const projects = [
  { title: "Luxury Home Cleaning — Karen", description: "Complete cleaning transformation of a 5-bedroom luxury home in Karen", image: cleaner1, videoId: "XpvmwxpQaGo", category: "Residential", stats: { area: "4,500 sq ft", time: "6 hrs", team: "4 cleaners" } },
  { title: "Corporate Office — Westlands", description: "Post-construction cleaning for a new corporate HQ in Westlands", image: cleaner3, videoId: null, category: "Commercial", stats: { area: "25,000 sq ft", time: "3 days", team: "12 cleaners" } },
  { title: "Restaurant Deep Clean — Kilimani", description: "Overnight deep cleaning for a popular restaurant in Kilimani", image: cleaner4, videoId: "TQG_WgXoytk", category: "Deep Cleaning", stats: { area: "3,200 sq ft", time: "8 hrs", team: "6 cleaners" } },
  { title: "Event Venue Cleaning — Runda", description: "Same-day cleaning for a major corporate event venue in Runda", image: cleaner10, videoId: "So3b46JgkAc", category: "Special Services", stats: { area: "15,000 sq ft", time: "4 hrs", team: "8 cleaners" } },
];

// ── SEO Structured Data ──────────────────────────────────────────
const allAreas = Object.values(marketingAreas).flat();

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BUSINESS_INFO.name,
  image: heroImage,
  "@id": BUSINESS_INFO.url,
  url: BUSINESS_INFO.url,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  priceRange: "$$",
  description: "Professional cleaning services: house cleaning, office cleaning, carpet cleaning, sofa cleaning, deep cleaning across all Nairobi areas. Certified, insured, 5000+ happy clients.",
  address: { "@type": "PostalAddress", streetAddress: "Dale House, Rhapta Road, Fox Close", addressLocality: "Nairobi", addressRegion: "Nairobi", postalCode: "00100", addressCountry: "KE" },
  geo: { "@type": "GeoCoordinates", latitude: "-1.2921", longitude: "36.8219" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "15:00" }
  ],
  sameAs: BUSINESS_INFO.sameAs,
  areaServed: allAreas.slice(0, 50).map(area => ({ "@type": "City", name: area })),
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Cleaning Services",
    itemListElement: ["House Cleaning","Office Cleaning","Deep Cleaning","Carpet Cleaning","Sofa Cleaning","Post Construction Cleaning","Move-In/Move-Out Cleaning"].map(s => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } }))
  }
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What areas in Nairobi do you serve?", acceptedAnswer: { "@type": "Answer", text: "We serve all areas across Nairobi including Karen, Westlands, Runda, Kilimani, Lavington, Kileleshwa, Parklands, Muthaiga, and 500+ more neighborhoods." } },
    { "@type": "Question", name: "How do I book a cleaning service?", acceptedAnswer: { "@type": "Answer", text: "You can book online at our website, call us at +254726933261, or message us on WhatsApp. We offer flexible scheduling 7 days a week." } },
    { "@type": "Question", name: "Are your cleaners vetted and insured?", acceptedAnswer: { "@type": "Answer", text: "Yes, all our cleaners are background-checked, professionally trained, and fully insured for your peace of mind." } },
    { "@type": "Question", name: "Do you offer eco-friendly cleaning?", acceptedAnswer: { "@type": "Answer", text: "Yes, we use environmentally safe, non-toxic cleaning products that are safe for your family, pets, and the environment." } },
  ]
};

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatingText, setAnimatingText] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [apiServices, setApiServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [isVisible, setIsVisible] = useState({
    hero: false, services: false, whyChoose: false, howItWorks: false,
    videos: false, projects: false, testimonials: false, cta: false, trust: false,
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const response = await serviceService.getServices();
        console.log("Fetched services from API:", response);
        
        if (response && response.data && Array.isArray(response.data)) {
          setApiServices(response.data);
        } else if (response && response.services && Array.isArray(response.services)) {
          setApiServices(response.services);
        } else if (Array.isArray(response)) {
          setApiServices(response);
        } else {
          console.warn("Unexpected API response format:", response);
          setApiServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setApiServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1), 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingText(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev === carouselData.length - 1 ? 0 : prev + 1);
        setTimeout(() => setAnimatingText(false), 100);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(prev => ({ ...prev, [entry.target.dataset.section]: true }));
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll("[data-section]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Function to get icon class based on service title
  const getServiceIcon = (title) => {
    const iconMap = {
      "House Cleaning": "fas fa-home",
      "Office Cleaning": "fas fa-building",
      "Deep Cleaning": "fas fa-broom",
      "Specialized Cleaning": "fas fa-sparkles",
      "Carpet Cleaning": "fas fa-carpet",
      "Sofa Cleaning": "fas fa-couch",
      "Window Cleaning": "fas fa-window-maximize",
      "Post Construction": "fas fa-hard-hat",
    };
    return iconMap[title] || "fas fa-brush";
  };

  // Function to get features array from service data
  const getServiceFeatures = (service) => {
    if (service.features && Array.isArray(service.features) && service.features.length > 0) {
      return service.features;
    }
    if (service.description) {
      const shortDesc = service.description.length > 100 
        ? service.description.substring(0, 100) 
        : service.description;
      return [shortDesc];
    }
    return ["Professional Service", "Quality Guaranteed", "Affordable Rates"];
  };

  // Get first video from service's youtubeVideos array
  const getServiceVideo = (service) => {
    if (service.youtubeVideos && service.youtubeVideos.length > 0) {
      const video = service.youtubeVideos[0];
      return video.videoId || video.id || (video.url ? video.url.split('v=')[1]?.split('&')[0] : null);
    }
    return null;
  };

  // Combine static and API services, but prioritize API services if available
  const allServices = apiServices.length > 0 ? apiServices : staticServices;

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>Professional Cleaning Services in Nairobi | Sylvie Cleaning Services</title>
        <meta name="description" content="Nairobi's top-rated cleaning company. Professional house cleaning, office cleaning, carpet & sofa cleaning, deep cleaning across Karen, Westlands, Kilimani & all Nairobi areas. Call 0726 933 261." />
        <meta name="keywords" content={[...BASE_KEYWORDS, "cleaning services Karen", "cleaning services Westlands", "cleaning services Runda", "carpet cleaning Nairobi", "sofa cleaning Nairobi", "house cleaner near me Nairobi"].join(", ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={BUSINESS_INFO.url} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BUSINESS_INFO.url} />
        <meta property="og:title" content="Professional Cleaning Services in Nairobi | Sylvie Cleaning Services" />
        <meta property="og:description" content="Nairobi's top-rated cleaning company. House cleaning, office cleaning, carpet cleaning across Karen, Westlands, Kilimani & all Nairobi areas." />
        <meta property="og:image" content={heroImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Sylvie Cleaning Services" />
        <meta property="og:locale" content="en_KE" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sylviecleaning" />
        <meta name="twitter:creator" content="@sylviecleaning" />
        <meta name="twitter:title" content="Professional Cleaning Services in Nairobi | Sylvie Cleaning Services" />
        <meta name="twitter:description" content="Nairobi's top-rated cleaning company. House cleaning, office cleaning, carpet cleaning across all Nairobi areas." />
        <meta name="twitter:image" content={heroImage} />
        {/* Geo */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <meta name="city" content="Nairobi" />
        <meta name="country" content="Kenya" />
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema([{ name: "Home", path: "/" }]))}</script>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden" data-section="hero" aria-label="Hero section">
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {carouselData.map((slide, index) => (
            <div key={index} className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
              style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%), url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
            />
          ))}
        </div>

        

        <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 flex items-center justify-center">
         <div className="text-center max-w-5xl w-full pt-[200px] lg:pt-[180px]">
            <div className={`transition-all duration-700 ease-out ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight transition-all duration-500 ${animatingText ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                {carouselData[currentSlide].title}
              </h1>
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-light text-red-200 mb-6 transition-all duration-500 ${animatingText ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                {carouselData[currentSlide].subtitle}
              </h2>
              <p className={`text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${animatingText ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                {carouselData[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/book" aria-label={`Book ${carouselData[currentSlide].serviceType}`}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-2xl text-base sm:text-lg">
                  <i className="fas fa-calendar-check mr-3" aria-hidden="true" />
                  Book {carouselData[currentSlide].serviceType}
                </Link>
                <a href="tel:+254726933261" aria-label="Call us now"
                  className="inline-flex items-center bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 text-base sm:text-lg">
                  <i className="fas fa-phone mr-3" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-14 space-x-3" role="tablist" aria-label="Slide selector">
              {carouselData.map((_, index) => (
                <button key={index} role="tab" aria-selected={currentSlide === index} aria-label={`Go to slide ${index + 1}`}
                  onClick={() => { setAnimatingText(true); setTimeout(() => { setCurrentSlide(index); setTimeout(() => setAnimatingText(false), 100); }, 500); }}
                  className={`transition-all duration-300 rounded-full ${currentSlide === index ? "bg-red-600 w-10 h-3 shadow-lg" : "bg-white/30 w-3 h-3 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL SERVICES SECTION ── */}
      <section className="py-16 bg-gray-50" data-section="services" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Professional Cleaning Services Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive cleaning solutions designed for your specific needs, delivered with the highest standards of quality across every Nairobi neighborhood.</p>
          </div>

          {loadingServices ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allServices.slice(0, 6).map((service, index) => {
                const serviceVideo = getServiceVideo(service);
                
                return (
                  <article 
                    key={service._id || index}
                    className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    aria-label={`${service.name || service.title} cleaning service`}
                  >
                    {serviceVideo && (
                      <div className="relative bg-gray-900 w-full" style={{ minHeight: "280px" }}>
                        <iframe
                          className="w-full h-full absolute top-0 left-0"
                          style={{ minHeight: "280px" }}
                          src={`https://www.youtube.com/embed/${serviceVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&loop=1&playlist=${serviceVideo}&mute=1`}
                          title={service.name || service.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">{service.name || service.title}</h3>
                      <p className="text-gray-500 mb-4 leading-relaxed text-sm">
                        {service.description && service.description.length > 120 
                          ? `${service.description.substring(0, 120)}...` 
                          : service.description || "Professional cleaning service tailored to your needs."}
                      </p>
                      <Link to={`/services/${service.slug || service._id}`} aria-label={`Learn more about ${service.name || service.title}`}
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                        Learn More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/services" aria-label="View all cleaning services" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg">
              <i className="fas fa-th-list" aria-hidden="true" />
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 bg-white" data-section="whyChoose" aria-labelledby="why-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="why-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Why Customers Trust Us Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Backed by years of expertise, our commitment to excellence makes us Nairobi's most trusted cleaning company.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chooseBenefits.map((benefit, index) => (
              <div key={index}
                className={`bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.whyChoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms`, borderLeft: "4px solid #dc2626" }}>
                <div className="flex items-start mb-5">
                  <div className="bg-red-600 p-3 rounded-2xl mr-4 shadow-md flex-shrink-0" aria-hidden="true">
                    <i className={`${benefit.icon} text-white text-xl`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h3>
                    <span className="bg-red-50 text-red-700 px-3 py-0.5 rounded-full text-xs font-semibold">{benefit.stat}</span>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-gray-50" data-section="howItWorks" aria-labelledby="how-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="how-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              How Our Cleaning Service Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Simple steps to get your space professionally cleaned across all Nairobi areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Book Online", description: "Fill out our simple booking form for any location in Nairobi.", icon: "fas fa-calendar-plus" },
              { step: "2", title: "Assessment Visit", description: "Our head of cleaning visits, assesses your needs, and provides a detailed quote.", icon: "fas fa-clipboard-check" },
              { step: "3", title: "Professional Clean", description: "Our skilled local cleaners deliver exceptional service with attention to every detail.", icon: "fas fa-broom" },
              { step: "4", title: "Quality Check", description: "Enjoy your clean space. We guarantee your satisfaction — or we re-clean for free.", icon: "fas fa-star" },
            ].map((step, index) => (
              <div key={index}
                className={`relative text-center transition-all duration-500 ${isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-xl" aria-hidden="true">{step.step}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center" aria-hidden="true">
                    <i className={`${step.icon} text-white text-sm`} />
                  </div>
                  {index < 3 && <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-red-200" aria-hidden="true" />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="py-16 bg-white" data-section="videos" aria-labelledby="videos-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="videos-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Watch Our Team Clean Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Professional cleaning experts delivering exceptional results in various Nairobi neighborhoods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cleaningVideos.map((video, index) => {
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.videos ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} 
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-gray-900" style={{ minHeight: "300px" }}>
                    <iframe
                      className="w-full h-full absolute top-0 left-0"
                      style={{ minHeight: "300px" }}
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&loop=1&playlist=${video.id}&mute=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">{video.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{video.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="py-16 bg-gray-50" data-section="projects" aria-labelledby="projects-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Recent Projects Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">See the transformation our professional cleaning services deliver across different Nairobi neighborhoods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {projects.map((project, index) => {
              return (
                <article 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-gray-900" style={{ minHeight: "220px" }}>
                    {project.videoId ? (
                      <iframe
                        className="w-full h-full absolute top-0 left-0"
                        style={{ minHeight: "220px" }}
                        src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&loop=1&playlist=${project.videoId}&mute=1`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ minHeight: "220px", maxHeight: "220px" }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <span className="absolute bottom-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">{project.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {Object.entries(project.stats).map(([key, val]) => (
                        <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{val}</span>
                      ))}
                    </div>
                    {!project.videoId && (
                      <Link to="/projects" aria-label={`View ${project.title} project details`} className="inline-flex items-center text-red-600 hover:text-red-800 font-semibold text-xs group-hover:translate-x-1 transition-all duration-300">
                        View Project
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" aria-label="View all cleaning projects" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg">
              <i className="fas fa-images" aria-hidden="true" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white" data-section="testimonials" aria-labelledby="testimonials-heading">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                What Our Clients Say
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <blockquote className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ border: "1px solid #e5e7eb" }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600" aria-hidden="true" />
                <div className="flex mb-6" aria-label={`${testimonials[currentTestimonial]?.rating} out of 5 stars`} role="img">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} className={i < testimonials[currentTestimonial]?.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-light text-gray-700 italic mb-8 leading-relaxed">"{testimonials[currentTestimonial]?.comment}"</p>
                <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg" aria-hidden="true">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <cite className="not-italic font-bold text-gray-800">{testimonials[currentTestimonial]?.name}</cite>
                      <p className="text-gray-500 text-sm">{testimonials[currentTestimonial]?.serviceType}</p>
                      <p className="text-red-600 text-xs font-medium flex items-center gap-1">
                        <MapPin size={10} aria-hidden="true" />{testimonials[currentTestimonial]?.area || "Nairobi"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2" role="tablist" aria-label="Testimonial selector">
                    {testimonials.map((_, index) => (
                      <button key={index} role="tab" aria-selected={currentTestimonial === index} aria-label={`View testimonial ${index + 1}`}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`rounded-full transition-all duration-300 ${currentTestimonial === index ? "bg-red-600 w-8 h-3" : "bg-gray-300 w-3 h-3 hover:bg-gray-400"}`} />
                    ))}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST FEATURES ── */}
      <section className="py-16 bg-gray-50" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Commitment to You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What makes our cleaning services stand out in every Nairobi neighborhood</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { Icon: Shield, title: "Fully Insured", color: "#dc2626" },
              { Icon: Clock, title: "Always Punctual", color: "#dc2626" },
              { Icon: Leaf, title: "Eco-Friendly", color: "#dc2626" },
              { Icon: Award, title: "Vetted Staff", color: "#dc2626" },
              { Icon: Star, title: "100% Guarantee", color: "#dc2626" },
              { Icon: CreditCard, title: "Flexible Payment", color: "#dc2626" },
            ].map(({ Icon, title, color }, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${color}15` }}>
                  <Icon size={22} style={{ color }} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 relative overflow-hidden" data-section="cta" aria-labelledby="cta-heading" style={{ background: "#dc2626" }}>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Ready for a Spotless Space in Your Area?
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-10 max-w-3xl mx-auto">Book today and enjoy a cleaner, healthier environment — guaranteed across all Nairobi neighborhoods.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/book" aria-label="Book a cleaning service now"
                className="inline-flex items-center bg-white hover:bg-gray-50 text-red-600 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-2xl text-lg gap-3">
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book Service Now
              </Link>
              <a href="tel:+254726933261" aria-label="Call our office"
                className="inline-flex items-center bg-black hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all text-lg gap-3">
                <i className="fas fa-phone" aria-hidden="true" />
                0726 933 261
              </a>
            </div>
            <p className="text-red-100 text-sm mt-8 flex items-center justify-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              Serving Karen, Westlands, Runda, Kilimani, Lavington and 500+ Nairobi locations
            </p>
          </div>
        </div>
      </section>

      {/* ── SEO-ONLY AREAS SECTION (hidden visually but indexable) ── */}
      <div aria-hidden="true" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        <h2>Cleaning Services Available In All Nairobi Areas</h2>
        {Object.entries(marketingAreas).map(([region, areas]) => (
          <div key={region}>
            <h3>{region}</h3>
            <p>Professional cleaning services available in: {areas.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Scroll to Top */}
      <button
        className={`fixed bottom-28 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 hover:scale-110 ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        style={{ background: "#dc2626" }}
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>
    </div>
  );
};

export default HomePage;
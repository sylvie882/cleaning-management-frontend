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
import { useEffect, useState, useCallback } from "react";
import { getTestimonials } from "../../features/testimonial/testimonialSlice";
import { ArrowUp, Star, MapPin, Shield, Clock, Leaf, Award, CreditCard } from "lucide-react";
import {
  buildLocalBusinessSchema, buildBreadcrumbSchema,
  BUSINESS_INFO, ALL_KEYWORDS, PRIMARY_KEYWORDS, SERVICE_KEYWORDS,
  AREA_KEYWORDS, WEBSITE_SCHEMA, ORGANIZATION_SCHEMA,
} from "../../utils/seo";

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
  { image: cleaner1, title: "Professional Cleaning Services Across Nairobi", subtitle: "Serving Karen, Westlands, Runda, Kilimani & All Nairobi Areas", description: "Expert cleaning for homes and offices across all Nairobi neighborhoods. Carpet cleaning, sofa cleaning, deep cleaning at affordable prices.", serviceType: "Nairobi-Wide Cleaning", accent: "from-blue-500 to-cyan-500" },
  { image: cleaner2, title: "House Cleaning Services | All Nairobi Estates Covered", subtitle: "Professional Residential Cleaning Across Nairobi", description: "Expert house cleaning for all estates in Karen, Lavington, Kileleshwa, Westlands, and surrounding areas. Deep cleaning, regular maintenance, move-in/out cleaning.", serviceType: "Estate Cleaning", accent: "from-green-500 to-emerald-500" },
  { image: cleaner3, title: "Office & Commercial Cleaning | Nairobi Business Districts", subtitle: "Trusted by 500+ Businesses Across Nairobi", description: "Commercial cleaning for offices and corporate spaces in Westlands, Upperhill, CBD, and beyond. Post-construction cleaning, carpet cleaning, and more.", serviceType: "Commercial Cleaning", accent: "from-purple-500 to-indigo-500" },
];

const services = [
  { title: "House Cleaning", description: "Professional residential cleaning for homes and apartments across all Nairobi neighborhoods.", icon: "fas fa-home", features: ["Regular Maintenance Cleaning", "Deep Cleaning Services", "Move-in/out Cleaning", "Custom Cleaning Schedules"], color: "from-blue-500 to-cyan-500", slug: "residential" },
  { title: "Office Cleaning", description: "Commercial cleaning solutions for offices, retail spaces, and businesses in Nairobi.", icon: "fas fa-building", features: ["Office Cleaning", "Retail Space Cleaning", "Industrial Cleaning", "24/7 Cleaning Service"], color: "from-purple-500 to-indigo-500", slug: "commercial" },
  { title: "Deep Cleaning", description: "Intensive cleaning to remove deep-seated dirt, allergens, and bacteria for all property types.", icon: "fas fa-broom", features: ["Allergen Removal", "Sanitization Services", "Hard-to-reach Areas", "Eco-friendly Cleaning"], color: "from-green-500 to-emerald-500", slug: "deep-cleaning" },
  { title: "Specialized Cleaning", description: "Carpet, upholstery, windows, and post-construction cleaning across Nairobi.", icon: "fas fa-sparkles", features: ["Carpet Cleaning", "Sofa Cleaning", "Post-construction Cleaning", "Event Cleanup Services"], color: "from-orange-500 to-red-500", slug: "specialized" },
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
  { title: "Luxury Home Cleaning — Karen", description: "Complete cleaning transformation of a 5-bedroom luxury home in Karen", image: cleaner1, video: "https://youtu.be/XpvmwxpQaGo?si=15-wQ-dyMH3fMCSq", category: "Residential", stats: { area: "4,500 sq ft", time: "6 hrs", team: "4 cleaners" } },
  { title: "Corporate Office — Westlands", description: "Post-construction cleaning for a new corporate HQ in Westlands", image: cleaner3, category: "Commercial", stats: { area: "25,000 sq ft", time: "3 days", team: "12 cleaners" } },
  { title: "Restaurant Deep Clean — Kilimani", description: "Overnight deep cleaning for a popular restaurant in Kilimani", image: cleaner4, video: "https://youtu.be/TQG_WgXoytk?si=jcUiX7jVG86sCcYp", category: "Deep Cleaning", stats: { area: "3,200 sq ft", time: "8 hrs", team: "6 cleaners" } },
  { title: "Event Venue Cleaning — Runda", description: "Same-day cleaning for a major corporate event venue in Runda", image: cleaner10, video: "https://youtu.be/So3b46JgkAc?si=y7HJtpqvZ6B6UWPH", category: "Special Services", stats: { area: "15,000 sq ft", time: "4 hrs", team: "8 cleaners" } },
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
  const [expandedRegions, setExpandedRegions] = useState({});
  const [isVisible, setIsVisible] = useState({
    hero: false, services: false, whyChoose: false, howItWorks: false,
    videos: false, projects: false, testimonials: false, cta: false, trust: false, areas: false,
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── SEO HEAD ── */}
      <Helmet>
        {/*
          TITLE: Primary keyword first, brand name last.
          Matches top-ranking competitor format but adds "Kenya" for
          local disambiguation + "7+ yrs" for E-E-A-T trust.
        */}
        <title>Cleaning Services in Nairobi Kenya | House, Office, Carpet &amp; Deep Cleaning | Sylvie Cleaning Services</title>

        {/*
          DESCRIPTION: 155 chars, packs primary + service + area keywords.
          Includes phone number → drives direct calls from SERPs.
        */}
        <meta name="description" content="Best cleaning services in Nairobi Kenya — house cleaning, office cleaning, carpet cleaning, sofa set cleaning &amp; deep cleaning. Vetted, insured staff. 5,000+ happy clients. Call 0726 933 261. Serving Karen, Westlands, Runda, Kilimani &amp; 500+ areas." />

        {/* Full keyword meta — primary + service + area + long-tail */}
        <meta name="keywords" content={ALL_KEYWORDS.join(", ")} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Sylvie Intercleaning Company Limited" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <link rel="canonical" href={BUSINESS_INFO.url} />

        {/* ── Open Graph (Facebook / LinkedIn / WhatsApp previews) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BUSINESS_INFO.url} />
        <meta property="og:title" content="Best Cleaning Services in Nairobi Kenya | Sylvie Cleaning Services" />
        <meta property="og:description" content="House cleaning, office cleaning, carpet cleaning, sofa set cleaning &amp; deep cleaning across Karen, Westlands, Runda, Kilimani &amp; 500+ Nairobi areas. 5,000+ happy clients. Call 0726 933 261." />
        <meta property="og:image" content={heroImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sylvie Cleaning Services — Professional Cleaners in Nairobi Kenya" />
        <meta property="og:site_name" content="Sylvie Cleaning Services" />
        <meta property="og:locale" content="en_KE" />

        {/* ── Twitter / X Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sylviecleaning" />
        <meta name="twitter:creator" content="@sylviecleaning" />
        <meta name="twitter:title" content="Best Cleaning Services in Nairobi Kenya | Sylvie Cleaning Services" />
        <meta name="twitter:description" content="House cleaning, office cleaning, carpet &amp; sofa cleaning across all Nairobi areas. 5,000+ happy clients. Book online or call 0726 933 261." />
        <meta name="twitter:image" content={heroImage} />
        <meta name="twitter:image:alt" content="Sylvie Cleaning Services Nairobi" />

        {/* ── Geo / Local SEO signals ── */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <meta name="city" content="Nairobi" />
        <meta name="state" content="Nairobi County" />
        <meta name="country" content="Kenya" />
        <meta name="zipcode" content="00100" />
        <meta name="language" content="English" />
        <meta name="distribution" content="local" />
        <meta name="coverage" content="Nairobi, Kenya" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />

        {/* ── Structured Data: 5 schemas for maximum SERP features ── */}

        {/* 1 — LocalBusiness (stars, hours, address in SERPs) */}
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>

        {/* 2 — FAQPage (expandable FAQ in SERPs) */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        {/* 3 — BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema([{ name: "Home", path: "/" }]))}</script>

        {/* 4 — WebSite (enables Sitelinks Search Box in Google) */}
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>

        {/* 5 — Organization (Knowledge Panel signals) */}
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>

        {/* ── Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden pt-44 md:pt-44 lg:pt-44" data-section="hero" aria-label="Hero section">
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {carouselData.map((slide, index) => (
            <div key={index} className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
              style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%), url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 flex items-center justify-center">
          <div className="text-center max-w-5xl w-full">
            <div className={`transition-all duration-700 ease-out ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-pulse-slow" aria-label="Trust indicator">
                <Star size={12} className="text-yellow-300" aria-hidden="true" />
                Nairobi's #1 Rated Cleaning Company · 5000+ Happy Clients
              </div>

              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight transition-all duration-500 ${animatingText ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                {carouselData[currentSlide].title}
              </h1>
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-light text-blue-200 mb-6 transition-all duration-500 ${animatingText ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                {carouselData[currentSlide].subtitle}
              </h2>
              <p className={`text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${animatingText ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                {carouselData[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/book" aria-label={`Book ${carouselData[currentSlide].serviceType}`}
                  className={`inline-flex items-center bg-gradient-to-r ${carouselData[currentSlide].accent} hover:scale-105 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-2xl text-base sm:text-lg`}
                  style={{ boxShadow: "0 8px 30px rgba(37,99,235,0.4)" }}>
                  <i className="fas fa-calendar-check mr-3" aria-hidden="true" />
                  Book {carouselData[currentSlide].serviceType}
                </Link>
                <a href="tel:+254726933261" aria-label="Call us now"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 text-base sm:text-lg">
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
                  className={`transition-all duration-300 rounded-full ${currentSlide === index ? "bg-blue-400 w-10 h-3 shadow-lg" : "bg-white/30 w-3 h-3 hover:bg-white/50"}`}
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

      {/* ── STATS BANNER ── */}
      <section className="py-16 sm:py-20 relative overflow-hidden" aria-label="Key statistics" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #312e81 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5,000+", label: "Happy Clients", icon: "fas fa-smile" },
              { number: "500+", label: "Areas Served", icon: "fas fa-map-marker-alt" },
              { number: "24/7", label: "Customer Support", icon: "fas fa-headset" },
              { number: "100%", label: "Satisfaction Rate", icon: "fas fa-star" },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.number}</div>
                <div className="text-sm text-blue-100 mb-3">{stat.label}</div>
                <i className={`${stat.icon} text-2xl text-blue-200`} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 sm:py-28 bg-gray-50" data-section="services" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Professional Cleaning Services<br className="hidden md:block" /> Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Comprehensive cleaning solutions designed for your specific needs, delivered with the highest standards of quality across every Nairobi neighborhood.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <article key={index}
                className={`group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-label={`${service.title} cleaning service`}
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                  <i className={`${service.icon} text-white text-xl`} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-500 mb-5 leading-relaxed text-sm">{service.description}</p>
                <ul className="space-y-2 mb-5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-500">
                      <i className="fas fa-check text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />{feature}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${service.slug}`} aria-label={`Learn more about ${service.title}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" aria-label="View all cleaning services" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg">
              <i className="fas fa-th-list" aria-hidden="true" />
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 sm:py-28 bg-white" data-section="whyChoose" aria-labelledby="why-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.whyChoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 id="why-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Why Customers Trust Us<br className="hidden md:block" /> Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Backed by years of expertise, our commitment to excellence makes us Nairobi's most trusted cleaning company.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chooseBenefits.map((benefit, index) => (
              <div key={index}
                className={`bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-blue-500 ${isVisible.whyChoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms`, borderLeft: "4px solid #2563eb" }}>
                <div className="flex items-start mb-5">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl mr-4 shadow-md flex-shrink-0" aria-hidden="true">
                    <i className={`${benefit.icon} text-white text-xl`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h3>
                    <span className="bg-blue-50 text-blue-700 px-3 py-0.5 rounded-full text-xs font-semibold">{benefit.stat}</span>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-28 bg-gray-50" data-section="howItWorks" aria-labelledby="how-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 id="how-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>How Our Cleaning Service Works</h2>
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
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-xl" aria-hidden="true">{step.step}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <i className={`${step.icon} text-white text-sm`} />
                  </div>
                  {index < 3 && <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200 translate-x-4" aria-hidden="true" />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="py-20 sm:py-28 bg-white" data-section="videos" aria-labelledby="videos-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.videos ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">See Us In Action</span>
            <h2 id="videos-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Watch Our Team Clean Across Nairobi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Professional cleaning experts delivering exceptional results in various Nairobi neighborhoods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cleaningVideos.map((video, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.videos ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="relative">
                  <div className="aspect-video">
                    <iframe className="w-full h-full rounded-t-2xl" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
                  </div>
                  <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{video.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{video.description}</p>
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube`}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105">
                    Watch on YouTube
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="py-20 sm:py-28 bg-gray-50" data-section="projects" aria-labelledby="projects-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Work</span>
            <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Recent Projects Across Nairobi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">See the transformation our professional cleaning services deliver across different Nairobi neighborhoods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <article key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  {project.video ? (
                    <iframe src={(() => { const id = project.video.includes("youtu.be/") ? project.video.split("youtu.be/")[1].split("?")[0] : project.video.split("watch?v=")[1]?.split("&")[0]; return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1`; })()} title={project.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                  ) : (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <span className="absolute bottom-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">{project.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-500 text-xs mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {Object.entries(project.stats).map(([key, val]) => (
                      <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{val}</span>
                    ))}
                  </div>
                  <Link to="/projects" aria-label={`View ${project.title} project details`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs group-hover:translate-x-1 transition-all duration-300">
                    View Project
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" aria-label="View all cleaning projects" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg">
              <i className="fas fa-images" aria-hidden="true" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-20 sm:py-28 bg-white" data-section="testimonials" aria-labelledby="testimonials-heading">
          <div className="container mx-auto px-4 sm:px-6">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Client Stories</span>
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What Our Clients Say</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <blockquote className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ border: "1px solid #e5e7eb" }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600" aria-hidden="true" />
                <div className="flex mb-6" aria-label={`${testimonials[currentTestimonial]?.rating} out of 5 stars`} role="img">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} className={i < testimonials[currentTestimonial]?.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-light text-gray-700 italic mb-8 leading-relaxed">"{testimonials[currentTestimonial]?.comment}"</p>
                <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg" aria-hidden="true">
                      {testimonials[currentTestimonial]?.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <cite className="not-italic font-bold text-gray-800">{testimonials[currentTestimonial]?.name}</cite>
                      <p className="text-gray-500 text-sm">{testimonials[currentTestimonial]?.serviceType}</p>
                      <p className="text-blue-600 text-xs font-medium flex items-center gap-1">
                        <MapPin size={10} aria-hidden="true" />{testimonials[currentTestimonial]?.area || "Nairobi"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2" role="tablist" aria-label="Testimonial selector">
                    {testimonials.map((_, index) => (
                      <button key={index} role="tab" aria-selected={currentTestimonial === index} aria-label={`View testimonial ${index + 1}`}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`rounded-full transition-all duration-300 ${currentTestimonial === index ? "bg-blue-600 w-8 h-3" : "bg-gray-300 w-3 h-3 hover:bg-gray-400"}`} />
                    ))}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST FEATURES ── */}
      <section className="py-20 bg-gray-50" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Our Commitment to You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What makes our cleaning services stand out in every Nairobi neighborhood</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { Icon: Shield, title: "Fully Insured", color: "#10b981" },
              { Icon: Clock, title: "Always Punctual", color: "#2563eb" },
              { Icon: Leaf, title: "Eco-Friendly", color: "#16a34a" },
              { Icon: Award, title: "Vetted Staff", color: "#7c3aed" },
              { Icon: Star, title: "100% Guarantee", color: "#d97706" },
              { Icon: CreditCard, title: "Flexible Payment", color: "#db2777" },
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
      <section className="py-20 sm:py-28 relative overflow-hidden" data-section="cta" aria-labelledby="cta-heading" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #312e81 100%)" }}>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Ready for a Spotless<br className="hidden md:block" /> Space in Your Area?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">Book today and enjoy a cleaner, healthier environment — guaranteed across all Nairobi neighborhoods.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/book" aria-label="Book a cleaning service now"
                className="inline-flex items-center bg-white hover:bg-gray-50 text-blue-700 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-2xl text-lg gap-3">
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book Service Now
              </Link>
              <a href="tel:+254726933261" aria-label="Call our office"
                className="inline-flex items-center bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition-all border-2 border-white/30 hover:border-white/50 text-lg gap-3">
                <i className="fas fa-phone" aria-hidden="true" />
                0726 933 261
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-8 flex items-center justify-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              Serving Karen, Westlands, Runda, Kilimani, Lavington and 500+ Nairobi locations
            </p>
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE ── */}
      <section className="py-20 sm:py-28 bg-white" data-section="areas" aria-labelledby="areas-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-14 transition-all duration-1000 ${isVisible.areas ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Where We Work</span>
            <h2 id="areas-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Areas We Serve Across Nairobi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From Karen to Kasarani, our vetted cleaning teams cover every major Nairobi neighborhood. Browse your region below to see the estates and roads we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(marketingAreas).map(([region, areas], index) => {
              const isExpanded = !!expandedRegions[region];
              const previewCount = 8;
              const visibleAreas = isExpanded ? areas : areas.slice(0, previewCount);
              const remaining = areas.length - previewCount;

              return (
                <div
                  key={region}
                  className={`bg-gray-50 rounded-2xl border border-gray-100 p-6 transition-all duration-500 ${isVisible.areas ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600 flex-shrink-0" aria-hidden="true" />
                    {region}
                  </h3>
                  <ul className="flex flex-wrap gap-2" aria-label={`Areas served in ${region}`}>
                    {visibleAreas.map((area) => (
                      <li key={area} className="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                        {area}
                      </li>
                    ))}
                  </ul>
                  {remaining > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpandedRegions((prev) => ({ ...prev, [region]: !prev[region] }))}
                      aria-expanded={isExpanded}
                      className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {isExpanded ? "Show less" : `+${remaining} more areas`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Don&apos;t see your area listed?{" "}
            <Link to="/book" className="text-blue-600 font-semibold hover:text-blue-800">
              Get in touch
            </Link>{" "}
            — we likely still cover it.
          </p>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        className={`fixed bottom-28 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 hover:scale-110 ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
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
/* eslint-disable no-unused-vars */
// src/pages/public/ServicesPage.jsx — Enhanced UI + Deep SEO
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { getServices } from "../../features/services/servicesSlice";
import { formatContentForDisplay } from "../../utils/markdownUtils";
import { BUSINESS_INFO, buildBreadcrumbSchema, buildLocalBusinessSchema,
  ALL_KEYWORDS, SERVICE_KEYWORDS, AREA_KEYWORDS, PRIMARY_KEYWORDS,
  WEBSITE_SCHEMA, ORGANIZATION_SCHEMA } from "../../utils/seo";
import { Search, ChevronLeft, ChevronRight, Star, MapPin, Phone, X, SlidersHorizontal } from "lucide-react";

// ─── Static service highlights shown when DB is empty ─────────────────────────
const STATIC_HIGHLIGHTS = [
  { title: "House Cleaning", icon: "fas fa-home", color: "#2563eb", bg: "#eff6ff", desc: "Regular or one-off cleaning for homes and apartments across all Nairobi estates." },
  { title: "Office Cleaning", icon: "fas fa-building", color: "#7c3aed", bg: "#f5f3ff", desc: "Daily, weekly or contract commercial cleaning for offices and corporate spaces." },
  { title: "Deep Cleaning", icon: "fas fa-broom", color: "#16a34a", bg: "#f0fdf4", desc: "Intensive top-to-bottom cleaning that removes allergens and deep-seated grime." },
  { title: "Carpet Cleaning", icon: "fas fa-rug", color: "#d97706", bg: "#fffbeb", desc: "Steam and dry carpet cleaning that restores texture and removes stubborn stains." },
  { title: "Post-Construction", icon: "fas fa-hammer", color: "#db2777", bg: "#fdf2f8", desc: "Complete debris removal and finishing clean after renovation or construction." },
  { title: "Sofa Cleaning", icon: "fas fa-couch", color: "#0891b2", bg: "#ecfeff", desc: "Professional upholstery cleaning for sofas, chairs and fabric furniture." },
];

const FAQS = [
  { q: "What areas in Nairobi do you serve?", a: "We cover all Nairobi neighborhoods including Karen, Westlands, Runda, Kilimani, Lavington, Kileleshwa, Parklands, Muthaiga, Spring Valley, South C, Upperhill, CBD and 500+ more estates." },
  { q: "How do I book a cleaning service?", a: "Book online via our website, call +254 726 933 261, or WhatsApp us. We'll confirm within 30 minutes and schedule at your convenience." },
  { q: "Are your cleaners background-checked?", a: "Yes — all staff are thoroughly vetted, professionally trained, uniformed and fully insured for your complete peace of mind." },
  { q: "Do you use eco-friendly products?", a: "Absolutely. We use non-toxic, eco-safe cleaning products that are safe for children, pets and the environment in every Nairobi home we clean." },
  { q: "Do you offer a satisfaction guarantee?", a: "Yes — 100%. If you're not satisfied with our cleaning, we will return and re-clean the area at no extra cost." },
  { q: "Can I get a regular cleaning schedule?", a: "Yes — we offer daily, weekly, bi-weekly and monthly cleaning plans tailored to your needs and location across Nairobi." },
];

const PROCESS_STEPS = [
  { icon: "fas fa-calendar-plus", title: "Book Online or Call", desc: "Choose your service, pick a date and submit your booking. We confirm within 30 minutes." },
  { icon: "fas fa-clipboard-list", title: "Pre-Visit Assessment", desc: "Our head of cleaning visits your property to assess scope and provide a detailed quote." },
  { icon: "fas fa-broom", title: "Expert Cleaning", desc: "Our vetted, uniformed team arrives on time and cleans to our rigorous standards." },
  { icon: "fas fa-star", title: "Quality Sign-Off", desc: "We inspect the results before leaving. Not happy? We re-clean free of charge." },
];

const TRUST_BADGES = [
  { icon: "fas fa-shield-alt", label: "Fully Insured", color: "#16a34a" },
  { icon: "fas fa-user-check", label: "Vetted Staff", color: "#2563eb" },
  { icon: "fas fa-leaf", label: "Eco-Friendly", color: "#16a34a" },
  { icon: "fas fa-clock", label: "Always On Time", color: "#d97706" },
  { icon: "fas fa-medal", label: "100% Guarantee", color: "#7c3aed" },
  { icon: "fas fa-map-marker-alt", label: "500+ Areas", color: "#db2777" },
];

// ─── SEO schemas ──────────────────────────────────────────────────────────────
const PAGE_URL = `${BUSINESS_INFO.url}/services`;

const serviceListSchema = (services) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Professional Cleaning Services in Nairobi",
  description: "Expert residential, commercial and specialized cleaning services across all Nairobi areas.",
  url: PAGE_URL,
  numberOfItems: services.length || STATIC_HIGHLIGHTS.length,
  itemListElement: (services.length ? services.slice(0, 12) : STATIC_HIGHLIGHTS).map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name || s.title,
      description: s.description
        ? s.description.replace(/<[^>]*>/g, "").substring(0, 200)
        : s.desc,
      provider: { "@type": "Organization", name: BUSINESS_INFO.name },
      areaServed: "Nairobi, Kenya",
    },
  })),
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── Component ────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { services, isLoading } = useSelector((s) => s.services);

  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const servicesPerPage = 9;
  const gridRef = useRef(null);

  useEffect(() => { dispatch(getServices()); }, [dispatch]);

  // Sync category from URL query param
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  // Intersection observer for section reveals
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setIsVisible((p) => ({ ...p, [e.target.dataset.section]: true }));
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-section]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Filter + sort logic
  useEffect(() => {
    if (!Array.isArray(services)) { setFilteredServices([]); return; }
    let list = [...services].sort((a, b) => {
      const av = a.youtubeVideos?.length > 0;
      const bv = b.youtubeVideos?.length > 0;
      return av === bv ? 0 : av ? -1 : 1;
    });
    if (activeCategory !== "all") list = list.filter((s) => s.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) => s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)
      );
    }
    setFilteredServices(list);
    setCurrentPage(1);
  }, [services, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const pageStart = (currentPage - 1) * servicesPerPage;
  const currentServices = filteredServices.slice(pageStart, pageStart + servicesPerPage);

  const getMedia = (service) => {
    const fix = (u) => u?.includes("/uploads/") ? u.replace("/uploads/", "/images/services/") : u;
    if (service.youtubeVideos?.length) {
      const v = service.youtubeVideos[0];
      return { type: "video", videoId: v.videoId, thumbnail: v.thumbnail, url: v.url };
    }
    const img = service.images?.[0] || service.image?.[0];
    return { type: "image", url: fix(img) || `https://picsum.photos/seed/${service._id}/600/400` };
  };

  const paginate = (page) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const paginationPages = () => {
    const pages = [];
    const max = 5;
    if (totalPages <= max) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + max - 1);
      if (start > 1) { pages.push(1); if (start > 2) pages.push("…"); }
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) { if (end < totalPages - 1) pages.push("…"); pages.push(totalPages); }
    }
    return pages;
  };

  const categories = [
    { id: "all", label: "All Services", icon: "fas fa-th-large" },
    { id: "residential", label: "Residential", icon: "fas fa-home" },
    { id: "commercial", label: "Commercial", icon: "fas fa-building" },
    { id: "post-construction", label: "Post-Construction", icon: "fas fa-hammer" },
    { id: "house-cleaning", label: "House Cleaning", icon: "fas fa-broom" },
  ];

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc" }}>

      {/* ── SEO HEAD ────────────────────────────────────────────────────────── */}
      <Helmet>
        {/* Primary keyword first → "Cleaning Services in Nairobi" + long modifiers */}
        <title>Cleaning Services in Nairobi Kenya | House, Office, Carpet, Sofa &amp; Deep Cleaning | Sylvie</title>

        {/* 155-char description — phone number + area names = local intent */}
        <meta name="description" content="Best cleaning services in Nairobi Kenya — house cleaning, office cleaning, carpet cleaning, sofa set cleaning, deep cleaning &amp; post-construction. Vetted &amp; insured. 5,000+ clients. Call 0726 933 261." />

        {/* Full keyword bank — primary + service + area long-tails */}
        <meta name="keywords" content={[
          ...PRIMARY_KEYWORDS,
          ...SERVICE_KEYWORDS,
          ...AREA_KEYWORDS,
          "sofa set cleaning Nairobi Kenya",
          "mattress cleaning Nairobi",
          "post construction cleaning Kenya",
          "cleaning services near me",
          "cleaners near me Nairobi",
          "house cleaning services in Nairobi Kenya",
          "office cleaning services in Nairobi Kenya",
          "airbnb cleaning Nairobi",
          "end of tenancy cleaning Nairobi",
          "sanitary bins services Nairobi",
        ].join(", ")} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Sylvie Intercleaning Company Limited" />
        <meta name="revisit-after" content="3 days" />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Cleaning Services in Nairobi Kenya | House, Office, Carpet &amp; Sofa Cleaning" />
        <meta property="og:description" content="House cleaning, office cleaning, carpet cleaning, sofa set cleaning &amp; deep cleaning across Karen, Westlands, Runda, Kilimani &amp; 500+ Nairobi areas. Book online or call 0726 933 261." />
        <meta property="og:image" content={`${BUSINESS_INFO.url}/og-services.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Professional Cleaning Services in Nairobi — Sylvie Cleaning Services" />
        <meta property="og:site_name" content="Sylvie Cleaning Services" />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sylviecleaning" />
        <meta name="twitter:title" content="Cleaning Services Nairobi | House, Office, Carpet &amp; Sofa Cleaning" />
        <meta name="twitter:description" content="Professional cleaning across Karen, Westlands, Runda &amp; all Nairobi areas. Book online or call 0726 933 261." />
        <meta name="twitter:image" content={`${BUSINESS_INFO.url}/og-services.jpg`} />
        <meta name="twitter:image:alt" content="Sylvie Cleaning Services — Nairobi's Best" />

        {/* Geo / local signals */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <meta name="city" content="Nairobi" />
        <meta name="state" content="Nairobi County" />
        <meta name="country" content="Kenya" />
        <meta name="language" content="English" />
        <meta name="distribution" content="local" />
        <meta name="coverage" content="Nairobi, Kenya" />

        {/* 5 schemas — LocalBusiness, FAQ, ItemList, Breadcrumb, WebSite */}
        <script type="application/ld+json">{JSON.stringify(serviceListSchema(services))}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(buildLocalBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]))}</script>
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <header
        data-section="hero"
        className="relative overflow-hidden"
        style={{
          paddingTop: "128px",
          paddingBottom: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)",
        }}
        aria-label="Services hero section"
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(99,102,241,0.12)" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(6,182,212,0.08)" }} />
          {/* Floating icons */}
          {["fa-broom", "fa-spray-can", "fa-sparkles", "fa-home", "fa-building", "fa-leaf"].map((ic, i) => (
            <div key={i} className="absolute text-white/10" style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, fontSize: `${22 + i * 4}px`, animation: `svcFloat ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.6}s` }}>
              <i className={`fas ${ic}`} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><i className="fas fa-chevron-right text-xs" /></li>
              <li className="text-white font-medium" aria-current="page">Services</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              What We Offer
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Professional Cleaning<br />
              <span style={{ WebkitTextStroke: "1px rgba(147,197,253,0.6)", color: "transparent" }}>
                Services in Nairobi
              </span>
            </h1>
            <p className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mb-8">
              Residential, commercial and specialized cleaning across Karen, Westlands, Runda, Kilimani and 500+ Nairobi neighborhoods — delivered by vetted, insured professionals.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/book" aria-label="Book a cleaning service now"
                className="inline-flex items-center gap-2 font-bold py-3.5 px-8 rounded-full text-sm transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", color: "#fff", boxShadow: "0 8px 28px rgba(37,99,235,0.5)" }}>
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book a Service
              </Link>
              <a href="tel:+254726933261" aria-label="Call us"
                className="inline-flex items-center gap-2 font-bold py-3.5 px-8 rounded-full text-sm transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Phone size={15} aria-hidden="true" />
                0726 933 261
              </a>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap gap-3 mt-10" aria-label="Trust indicators">
            {TRUST_BADGES.map(({ icon, label, color }, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <i className={`${icon} text-xs`} style={{ color }} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── SERVICE HIGHLIGHTS (always visible, SEO-rich) ──────────────────── */}
      <section data-section="highlights" className="py-16 bg-white" aria-labelledby="highlights-heading">
        <div className="container mx-auto px-4 sm:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible.highlights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 id="highlights-heading" className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Core Cleaning Services
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Available across all Nairobi neighborhoods</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATIC_HIGHLIGHTS.map(({ title, icon, color, bg, desc }, i) => (
              <div key={i} className={`rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-md cursor-default ${isVisible.highlights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: bg, transitionDelay: `${i * 60}ms` }}
                title={desc}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${color}20` }}>
                  <i className={`${icon} text-base`} style={{ color }} aria-hidden="true" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN SERVICES GRID ─────────────────────────────────────────────── */}
      <section className="py-16" data-section="services" aria-labelledby="services-grid-heading">
        <div className="container mx-auto px-4 sm:px-8">

          {/* Section header */}
          <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 transition-all duration-700 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Browse</span>
              <h2 id="services-grid-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                All Cleaning Services
              </h2>
            </div>
            {/* Search bar */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services…"
                aria-label="Search cleaning services"
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                style={{ "--tw-ring-color": "#2563eb" }}
              />
              {searchQuery && (
                <button onClick={clearSearch} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className={`mb-8 transition-all duration-700 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} role="tablist" aria-label="Filter services by category">
            <div className="flex flex-wrap gap-2">
              {categories.map(({ id, label, icon }, idx) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="services-grid"
                    onClick={() => { setActiveCategory(id); setCurrentPage(1); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={isActive
                      ? { background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }
                      : { background: "#fff", color: "#374151", border: "1px solid #e5e7eb" }
                    }
                  >
                    <i className={`${icon} text-xs`} aria-hidden="true" />
                    {label}
                    {id !== "all" && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: isActive ? "rgba(255,255,255,0.2)" : "#f3f4f6", color: isActive ? "#fff" : "#6b7280" }}>
                        {Array.isArray(services) ? services.filter((s) => s.category === id).length : 0}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count bar */}
          {!isLoading && filteredServices.length > 0 && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
              <span className="text-gray-500">
                Showing <strong className="text-blue-600">{pageStart + 1}–{Math.min(pageStart + servicesPerPage, filteredServices.length)}</strong> of <strong className="text-gray-700">{filteredServices.length}</strong> services
                {activeCategory !== "all" && <span className="text-blue-600 ml-1">· {categories.find((c) => c.id === activeCategory)?.label}</span>}
              </span>
              {searchQuery && (
                <button onClick={clearSearch} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold">
                  <X size={13} /> Clear filter
                </button>
              )}
            </div>
          )}

          {/* ── Grid ── */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4" role="status" aria-label="Loading services">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.4s" }} />
              </div>
              <p className="text-gray-500 font-medium">Loading cleaning services…</p>
            </div>
          ) : currentServices.length > 0 ? (
            <>
              <div id="services-grid" ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" role="list">
                {currentServices.map((service, i) => {
                  const media = getMedia(service);
                  return (
                    <article
                      key={service._id}
                      role="listitem"
                      itemScope
                      itemType="https://schema.org/Service"
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 border border-gray-100"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Media */}
                      <div className="relative h-52 overflow-hidden bg-gray-100">
                        {media.type === "video" ? (
                          <>
                            <iframe
                              src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&loop=1&playlist=${media.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                              title={`${service.name} — video demo`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background: "#dc2626", boxShadow: "0 2px 8px rgba(220,38,38,0.5)" }}>
                              <i className="fas fa-play text-xs" aria-hidden="true" /> VIDEO
                            </span>
                          </>
                        ) : (
                          <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
                            style={{ backgroundImage: `url(${media.url})` }}
                            role="img"
                            aria-label={`${service.name} cleaning service`}
                          />
                        )}
                        {/* Category chip */}
                        <span className="absolute top-3 right-3 text-xs font-bold text-white px-3 py-1 rounded-full capitalize" style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(6px)" }}>
                          {service.category?.replace(/-/g, " ") || "Cleaning"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Extra video count */}
                        {service.youtubeVideos?.length > 1 && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full mb-3">
                            <i className="fas fa-film text-blue-500 text-xs" aria-hidden="true" />
                            +{service.youtubeVideos.length - 1} more video{service.youtubeVideos.length > 2 ? "s" : ""}
                          </span>
                        )}

                        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug" itemProp="name">
                          {service.name}
                        </h2>

                        <div
                          className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3"
                          itemProp="description"
                          dangerouslySetInnerHTML={{ __html: formatContentForDisplay(service.description, false) }}
                        />

                        <meta itemProp="provider" content={BUSINESS_INFO.name} />
                        <meta itemProp="areaServed" content="Nairobi, Kenya" />

                        {/* CTAs */}
                        <div className="flex gap-3">
                          <Link
                            to={`/book?service=${service._id}`}
                            aria-label={`Book ${service.name}`}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                            style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}
                          >
                            <i className="fas fa-calendar-check text-xs" aria-hidden="true" />
                            Book Now
                          </Link>
                          <Link
                            to={`/services/${service._id}`}
                            aria-label={`Learn more about ${service.name}`}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-700"
                            style={{ border: "1.5px solid #e5e7eb" }}
                          >
                            <i className="fas fa-info-circle text-xs" aria-hidden="true" />
                            Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex flex-col items-center gap-4 mt-12" aria-label="Services pagination">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: currentPage === 1 ? "#f3f4f6" : "#fff", border: "1.5px solid #e5e7eb" }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {paginationPages().map((p, i) => (
                      <button
                        key={i}
                        onClick={() => typeof p === "number" && paginate(p)}
                        aria-label={typeof p === "number" ? `Go to page ${p}` : undefined}
                        aria-current={p === currentPage ? "page" : undefined}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all"
                        style={p === currentPage
                          ? { background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }
                          : p === "…"
                          ? { background: "transparent", color: "#9ca3af", cursor: "default" }
                          : { background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb" }}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: currentPage === totalPages ? "#f3f4f6" : "#fff", border: "1.5px solid #e5e7eb" }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Page <strong className="text-gray-700">{currentPage}</strong> of <strong className="text-gray-700">{totalPages}</strong>
                  </p>
                </nav>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#eff6ff" }}>
                <i className="fas fa-search text-3xl text-blue-300" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No services found</h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                {searchQuery ? `No results for "${searchQuery}". Try a different term.` : "No services in this category yet. Try another filter or contact us."}
              </p>
              <div className="flex gap-3">
                {searchQuery && (
                  <button onClick={clearSearch} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                    <X size={14} /> Clear Search
                  </button>
                )}
                <Link to="/contact" aria-label="Contact us for custom services" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)" }}>
                  <i className="fas fa-envelope text-xs" aria-hidden="true" /> Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section data-section="process" className="py-20 bg-white" aria-labelledby="process-heading">
        <div className="container mx-auto px-4 sm:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${isVisible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              How Our Cleaning Service Works
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Four easy steps to a spotless home or office anywhere in Nairobi</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className={`relative text-center transition-all duration-500 ${isVisible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Step number */}
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto" style={{ background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
                    {i + 1}
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#10b981" }}>
                    <i className={`${icon} text-white text-xs`} aria-hidden="true" />
                  </div>
                  {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-full h-px" style={{ background: "linear-gradient(90deg,#bfdbfe,#a5f3fc)", transform: "translateX(16px)" }} aria-hidden="true" />}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/book" aria-label="Book a cleaning service" className="inline-flex items-center gap-2 font-bold py-3.5 px-10 rounded-full text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
              <i className="fas fa-calendar-check" aria-hidden="true" />
              Book Your Service Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section data-section="faq" className="py-20" style={{ background: "#f8fafc" }} aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">FAQ</span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-3 text-sm">Everything you need to know about our Nairobi cleaning services</p>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-500 ${isVisible.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ borderColor: activeFAQ === i ? "#bfdbfe" : "#e5e7eb", transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                  aria-expanded={activeFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 font-semibold text-gray-800 hover:text-blue-600 transition-colors text-sm"
                >
                  <span>{q}</span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: activeFAQ === i ? "#eff6ff" : "#f9fafb", transform: activeFAQ === i ? "rotate(180deg)" : "none" }}>
                    <i className="fas fa-chevron-down text-xs text-blue-500" aria-hidden="true" />
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: activeFAQ === i ? "200px" : "0", opacity: activeFAQ === i ? 1 : 0 }}
                >
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
      <section
        data-section="cta"
        className="py-20 relative overflow-hidden"
        aria-labelledby="services-cta-heading"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#1d4ed8 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(99,102,241,0.1)" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-8 text-center relative z-10">
          <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 id="services-cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Ready to Book Your Cleaning?
            </h2>
            <p className="text-blue-100 mb-8 text-base">
              Get a free quote today. We serve Karen, Westlands, Runda, Kilimani and 500+ Nairobi locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" aria-label="Book a cleaning service now"
                className="inline-flex items-center gap-2 font-bold py-4 px-10 rounded-full text-sm text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", boxShadow: "0 8px 28px rgba(37,99,235,0.5)" }}>
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book Service Now
              </Link>
              <a href="tel:+254726933261" aria-label="Call our office"
                className="inline-flex items-center gap-2 font-bold py-4 px-10 rounded-full text-sm text-white transition-all hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                <Phone size={15} aria-hidden="true" />
                0726 933 261
              </a>
            </div>
            <p className="text-blue-200/70 text-xs mt-6 flex items-center justify-center gap-2">
              <MapPin size={12} aria-hidden="true" />
              Serving all Nairobi areas — Karen, Westlands, Runda, Kilimani, Lavington &amp; 500+ more
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes svcFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(8deg); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="svcFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;

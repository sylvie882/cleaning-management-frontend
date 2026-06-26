// src/pages/Public/AboutPage.jsx
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import aboutImage from "../../assets/images/newSlider6.jpg";
import { Eye, Zap, Star, HeartHandshake } from "lucide-react";
import { 
  BUSINESS_INFO, 
  buildLocalBusinessSchema, 
  buildBreadcrumbSchema,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA
} from "../../utils/seo";

const AboutPage = () => {
  const pageTitle = "About Sylvie Intercleaning Company | Professional Cleaning Services Nairobi";
  const pageDesc = "Learn about Sylvie Intercleaning Company Limited — Nairobi's trusted professional cleaning company. Expert staff, 24/7 support, eco-friendly methods across Karen, Westlands, Kilimani & all Nairobi areas.";
  const canonicalUrl = `${BUSINESS_INFO.url}/about`;

  const foundationItems = [
    { Icon: Eye, title: "Our Vision", desc: "To be the most reputable and respected company in quality cleaning services and hygiene solutions across Kenya.", color: "#7c3aed", bg: "#f5f3ff" },
    { Icon: Zap, title: "Our Mission", desc: "Grow through ethical and superior customer service ensuring greater social corporate responsibility and value creation.", color: "#dc2626", bg: "#fef2f2" },
    { Icon: Star, title: "Our Motto", desc: `"It's only clean when our processes confirm it's clean." — Our quality standard, upheld on every visit.`, color: "#d97706", bg: "#fffbeb" },
    { Icon: HeartHandshake, title: "Our Values", desc: "Your satisfaction drives everything we do. We are available 24/7 and treat every client with honesty and respect.", color: "#16a34a", bg: "#f0fdf4" },
  ];

  const differentiators = [
    { icon: "fas fa-user-tie", title: "Uniformed & Experienced Staff", desc: "Professional, vetted cleaners in uniform who maintain the highest service standards on every visit.", color: "#2563eb" },
    { icon: "fas fa-users-cog", title: "Backup Janitors on Standby", desc: "We always have backup staff ready so your cleaning schedule is never interrupted or delayed.", color: "#7c3aed" },
    { icon: "fas fa-sitemap", title: "Professional Management", desc: "A dedicated management team oversees quality control, ensuring consistent excellence across all locations.", color: "#db2777" },
  ];

  const whyUs = [
    { icon: "fas fa-check-circle", title: "Proven Track Record", desc: "Years of experience serving Nairobi and major Kenyan cities with consistent quality results.", color: "#2563eb" },
    { icon: "fas fa-headset", title: "24/7 Availability", desc: "Our office is available around the clock — call us anytime for emergencies or bookings.", color: "#16a34a" },
    { icon: "fas fa-list-check", title: "Comprehensive Services", desc: "From residential to commercial, deep cleaning to post-construction — we cover it all.", color: "#d97706" },
    { icon: "fas fa-people-group", title: "Professional Team", desc: "Experienced, uniformed staff managed by professionals who ensure quality service delivery.", color: "#7c3aed" },
    { icon: "fas fa-heart", title: "Customer-First Focus", desc: "Your satisfaction is our KPI. We re-clean for free if you're not 100% happy.", color: "#dc2626" },
    { icon: "fas fa-magnifying-glass", title: "Attention to Detail", desc: "Our hands-on quality-check process means nothing is missed, ever.", color: "#0891b2" },
  ];

  // Get the LocalBusiness schema WITHOUT aggregateRating
  // We'll create a custom version without the aggregateRating to avoid duplicates
  const localBusinessSchema = {
    ...buildLocalBusinessSchema(),
    // Remove aggregateRating from the business schema to avoid duplication
    aggregateRating: undefined,
    // Remove reviews too since we're not displaying individual reviews on this page
    review: undefined
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="Sylvie Cleaning Services about, professional cleaning company Nairobi, cleaning company Kenya, Sylvie Intercleaning Company Limited, about Sylvie cleaning" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content="Sylvie Cleaning Services" />
        <meta property="og:image" content={`${BUSINESS_INFO.url}/og-image.jpg`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={`${BUSINESS_INFO.url}/og-image.jpg`} />
        
        {/* Geo tags */}
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        
        {/* ===== STRUCTURED DATA ===== */}
        
        {/* 1. LocalBusiness Schema (WITHOUT aggregateRating) */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        
        {/* 2. Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_SCHEMA)}
        </script>
        
        {/* 3. Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify(WEBSITE_SCHEMA)}
        </script>
        
        {/* 4. Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema([
            { name: "Home", path: "/" }, 
            { name: "About", path: "/about" }
          ]))}
        </script>
        
        {/* 5. SINGLE AggregateRating Schema - ONLY ONE! */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "ratingValue": BUSINESS_INFO.ratingValue,
            "reviewCount": BUSINESS_INFO.reviewCount,
            "bestRating": 5,
            "worstRating": 1,
            "itemReviewed": {
              "@type": "LocalBusiness",
              "name": BUSINESS_INFO.name,
              "url": BUSINESS_INFO.url,
              "image": BUSINESS_INFO.logo
            }
          })}
        </script>
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Hero Banner */}
      <header
        className="relative pt-44 pb-20"
        style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #312e81 100%)" }}
        aria-label="About page hero"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 bg-white blur-3xl" />
          <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full opacity-5 bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-8 text-center text-white z-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-4">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><i className="fas fa-chevron-right text-xs" /></li>
              <li className="text-white font-medium" aria-current="page">About Us</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            About Sylvie Intercleaning<br className="hidden md:block" /> Company Limited
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">Professional commercial cleaning services across Kenya since inception — trusted by 5000+ clients.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-8 py-16 max-w-6xl">

        {/* Our Story */}
        <section className="mb-24" aria-labelledby="our-story-heading">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 id="our-story-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Nairobi's Trusted Cleaning Company
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Sylvie Cleaning Services was established as a professional commercial cleaning service in Kenya. Responding to client demand, we expanded into comprehensive cleaning and maintenance services across all major Nairobi neighborhoods.</p>
                <p>Today, we provide services in major cities including Nairobi, Westlands, Nakuru, Kiambu and beyond — covering residential estates, corporate offices, industrial facilities, and specialized venues.</p>
                <p>Our hands-on approach, attention to detail, and the professionalism exhibited by our management and staff set us apart from competitors. We don't just clean — we transform spaces.</p>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  ["5,000+", "Happy Clients"], 
                  ["500+", "Areas Served"], 
                  ["24/7", "Support"], 
                  ["100%", "Satisfaction Guarantee"]
                ].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{num}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutImage} 
                  alt="Sylvie Cleaning Services professional team at work in Nairobi" 
                  className="w-full h-80 object-cover" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Motto, Values */}
        <section className="mb-24" aria-labelledby="foundation-heading">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
            <h2 id="foundation-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Core Principles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do at Sylvie Cleaning Services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foundationItems.map(({ title, desc, color, bg }, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-7 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1" 
                style={{ background: bg, border: `1px solid ${color}20` }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${color}15` }}>
                  <Icon size={26} style={{ color }} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-24" aria-labelledby="differentiators-heading">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What Sets Us Apart</span>
            <h2 id="differentiators-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Our Key Differentiators</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What makes Sylvie Cleaning Services the preferred choice in Nairobi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-2xl`} style={{ color: item.color }} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Areas */}
        <section className="mb-24" id="service-areas" aria-labelledby="areas-heading">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Coverage</span>
            <h2 id="areas-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Service Areas Across Kenya</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We serve all major cities and 500+ neighborhoods across Kenya</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {["Nairobi", "Westlands", "Nakuru", "Kiambu", "Machakos"].map((city) => (
                <div key={city} className="group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ background: "#eff6ff" }}>
                    <i className="fas fa-map-marker-alt text-blue-600 text-lg" aria-hidden="true" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{city}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-24" aria-labelledby="why-us-heading">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why Nairobi Trusts Sylvie Cleaning</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Six reasons why we're the preferred cleaning company across Nairobi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                  <i className={`${item.icon} text-sm`} style={{ color: item.color }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section 
          className="rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden" 
          aria-labelledby="about-cta-heading" 
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #312e81 100%)" }}
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 bg-white blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 id="about-cta-heading" className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Ready to Experience Sylvie Cleaning Quality?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join 5000+ satisfied clients across Kenya who trust us with their cleaning needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/book" 
                aria-label="Book our cleaning services" 
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 shadow-xl"
              >
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Book Our Services
              </Link>
              <Link 
                to="/contact" 
                aria-label="Contact us 24/7" 
                className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                <i className="fas fa-phone" aria-hidden="true" />
                Contact Us 24/7
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
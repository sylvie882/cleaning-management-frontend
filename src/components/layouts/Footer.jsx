import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { to: "/services/residential", label: "Residential Cleaning" },
    { to: "/services/commercial", label: "Commercial Cleaning" },
    { to: "/services/deep-cleaning", label: "Deep Cleaning" },
    { to: "/services/specialized", label: "Post Construction Cleaning" },
    { to: "/services", label: "All Services" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/projects", label: "Our Projects" },
    { to: "/blog", label: "Blog & Tips" },
    { to: "/contact", label: "Contact Us" },
    { to: "/book", label: "Book Now" },
  ];

  const areaLinks = [
    "Karen", "Westlands", "Runda", "Kilimani",
    "Lavington", "Parklands", "Muthaiga", "Kileleshwa",
    "Spring Valley", "Langata", "Ngong Road", "Upperhill",
  ];

  const socialLinks = [
    { href: "https://web.facebook.com/sylvie.cleaning", icon: "fab fa-facebook-f", label: "Facebook", color: "#1877F2" },
    { href: "https://www.instagram.com/sylviecleaning", icon: "fab fa-instagram", label: "Instagram", color: "#E1306C" },
    { href: "https://x.com/sylviecleaning", icon: "fab fa-x-twitter", label: "X (Twitter)", color: "#000000" },
    { href: "https://wa.me/254726933261", icon: "fab fa-whatsapp", label: "WhatsApp", color: "#25D366" },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        borderTop: "1px solid rgba(99,102,241,0.2)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top CTA Bar */}
      <div
        className="border-b"
        style={{
          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-bold text-xl md:text-2xl mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Ready for a Spotless Space?
            </h2>
            <p className="text-blue-100 text-sm">Get a free quote today — we serve all Nairobi areas</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="tel:+254726933261"
              aria-label="Call Sylvie Cleaning Services"
              className="flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-full text-sm hover:bg-blue-50 transition-all hover:scale-105"
              style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
            >
              <Phone size={15} aria-hidden="true" />
              0726 933 261
            </a>
            <Link
              to="/book"
              aria-label="Book a cleaning service"
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full text-sm hover:bg-yellow-300 transition-all hover:scale-105"
            >
              <i className="fas fa-calendar-check text-xs" aria-hidden="true" />
              Book Service
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="Sylvie Cleaning Services — Home" className="flex items-center gap-3 mb-5">
              <div className="rounded-xl p-2 bg-white/10">
                <img src={logo} alt="Sylvie Cleaning Services" className="h-10 w-auto" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Sylvie Cleaning</div>
                <div className="text-blue-300 text-xs font-semibold" style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</div>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nairobi's most trusted professional cleaning company. Reliable, eco-friendly cleaning for homes and offices across all neighborhoods.
            </p>

            {/* Contact Details */}
            <address className="not-italic space-y-3">
              <a href="tel:+254726933261" aria-label="Call us" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors" style={{ background: "rgba(37,99,235,0.15)" }}>
                  <Phone size={14} className="text-blue-400" aria-hidden="true" />
                </span>
                +254 726 933 261
              </a>
              <a href="mailto:info@sylviecleaningservices.com" aria-label="Email us" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors" style={{ background: "rgba(37,99,235,0.15)" }}>
                  <Mail size={14} className="text-blue-400" aria-hidden="true" />
                </span>
                info@sylviecleaningservices.com
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(37,99,235,0.15)" }}>
                  <MapPin size={14} className="text-blue-400" aria-hidden="true" />
                </span>
                <span>Dale House, Rhapta Road, Fox Close, Nairobi 00100</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.15)" }}>
                  <Clock size={14} className="text-blue-400" aria-hidden="true" />
                </span>
                <span>Mon–Fri 8am–8pm · Sat 9am–3pm</span>
              </div>
            </address>
          </div>

          {/* Services */}
          <nav aria-label="Footer services navigation">
            <h3 className="text-white font-bold text-base mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Services
              <span className="block w-8 h-0.5 mt-2 rounded-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)" }} />
            </h3>
            <ul className="space-y-2.5">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link to={service.to} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-200 group">
                    <ChevronRight size={13} className="text-blue-500 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-white font-bold text-base mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Quick Links
              <span className="block w-8 h-0.5 mt-2 rounded-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)" }} />
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-200 group">
                    <ChevronRight size={13} className="text-blue-500 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas Served — SEO Critical */}
          <div>
            <h3 className="text-white font-bold text-base mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Areas We Serve
              <span className="block w-8 h-0.5 mt-2 rounded-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)" }} />
            </h3>
            <div className="flex flex-wrap gap-2" aria-label="Service areas in Nairobi">
              {areaLinks.map((area, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full text-gray-300 hover:text-white cursor-default transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {area}
                </span>
              ))}
              <Link to="/areas" className="text-xs px-3 py-1 rounded-full text-blue-300 hover:text-blue-200 transition-colors" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                +500 More Areas →
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-widest">Follow Us</h4>
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    role="listitem"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm transition-all duration-200 hover:scale-110"
                    style={{ background: `${social.color}22`, border: `1px solid ${social.color}44` }}
                    onMouseEnter={(e) => e.currentTarget.style.background = `${social.color}44`}
                    onMouseLeave={(e) => e.currentTarget.style.background = `${social.color}22`}
                  >
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear}{" "}
            <span className="text-gray-400 font-medium">Sylvie Intercleaning Company Limited</span>
            . All rights reserved.
          </p>
          <nav aria-label="Footer legal links" className="flex gap-5">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-of-service", label: "Terms of Service" },
              { to: "/sitemap", label: "Sitemap" },
            ].map((link, idx) => (
              <Link key={idx} to={link.to} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;

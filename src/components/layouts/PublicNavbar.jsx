import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: "fas fa-home", end: true },
    { to: "/services", label: "Services", icon: "fas fa-broom" },
    { to: "/blog", label: "Blog", icon: "fas fa-newspaper" },
    { to: "/about", label: "About", icon: "fas fa-info-circle" },
    { to: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  return (
    <>
      {showBanner && (
        <div
          role="banner"
          aria-label="Contact information and announcements"
          className="fixed top-0 w-full z-50 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          <div className="relative flex overflow-hidden py-2.5">
            <div
              className="flex items-center whitespace-nowrap"
              style={{ animation: "navMarquee 45s linear infinite" }}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="inline-flex items-center mx-5 text-sm font-medium text-white/90">
                    <i className="fas fa-phone-alt text-yellow-300 mr-2 text-xs" aria-hidden="true" />
                    <span className="text-white/70 mr-1">Emergency Line:</span>
                    <a href="tel:+254726933261" className="font-bold text-yellow-300 hover:text-yellow-200 transition-colors tracking-wide" aria-label="Call Sylvie Cleaning Services">0726 933 261</a>
                  </span>
                  <span className="text-indigo-400 mx-2" aria-hidden="true">◆</span>
                  <a href="https://wa.me/254726933261" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="inline-flex items-center mx-5 px-4 py-1 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/></svg>
                    WhatsApp Us
                  </a>
                  <span className="text-indigo-400 mx-2" aria-hidden="true">◆</span>
                  <span className="inline-flex items-center mx-5 text-sm text-white/80">
                    <i className="fas fa-clock text-cyan-300 mr-2" aria-hidden="true" />
                    Mon–Fri 8am–8pm · Sat 9am–3pm
                  </span>
                  <span className="text-indigo-400 mx-2" aria-hidden="true">◆</span>
                  <span className="inline-flex items-center mx-5 text-sm text-white/80">
                    <i className="fas fa-star text-yellow-300 mr-2" aria-hidden="true" />
                    Nairobi's Most Trusted Cleaning Company · 5000+ Happy Clients
                  </span>
                  <span className="text-indigo-400 mx-2" aria-hidden="true">◆</span>
                </span>
              ))}
            </div>
          </div>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all" onClick={() => setShowBanner(false)} aria-label="Close announcement banner">
            <i className="fas fa-times text-xs" aria-hidden="true" />
          </button>
        </div>
      )}

      <header ref={menuRef}>
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="fixed w-full z-40 transition-all duration-500"
          style={{
            top: showBanner ? "40px" : "0",
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0.06)",
            padding: scrolled ? "10px 0" : "14px 0",
          }}
        >
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            <Link to="/" aria-label="Sylvie Cleaning Services — Home" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
              <div className="relative rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105" style={{ padding: "6px", background: "linear-gradient(135deg, #eff6ff, #dbeafe)", boxShadow: "0 2px 8px rgba(37,99,235,0.15)" }}>
                <img src={logo} alt="Sylvie Cleaning Services logo" style={{ height: scrolled ? "38px" : "44px", width: "auto" }} />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: scrolled ? "16px" : "18px" }}>Sylvie Cleaning</div>
                <div className="text-blue-600 font-semibold" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Professional Services · Nairobi</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end}
                  className={({ isActive }) => `relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`${link.icon} text-xs ${isActive ? "text-blue-600" : "text-gray-400"}`} aria-hidden="true" />
                      {link.label}
                      {isActive && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #2563eb, #06b6d4)" }} />}
                    </>
                  )}
                </NavLink>
              ))}
              <Link to="/book" aria-label="Book a cleaning service" className="ml-3 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105" style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                <i className="fas fa-calendar-check text-xs" aria-hidden="true" />
                Book Now
              </Link>
            </div>

            <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="mobile-nav-menu" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300" style={{ marginBottom: i < 2 ? "4px" : "0", transform: isMenuOpen ? (i === 0 ? "rotate(45deg) translate(3px, 3px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translate(3px, -3px)") : "none", opacity: isMenuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>

          <div id="mobile-nav-menu" role="region" aria-label="Mobile navigation" className="lg:hidden overflow-hidden transition-all duration-400" style={{ maxHeight: isMenuOpen ? "400px" : "0", opacity: isMenuOpen ? 1 : 0 }}>
            <div className="container mx-auto px-4 py-4 space-y-1 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              {navLinks.map((link, i) => (
                <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}
                  style={{ transitionDelay: isMenuOpen ? `${i * 50}ms` : "0ms", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isActive ? "#dbeafe" : "#f3f4f6" }}>
                        <i className={`${link.icon} text-sm ${isActive ? "text-blue-600" : "text-gray-500"}`} aria-hidden="true" />
                      </span>
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
              <div className="pt-2">
                <Link to="/book" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)", boxShadow: "0 4px 14px rgba(37,99,235,0.3)", fontFamily: "'DM Sans', sans-serif" }}>
                  <i className="fas fa-calendar-check" aria-hidden="true" />
                  Book Your Cleaning Service
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes navMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { [style*="navMarquee"] { animation: none !important; } }
      `}</style>
    </>
  );
};

export default PublicNavbar;

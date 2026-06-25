import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../features/services/servicesSlice";
import logo from "../../assets/images/logo.png";

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector((state) => state.services);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Color palette
  const colors = {
    primary: "#1E5AA8",
    primaryDark: "#16447D",
    primaryLight: "#E8EEF7",
    accent: "#D62828",
    accentDark: "#B71C1C",
    accentLight: "#FDE8E8",
    white: "#FFFFFF",
    gray: "#F7F8FA",
    text: "#1A1A2E",
  };

  // Fetch services on mount
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !e.target.closest('.mobile-toggle-btn')) {
        setIsMenuOpen(false);
      }
      if (!e.target.closest('.services-dropdown-container')) {
        setIsServicesDropdownOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [isMenuOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300);
  };

  // Get first 8 services for dropdown
  const featuredServices = services && Array.isArray(services) ? services.slice(0, 8) : [];

  const navLinks = [
    { to: "/", label: "Home", icon: "fas fa-home", end: true },
    { to: "/services", label: "Services", icon: "fas fa-broom" },
    { to: "/about", label: "About", icon: "fas fa-info-circle" },
    { to: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  return (
    <>
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
      />

      {/* TOP BANNER */}
      {showBanner && (
        <div
          role="banner"
          className="fixed top-0 w-full z-50 overflow-hidden"
          style={{
            background: colors.primary,
            borderBottom: `1px solid ${colors.primaryDark}`,
          }}
        >
          <div className="relative flex overflow-hidden py-2.5">
            <div
              className="flex items-center whitespace-nowrap"
              style={{ animation: "navMarquee 45s linear infinite" }}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="inline-flex items-center mx-5 text-sm text-white">
                    <i className="fas fa-phone-alt text-yellow-300 mr-2" />
                    0726 933 261
                  </span>
                  <span className="text-blue-300 mx-2">◆</span>
                  <a
                    href="https://wa.me/254726933261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mx-5 px-4 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#16a34a" }}
                  >
                    <i className="fab fa-whatsapp mr-2" />
                    WhatsApp Us
                  </a>
                  <span className="text-blue-300 mx-2">◆</span>
                  <span className="inline-flex items-center mx-5 text-sm text-white">
                    <i className="fas fa-clock text-yellow-300 mr-2" />
                    Mon–Fri 8am–8pm · Sat 9am–3pm
                  </span>
                  <span className="text-blue-300 mx-2">◆</span>
                  <span className="inline-flex items-center mx-5 text-sm text-white">
                    <i className="fas fa-star text-yellow-300 mr-2" />
                    5000+ Happy Clients
                  </span>
                  <span className="text-blue-300 mx-2">◆</span>
                </span>
              ))}
            </div>
          </div>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            onClick={() => setShowBanner(false)}
            aria-label="Close banner"
          >
            <i className="fas fa-times text-xs" />
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <header ref={menuRef}>
        <nav
          className="fixed w-full z-40 transition-all duration-500"
          style={{
            top: showBanner ? "40px" : "0",
            background: colors.white,
            boxShadow: scrolled
              ? `0 8px 28px rgba(30, 90, 168, 0.08)`
              : "0 1px 0 rgba(0,0,0,0.06)",
            padding: scrolled ? "10px 0" : "14px 0",
          }}
        >
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center" style={{ textDecoration: "none" }}>
              <div>
                <img
                  src={logo}
                  alt="Sylvie Cleaning Services"
                  style={{
                    height: scrolled ? "72px" : "92px",
                    width: "auto",
                    objectFit: "contain",
                    transition: "all .35s ease",
                  }}
                />
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                // Services link with dropdown
                if (link.label === "Services") {
                  return (
                    <div
                      key={link.to}
                      className="relative services-dropdown-container"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <NavLink
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                          `relative px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-gray-700 hover:bg-blue-50"
                          }`
                        }
                        style={({ isActive }) => ({
                          background: isActive ? colors.primary : "transparent",
                          color: isActive ? colors.white : undefined,
                        })}
                      >
                        {({ isActive }) => (
                          <>
                            <i
                              className={`${link.icon} text-sm`}
                              style={{
                                color: isActive ? colors.white : colors.primary,
                              }}
                            />
                            <span>{link.label}</span>
                            {/* Dropdown Chevron Icon */}
                            <svg
                              className={`w-3 h-3 ml-1 transition-transform duration-300 ${
                                isServicesDropdownOpen ? "rotate-180" : ""
                              }`}
                              style={{
                                color: isActive ? colors.white : colors.primary,
                              }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </>
                        )}
                      </NavLink>

                      {/* Services Dropdown */}
                      {isServicesDropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-2 min-w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-dropdown"
                          style={{
                            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                            width: "max-content",
                            maxWidth: "340px",
                          }}
                        >
                          {/* Dropdown Header */}
                          <div className="px-5 pt-4 pb-2 border-b border-gray-50">
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                              Our Services
                            </span>
                            <p className="text-xs text-gray-400 mt-0.5">Professional cleaning solutions</p>
                          </div>

                          {/* Service Links */}
                          <div className="py-2">
                            {isLoading ? (
                              <div className="flex items-center justify-center py-6">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2" style={{ borderColor: colors.primary }} />
                              </div>
                            ) : featuredServices.length > 0 ? (
                              <>
                                {featuredServices.map((service, index) => (
                                  <Link
                                    key={service._id}
                                    to={`/services/${service._id}`}
                                    className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:text-white transition-all duration-200 group relative"
                                    style={{
                                      transitionDelay: `${index * 30}ms`,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = colors.primary;
                                      e.currentTarget.style.color = colors.white;
                                      const icon = e.currentTarget.querySelector('.service-icon');
                                      if (icon) icon.style.color = colors.white;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = "transparent";
                                      e.currentTarget.style.color = "#374151";
                                      const icon = e.currentTarget.querySelector('.service-icon');
                                      if (icon) icon.style.color = colors.primary;
                                    }}
                                  >
                                    <span className="service-icon w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200" style={{ background: colors.primaryLight, color: colors.primary }}>
                                      <i className="fas fa-broom text-xs" />
                                    </span>
                                    <span className="whitespace-nowrap">{service.name}</span>
                                    <svg
                                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-auto"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      style={{ color: colors.white }}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              <div className="py-6 text-center text-gray-500 text-sm">
                                No services available
                              </div>
                            )}
                          </div>

                          {/* Dropdown Footer */}
                          <div className="px-3 pb-3 pt-1 border-t border-gray-50">
                            <Link
                              to="/services"
                              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-xl hover:scale-[1.02]"
                              style={{ background: colors.accent }}
                              onMouseEnter={(e) => e.currentTarget.style.background = colors.accentDark}
                              onMouseLeave={(e) => e.currentTarget.style.background = colors.accent}
                            >
                              <span>View All Services</span>
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>

                          {/* Decorative pointer triangle */}
                          <div
                            className="absolute -top-1.5 left-8 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-100"
                            style={{ borderColor: "rgba(229, 231, 235, 0.5)" }}
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular nav links
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `relative px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`
                    }
                    style={({ isActive }) => ({
                      background: isActive ? colors.primary : "transparent",
                      color: isActive ? colors.white : undefined,
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <i
                          className={`${link.icon} text-sm`}
                          style={{
                            color: isActive ? colors.white : colors.primary,
                          }}
                        />
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* BOOK BUTTON */}
              <Link
                to="/book"
                className="ml-2 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white hover:scale-105 transition-all duration-300"
                style={{ background: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.accentDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.accent;
                }}
              >
                <i className="fas fa-calendar-check text-xs" />
                <span>Book Now</span>
              </Link>
            </div>

            {/* MOBILE RIGHT SECTION - Book Now + Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Book Now Button */}
              <Link
                to="/book"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:scale-105 shadow-md"
                style={{ background: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.accentDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.accent;
                }}
              >
                <i className="fas fa-calendar-check text-xs" />
                <span>Book Now</span>
              </Link>

              {/* MOBILE TOGGLE */}
              <button
                className="mobile-toggle-btn flex flex-col justify-center items-center w-10 h-10 rounded-lg z-50 relative"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className="block w-5 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isMenuOpen ? colors.accent : colors.primary,
                    marginBottom: "4px",
                    transform: isMenuOpen ? "rotate(45deg) translate(3px,3px)" : "none",
                  }}
                />
                <span
                  className="block w-5 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isMenuOpen ? colors.accent : colors.primary,
                    marginBottom: "4px",
                    transform: isMenuOpen ? "scaleX(0)" : "none",
                  }}
                />
                <span
                  className="block w-5 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isMenuOpen ? colors.accent : colors.primary,
                    transform: isMenuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* OVERLAY */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            style={{
              top: showBanner ? "40px" : "0",
              zIndex: 45,
            }}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* MOBILE MENU */}
          <div
            ref={mobileMenuRef}
            className={`fixed lg:hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              top: showBanner ? "40px" : "0",
              left: 0,
              width: "85%",
              maxWidth: "320px",
              height: "100vh",
              background: colors.white,
              zIndex: 46,
              boxShadow: `4px 0 20px rgba(30, 90, 168, 0.1)`,
              overflowY: "auto",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary }}>
                      <i className="fas fa-broom text-white" />
                    </div>
                    <div>
                      <div className="text-gray-800 font-bold text-sm">Sylvie Cleaning</div>
                      <div className="text-sm" style={{ color: colors.primary }}>Services</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 transition-all"
                    style={{ color: colors.primary }}
                    aria-label="Close menu"
                  >
                    <i className="fas fa-times text-sm" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive ? "text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      }`
                    }
                    style={({ isActive }) => ({
                      background: isActive ? colors.primary : "transparent",
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isActive ? colors.primaryDark : colors.primaryLight,
                          }}
                        >
                          <i className={`${link.icon}`} style={{ color: isActive ? colors.white : colors.primary }} />
                        </span>
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}

                {/* Mobile Services List */}
                {!isLoading && featuredServices.length > 0 && (
                  <>
                    <div className="my-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 px-4 mb-2">
                        <i className="fas fa-broom text-xs" style={{ color: colors.primary }} />
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Popular Services
                        </p>
                      </div>
                      <div className="space-y-1">
                        {featuredServices.slice(0, 5).map((service) => (
                          <Link
                            key={service._id}
                            to={`/services/${service._id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-white transition-all duration-200"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = colors.primary;
                              e.currentTarget.style.color = colors.white;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#4B5563";
                            }}
                          >
                            <i className="fas fa-broom text-xs" style={{ color: colors.primary }} />
                            <span className="line-clamp-1">{service.name}</span>
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full mt-2 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{ background: colors.accent }}
                          onMouseEnter={(e) => e.currentTarget.style.background = colors.accentDark}
                          onMouseLeave={(e) => e.currentTarget.style.background = colors.accent}
                        >
                          <span>View All Services</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                <div className="my-4 pt-2 border-t border-gray-100"></div>

                {/* Contact Info */}
                <div className="mt-2 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: colors.primary }}>
                    Contact Us
                  </h4>
                  <div className="space-y-3">
                    <a href="tel:+254726933261" className="flex items-center gap-3 text-gray-600 hover:text-blue-700 transition-colors text-sm">
                      <i className="fas fa-phone-alt w-4" style={{ color: colors.primary }} />
                      <span>0726 933 261</span>
                    </a>
                    <a href="mailto:sylvieintercleaning@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-blue-700 transition-colors text-sm">
                      <i className="fas fa-envelope w-4" style={{ color: colors.primary }} />
                      <span>sylvieintercleaning@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <i className="fas fa-clock w-4" style={{ color: colors.primary }} />
                      <span>Mon–Fri 8am–8pm · Sat 9am–3pm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3 justify-center">
                  <a href="https://web.facebook.com/sylvie.cleaning" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all"
                    style={{ color: colors.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.gray;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    <i className="fab fa-facebook-f text-sm" />
                  </a>
                  <a href="https://www.instagram.com/sylviecleaning" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all"
                    style={{ color: colors.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.gray;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    <i className="fab fa-instagram text-sm" />
                  </a>
                  <a href="https://wa.me/254726933261" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all"
                    style={{ color: colors.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.gray;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    <i className="fab fa-whatsapp text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes navMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-dropdown {
          animation: dropdownSlide 0.2s ease-out forwards;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        * {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;
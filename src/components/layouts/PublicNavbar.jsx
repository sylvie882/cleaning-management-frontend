import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
    };

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home", icon: "fas fa-home", end: true },
    { to: "/services", label: "Services", icon: "fas fa-broom" },
    { to: "/blog", label: "Blog", icon: "fas fa-newspaper" },
    { to: "/about", label: "About", icon: "fas fa-info-circle" },
    { to: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  return (
    <>
      {/* TOP BANNER */}
      {showBanner && (
        <div
          role="banner"
          className="fixed top-0 w-full z-50 overflow-hidden"
          style={{
            background: "#dc2626",
            borderBottom: "1px solid #991b1b",
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

                  <span className="text-red-300 mx-2">◆</span>

                  <a
                    href="https://wa.me/254726933261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mx-5 px-4 py-1 rounded-full text-sm font-semibold text-white"
                    style={{
                      background: "#16a34a",
                    }}
                  >
                    <i className="fab fa-whatsapp mr-2" />
                    WhatsApp Us
                  </a>

                  <span className="text-red-300 mx-2">◆</span>

                  <span className="inline-flex items-center mx-5 text-sm text-white">
                    <i className="fas fa-clock text-yellow-300 mr-2" />
                    Mon–Fri 8am–8pm · Sat 9am–3pm
                  </span>

                  <span className="text-red-300 mx-2">◆</span>

                  <span className="inline-flex items-center mx-5 text-sm text-white">
                    <i className="fas fa-star text-yellow-300 mr-2" />
                    5000+ Happy Clients
                  </span>

                  <span className="text-red-300 mx-2">◆</span>
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
            background: "#ffffff",
            boxShadow: scrolled
              ? "0 8px 28px rgba(0,0,0,0.08)"
              : "0 1px 0 rgba(0,0,0,0.06)",
            padding: scrolled ? "10px 0" : "14px 0",
          }}
        >
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            {/* LOGO LINK */}
            <Link
              to="/"
              className="flex items-center"
              style={{ textDecoration: "none" }}
            >
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
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i
                        className={`${link.icon} text-sm ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <span>{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* BOOK BUTTON LINK */}
              <Link
                to="/book"
                className="ml-2 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: "#dc2626",
                }}
              >
                <i className="fas fa-calendar-check text-xs" />
                <span>Book Now</span>
              </Link>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <button
              className="lg:hidden mobile-toggle-btn flex flex-col justify-center items-center w-10 h-10 rounded-lg z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                style={{
                  marginBottom: "4px",
                  transform: isMenuOpen
                    ? "rotate(45deg) translate(3px,3px)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                style={{
                  marginBottom: "4px",
                  transform: isMenuOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300"
                style={{
                  transform: isMenuOpen
                    ? "rotate(-45deg) translate(3px,-3px)"
                    : "none",
                }}
              />
            </button>
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

          {/* MOBILE MENU - SLIDING FROM LEFT */}
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
              background: "#ffffff",
              zIndex: 46,
              boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
              overflowY: "auto",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-broom text-white" />
                    </div>
                    <div>
                      <div className="text-gray-800 font-bold text-sm">Sylvie Cleaning</div>
                      <div className="text-red-600 text-xs">Services</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                    aria-label="Close menu"
                  >
                    <i className="fas fa-times text-sm" />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Navigation */}
              <div className="flex-1 py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isActive ? "#b91c1c" : "#fef2f2",
                          }}
                        >
                          <i
                            className={`${link.icon} ${
                              isActive ? "text-white" : "text-red-600"
                            }`}
                          />
                        </span>
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}

                {/* Divider */}
                <div className="my-4 pt-2 border-t border-gray-100"></div>

                {/* Mobile Book Link */}
                <Link
                  to="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "#dc2626",
                  }}
                >
                  <i className="fas fa-calendar-check" />
                  <span>Book Your Cleaning Service</span>
                </Link>

                {/* Contact Info in Mobile Menu */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Contact Us</h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+254726933261"
                      className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors text-sm"
                    >
                      <i className="fas fa-phone-alt w-4 text-red-500" />
                      <span>0726 933 261</span>
                    </a>
                    <a
                      href="mailto:sylvieintercleaning@gmail.com"
                      className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors text-sm"
                    >
                      <i className="fas fa-envelope w-4 text-red-500" />
                      <span>sylvieintercleaning@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <i className="fas fa-clock w-4 text-red-500" />
                      <span>Mon–Fri 8am–8pm · Sat 9am–3pm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://web.facebook.com/sylvie.cleaning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <i className="fab fa-facebook-f text-sm" />
                  </a>
                  <a
                    href="https://www.instagram.com/sylviecleaning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <i className="fab fa-instagram text-sm" />
                  </a>
                  <a
                    href="https://wa.me/254726933261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all"
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

        * {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;
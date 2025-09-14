import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!showBanner) return null;

  return (
    <>
      {/* Premium Running Advertisement Banner */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white py-3 overflow-hidden shadow-2xl border-b border-indigo-500/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-500/20 animate-pulse"></div>
          <div className="absolute top-1/4 right-8 w-6 h-6 rounded-full bg-purple-500/30 animate-bounce"></div>
          <div className="absolute bottom-0 left-1/4 w-10 h-10 rounded-full bg-indigo-500/20 animate-ping"></div>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee-slow whitespace-nowrap flex items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="mx-6 font-medium text-sm md:text-base flex items-center">
                  <span className="inline-flex items-center bg-gradient-to-r from-blue-700/40 to-blue-800/40 px-4 py-2 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg">
                    <div className="relative">
                      <i className="fas fa-phone-alt mr-2 text-yellow-300"></i>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-semibold">Emergency Line:</span>
                    <span className="animate-pulse mx-2 font-bold text-yellow-300 text-lg tracking-wide bg-black/20 px-2 py-1 rounded-md">
                      0726 933 261
                    </span>
                  </span>
                </span>
                
                <span className="mx-2 text-blue-300 text-lg">✦</span>
                
                <span className="inline-flex items-center bg-gradient-to-r from-indigo-700/40 to-indigo-800/40 px-4 py-2 rounded-xl backdrop-blur-md border border-indigo-500/30 shadow-lg">
                  <i className="fas fa-clock mr-2 text-green-300"></i>
                  <span className="font-semibold">24/7 Service Available</span>
                </span>
                
                <span className="mx-2 text-blue-300 text-lg">✦</span>
                
                <a
                  href="https://wa.me/254726933261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mx-2 hover:text-green-200 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-600 hover:to-emerald-600 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                  <i className="fas fa-external-link-alt ml-2 text-xs opacity-70 group-hover:translate-x-0.5 transition-transform"></i>
                </a>
                
                <span className="mx-2 text-blue-300 text-lg">✦</span>
                
                <span className="inline-flex items-center bg-gradient-to-r from-purple-700/40 to-purple-800/40 px-4 py-2 rounded-xl backdrop-blur-md border border-purple-500/30 shadow-lg">
                  <div className="relative">
                    <i className="fas fa-star mr-2 text-yellow-300"></i>
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-semibold">Premium Cleaning Services</span>
                </span>
                
                <span className="mx-2 text-blue-300 text-lg">✦</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Close button for banner */}
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 bg-black/20 p-1 rounded-full hover:bg-red-500/30"
          onClick={() => setShowBanner(false)}
          aria-label="Close banner"
        >
          <i className="fas fa-times-circle text-lg"></i>
        </button>
        
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
          <div className="h-full bg-yellow-400 animate-progress"></div>
        </div>
      </div>

      {/* Enhanced Main Navbar */}
      <nav
        className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl py-3 mt-16"
            : "bg-white/90 backdrop-blur-sm py-5 mt-16"
        } ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/10 rounded-xl blur-lg group-hover:bg-blue-500/20 transition-all opacity-0 group-hover:opacity-100"></div>
              <img
                src={logo}
                alt="Sylvie Services Logo"
                className={`relative transition-all duration-300 ${
                  scrolled ? "h-10" : "h-12"
                } w-auto drop-shadow-lg`}
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-blue-600 font-bold text-lg md:text-xl transition-all duration-300 group-hover:text-blue-700">
                Sylvie Cleaning Services
              </span>
              <div className="text-xs text-gray-500 font-medium">
                Professional & Reliable
              </div>
            </div>
          </Link>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 translate-y-2.5" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>

          {/* Enhanced Desktop Navigation Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {[
              { to: "/", label: "Home", icon: "fas fa-home" },
              { to: "/services", label: "Services", icon: "fas fa-broom" },
              { to: "/blog", label: "Blog", icon: "fas fa-newspaper" },
              { to: "/about", label: "About Us", icon: "fas fa-info-circle" },
              { to: "/contact", label: "Contact", icon: "fas fa-envelope" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="group relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-lg hover:bg-blue-50 flex items-center space-x-2"
              >
                <i
                  className={`${item.icon} text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                ></i>
                <span>{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}

            {/* Enhanced Book Now Button */}
            <Link
              to="/book"
              className="ml-4 relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 group"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <i className="fas fa-calendar-check"></i>
                <span>Book Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="container mx-auto px-4 py-6 space-y-2">
            {[
              { to: "/", label: "Home", icon: "fas fa-home", delay: 0 },
              {
                to: "/services",
                label: "Services",
                icon: "fas fa-broom",
                delay: 100,
              },
              {
                to: "/blog",
                label: "Blog",
                icon: "fas fa-newspaper",
                delay: 150,
              },
              {
                to: "/about",
                label: "About Us",
                icon: "fas fa-info-circle",
                delay: 200,
              },
              {
                to: "/contact",
                label: "Contact",
                icon: "fas fa-envelope",
                delay: 300,
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`block text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transform hover:translate-x-2 flex items-center space-x-3 ${
                  isMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`${item.icon} w-5 text-blue-500`}></i>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Enhanced Mobile Book Now Button */}
            <div className="pt-4">
              <Link
                to="/book"
                className="block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-calendar-check"></i>
                <span>Book Your Service Now</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
            transform: scale(1);
          }
          51%,
          100% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }

        .animate-blink {
          animation: blink 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-progress {
          animation: progress 8s linear infinite;
        }
        
        .animate-once {
          animation-iteration-count: 1;
        }

        /* Glass morphism effect */
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Smooth transitions */
        * {
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke, opacity, box-shadow, transform,
            filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hover effects */
        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-marquee-slow {
            animation-duration: 30s;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-slow,
          .animate-blink,
          .animate-float,
          .animate-ping,
          .animate-progress {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;
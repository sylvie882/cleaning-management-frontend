// src/components/Public/HeroSection.jsx
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-image.jpg";

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat min-h-screen w-full relative
                 sm:bg-top md:bg-center lg:bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Professional Cleaning Services for Your Home and Business
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Experience the difference with our skilled and trusted cleaning
            professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/book"
              className="px-8 py-3 rounded-full text-base font-semibold text-white transition-transform duration-300 hover:scale-105"
              style={{ background: "#dc2626" }}
            >
              Book a Service
            </Link>
            <Link
              to="/services"
              className="px-8 py-3 rounded-full text-base font-semibold text-white transition-transform duration-300 hover:scale-105"
              style={{ background: "#000000" }}
            >
              Explore Services
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3 text-white">
              <i className="fas fa-check-circle text-red-600 text-xl"></i>
              <span className="text-sm font-medium">Professional Staff</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <i className="fas fa-check-circle text-red-600 text-xl"></i>
              <span className="text-sm font-medium">Eco-Friendly Products</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <i className="fas fa-check-circle text-red-600 text-xl"></i>
              <span className="text-sm font-medium">100% Satisfaction</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <i className="fas fa-check-circle text-red-600 text-xl"></i>
              <span className="text-sm font-medium">Affordable Prices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
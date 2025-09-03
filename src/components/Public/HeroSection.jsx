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
      <div className="absolute inset-0 bg-black bg-opacity-40 sm:bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="hero-content text-white">
          <div className="hero-content">
            <h1>Professional Cleaning Services for Your Home and Business</h1>
            <p>
              Experience the difference with our skilled and trusted cleaning
              professionals
            </p>
            <div className="hero-buttons">
              <Link to="/book" className="btn-primary">
                Book a Service
              </Link>
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-check-circle"></i>
                <span>Professional Staff</span>
              </div>
              <div className="feature">
                <i className="fas fa-check-circle"></i>
                <span>Eco-Friendly Products</span>
              </div>
              <div className="feature">
                <i className="fas fa-check-circle"></i>
                <span>100% Satisfaction</span>
              </div>
              <div className="feature">
                <i className="fas fa-check-circle"></i>
                <span>Affordable Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

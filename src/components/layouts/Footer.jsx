// src/components/layouts/Footer.jsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const seoData = {
    businessInfo: {
      name: "Sylvie Cleaning Services",
      phone: "+254726933261",
      email: "info@sylviecleaningservices.com",
      address: {
        street: "DALE HOUSE, RHAPTA ROAD,Fox Close",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE",
      },
    },
  };

  return (
    <footer className="relative bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Sylvie Cleaning Services Logo"
                className="h-10 w-auto rounded-lg shadow-md"
              />
              <span className="text-2xl font-semibold">
                {seoData.businessInfo.name}
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Reliable, eco-friendly cleaning services in Nairobi. Spotless homes
              and offices with a professional touch.
            </p>

            <div className="space-y-2 text-gray-400 text-base mt-4">
              <a
                href={`tel:${seoData.businessInfo.phone}`}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <Phone size={18} className="text-blue-400" />
                {seoData.businessInfo.phone}
              </a>
              <a
                href={`mailto:${seoData.businessInfo.email}`}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <Mail size={18} className="text-blue-400" />
                {seoData.businessInfo.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-blue-400 mt-0.5" />
                <span>
                  {seoData.businessInfo.address.street}, {seoData.businessInfo.address.city}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b border-blue-400 pb-1 inline-block">
              Services
            </h2>
            <ul className="space-y-2 text-base">
              {[
                { to: "/services/residential", label: "Residential Cleaning" },
                { to: "/services/commercial", label: "Commercial Cleaning" },
                { to: "/services/deep-cleaning", label: "Deep Cleaning" },
                { to: "/services/specialized", label: "Post Construction" },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={service.to}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/services"
                  className="text-blue-400 hover:text-cyan-400 font-medium inline-flex items-center text-base"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b border-blue-400 pb-1 inline-block">
              Quick Links
            </h2>
            <ul className="space-y-2 text-base">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "All Services" },
                { to: "/projects", label: "Our Projects" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/contact", label: "Contact Us" },
                { to: "/book", label: "Book Now" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} {seoData.businessInfo.name}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-of-service", label: "Terms of Service" },
              { to: "/sitemap", label: "Sitemap" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
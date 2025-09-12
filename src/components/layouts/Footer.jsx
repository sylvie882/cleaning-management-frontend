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
        street: "Dale House, Rhapta Road Westlands",
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

          {/* Newsletter & Socials */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b border-blue-400 pb-1 inline-block">
              Stay Connected
            </h2>
            <p className="text-gray-400 text-base mb-3">
              Get cleaning tips & updates:
            </p>
            <form className="flex items-center bg-gray-800 rounded-full overflow-hidden mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-base bg-transparent outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 p-2"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-gray-800/60 p-2 rounded-full text-gray-400 hover:text-white hover:bg-blue-500/30"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
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

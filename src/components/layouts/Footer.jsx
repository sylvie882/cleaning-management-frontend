// src/components/layouts/Footer.jsx
import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.jpg";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // SEO and Business Data (consistent with BlogPage)
  const seoData = {
    title: "Cleaning Tips & Articles | Sylvie Cleaning Services Blog",
    description: "Discover expert cleaning tips, industry insights, and best practices from Nairobi's top cleaning professionals. Learn how to keep your space spotless and healthy.",
    canonicalUrl: "https://www.sylviecleaningservices.com/blog",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/blog-social.jpg",
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      email: "info@sylviecleaningservices.com",
      address: {
        street: "Dale House, Rhapta Road Westlands",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      }
    }
  };

  // Structured data for organization (SEO)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoData.businessInfo.name,
    "url": seoData.businessInfo.url,
    "logo": seoData.businessInfo.logo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": seoData.businessInfo.phone,
      "contactType": "customer service",
      "email": seoData.businessInfo.email,
      "areaServed": "KE",
      "availableLanguage": ["English", "Swahili"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoData.businessInfo.address.street,
      "addressLocality": seoData.businessInfo.address.city,
      "addressRegion": seoData.businessInfo.address.state,
      "postalCode": seoData.businessInfo.address.zip,
      "addressCountry": seoData.businessInfo.address.country
    },
    "sameAs": [
      "https://facebook.com/sylviecleaning",
      "https://twitter.com/sylviecleaning",
      "https://instagram.com/sylviecleaning"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={logo}
                alt="Sylvie Cleaning Services - Professional Cleaning Company in Nairobi"
                className="h-10 w-auto rounded"
              />
              <span className="text-xl font-bold text-white">
                {seoData.businessInfo.name}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Professional cleaning services for homes and businesses in Nairobi. 
              Quality, reliability, and customer satisfaction are our top priorities. 
              We offer eco-friendly cleaning solutions tailored to your needs.
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href={`tel:${seoData.businessInfo.phone}`} className="text-sm hover:text-blue-400 transition-colors">
                  {seoData.businessInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${seoData.businessInfo.email}`} className="text-sm hover:text-blue-400 transition-colors">
                  {seoData.businessInfo.email}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">
                  {seoData.businessInfo.address.street}, {seoData.businessInfo.address.city}, {seoData.businessInfo.address.state} {seoData.businessInfo.address.zip}, {seoData.businessInfo.address.country}
                </span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              {[
                { href: "https://facebook.com/sylviecleaning", label: "Facebook", icon: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /> },
                { href: "https://twitter.com/sylviecleaning", label: "Twitter", icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /> },
                { href: "https://instagram.com/sylviecleaning", label: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                { href: "https://linkedin.com/company/sylviecleaning", label: "LinkedIn", icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={`Follow us on ${social.label}`}
                  className="text-gray-300 hover:text-white transition-colors bg-gray-800/50 p-2 rounded-full hover:bg-blue-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">
              Our Services
            </h2>
            <ul className="space-y-2">
              {[
                { to: "/services/residential", label: "Residential Cleaning" },
                { to: "/services/commercial", label: "Commercial Cleaning" },
                { to: "/services/deep-cleaning", label: "Deep Cleaning" },
                { to: "/services/specialized", label: "Post Construction Cleaning" }
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.to}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-blue-400 hover:text-cyan-400 transition-colors text-sm font-semibold inline-flex items-center group"
                >
                  View All Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {seoData.businessInfo.name}. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-of-service", label: "Terms of Service" },
              { to: "/sitemap", label: "Sitemap" }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
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
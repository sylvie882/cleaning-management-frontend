// src/pages/Public/AboutPage.jsx
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/newSlider6.jpg";
import { useState } from "react";

const AboutPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample data to search through
  const searchData = [
    {
      title: "Residential Cleaning",
      content: "Comprehensive home cleaning services tailored to your lifestyle and preferences.",
      link: "/services/residential"
    },
    {
      title: "Commercial Cleaning",
      content: "Professional cleaning solutions for offices, retail spaces, and commercial properties.",
      link: "/services/commercial"
    },
    {
      title: "Our Vision",
      content: "To be the most reputable and respected company in quality cleaning services and hygiene solutions.",
      link: "/about#vision"
    },
    {
      title: "Service Areas",
      content: "We serve Nairobi, Westlands, Nakuru, Kiambu and other major cities in Kenya.",
      link: "/about#service-areas"
    },
    {
      title: "Contact Us",
      content: "Our office phone works around the clock (24/7) to ensure we're always available for your needs.",
      link: "/contact"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Banner */}
      <div className="relative bg-blue-600 h-64 md:h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About Sylvie Intercleaning Company Limited
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Professional commercial cleaning services across Kenya
          </p>
        </div>
      </div>

      {/* Rest of the existing content remains the same */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sylvie Cleaning Services has been operational in Kenya and was
                  originally formed as a professional commercial cleaning
                  service. Due to the requests of many of our clients, we
                  expanded to offer comprehensive cleaning and maintenance
                  services.
                </p>
                <p>
                  Sylvie Cleaning Services is a professional commercial cleaning
                  service & sanitary bins services company, right now providing
                  its services in major cities of Kenya including Nairobi,
                  Westlands, Nakuru, Kiambu & other cities.
                </p>
                <p>
                  Our hands-on approach, coupled with our experience, our
                  attention to details and the professionalism exhibited by
                  management, employees and our commitment to customer
                  satisfaction set us apart.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <img
                src={aboutImage}
                alt="Sylvie Cleaning Services professional"
                className="w-300 h-100 rounded-lg shadow-md object-contain"
              />
            </div>
          </div>
        </section>

        {/* Vision, Mission, Motto & Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Foundation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The core principles that guide everything we do at Sylvie Cleaning
              Services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ),
                title: "Our Vision",
                description:
                  "To be the most reputable and respected company in quality cleaning services and hygiene solutions.",
                bgColor: "bg-pink-100",
                iconColor: "text-pink-600",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Our Mission",
                description:
                  "Grow the business through ethical and superior customer service ensuring greater social corporate responsibility and value creation.",
                bgColor: "bg-red-100",
                iconColor: "text-red-600",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ),
                title: "Our Motto",
                description:
                  "It's only clean, When our processes confirms, It's clean.",
                bgColor: "bg-pink-100",
                iconColor: "text-pink-600",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Our Values",
                description:
                  "Our goal is Your satisfaction (of course after our cleaning work). Office Phone works around the clock (24/7).",
                bgColor: "bg-red-100",
                iconColor: "text-red-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform hover:shadow-lg hover:-translate-y-1`}
              >
                <div className={`${item.iconColor} mb-4`}>{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence includes these key differentiators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Uniformed & Experienced Staff",
                description:
                  "Our cleaning staff includes uniformed and experienced cleaning professionals and well-vetted janitors who maintain the highest standards.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ),
                title: "Back-up Janitors Always on Standby",
                description:
                  "We ensure continuity of service with back-up janitors always on standby, so your cleaning schedule is never interrupted.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                title: "Professional Management Team",
                description:
                  "Our professional management team ensures quality control, timely service delivery, and maintains the highest standards of professionalism.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="mb-20" id="service-areas">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Service Areas
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We proudly serve major cities across Kenya
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {["Nairobi", "Westlands", "Nakuru", "Kiambu", "Other Cities"].map(
                (city, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">{city}</h4>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Sylvie Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Sylvie Cleaning Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              What makes us the preferred choice for professional cleaning
              services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Proven Track Record",
                description:
                  "Years of experience serving major cities across Kenya with consistent quality results.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "24/7 Availability",
                description:
                  "Our office phone works around the clock (24/7) to ensure we're always available for your needs.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                ),
                title: "Comprehensive Services",
                description:
                  "From commercial cleaning to sanitary bins services, we offer complete cleaning solutions.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Professional Team",
                description:
                  "Experienced, uniformed staff with professional management ensuring quality service delivery.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                title: "Customer Satisfaction Focus",
                description:
                  "Our commitment to customer satisfaction drives everything we do, ensuring your complete satisfaction.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                ),
                title: "Attention to Details",
                description:
                  "Our hands-on approach and attention to details ensure thorough, high-quality cleaning every time.",
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience Sylvie Cleaning Quality?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join the many satisfied clients across Kenya who trust us with
              their cleaning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg shadow-md transition-colors"
              >
                Book Our Services
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors"
              >
                Contact Us 24/7
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
/* eslint-disable no-unused-vars */
// src/pages/Public/ContactPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage } from "../../features/contact/contactSlice";
import ContactForm from "../../components/Public/ContactForm";
import mapImage from "../../assets/images/map.jpg";
import { Link } from "react-router-dom";
import GoogleMap from "./GoogleMap";
import SimpleLocationMap from "./GoogleMap";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.contact);
  const [messageSent, setMessageSent] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // SEO Metadata for contact page
  const seoData = {
    title: "Contact Sylvie Cleaning Services | Get a Free Quote Today",
    description: "Reach out to Nairobi's premier cleaning service. Call +254726933261 for residential & commercial cleaning quotes. Available 24/7 for all your cleaning needs.",
    canonicalUrl: "https://www.sylviecleaningservices.com/contact",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/contact-social.jpg",
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road,Fox Close",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      }
    }
  };

  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Sylvie Cleaning Services",
    "description": seoData.description,
    "url": seoData.canonicalUrl,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.sylviecleaningservices.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": seoData.canonicalUrl
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": seoData.businessInfo.name,
      "url": seoData.businessInfo.url,
      "logo": seoData.businessInfo.logo,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": seoData.businessInfo.phone,
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": seoData.businessInfo.address.street,
        "addressLocality": seoData.businessInfo.address.city,
        "addressRegion": seoData.businessInfo.address.state,
        "postalCode": seoData.businessInfo.address.zip,
        "addressCountry": seoData.businessInfo.address.country
      }
    }
  };

  // Toggle FAQ function
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Business information
  const businessInfo = {
    address: ".DALE HOUSE, RHAPTA ROAD,Fox Close, Nairobi-Kenya.",
    email: "info@sylviecleaningservices.com",
    phone: "0726 933261",
    alternatePhone: "0726 933261",
    workingHours: {
      weekdays: "7:00 AM - 7:00 AM (24/7)",
      saturday: "7:00 AM - 7:00 AM (24/7)",
      sunday: "7:00 AM - 7:00 AM (24/7)",
    },
    socialMedia: {
      facebook: "https://facebook.com/sylviecleaning",
      twitter: "https://twitter.com/sylviecleaning",
      instagram: "https://instagram.com/sylviecleaning",
      // linkedin: "https://linkedin.com/company/sylviecleaning",
    },
  };

  // Handle form submission
  const handleSubmit = (formData) => {
    dispatch(sendContactMessage(formData)).then((result) => {
      if (sendContactMessage.fulfilled.match(result)) {
        setMessageSent(true);
      }
    });
  };

  // FAQ items
  const faqItems = [
    {
      question: "How quickly can you respond to urgent cleaning requests?",
      answer:
        "We understand that urgent situations may arise. For emergency cleaning requests, we strive to respond within 2 hours and can often arrange service within 24 hours, depending on our schedule and the scope of the job.",
    },
    {
      question: "Do you provide free estimates for cleaning services?",
      answer:
        "Yes, we provide free estimates for all our cleaning services. Our head of cleaning will visit your location to assess your specific needs and provide a detailed quote with no obligation.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We currently provide cleaning services throughout Nairobi and surrounding areas within a 30km radius. For locations outside this area, please contact us to discuss availability and any additional travel fees that may apply.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.sylviecleaningservices.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Contact",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-blue-600 h-64 md:h-80 w-full pt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Get in touch with our team for any inquiries or to schedule a
            service
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Contact Information
            </h2>
            <p className="text-gray-600 mb-8">
              We're here to answer any questions you may have about our
              services. Reach out to us through any of the following channels:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Address */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600">{businessInfo.address}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Email
                  </h3>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Phone
                  </h3>
                  <p>
                    <a
                      href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
                      className="text-blue-600 hover:underline"
                    >
                      {businessInfo.phone}
                    </a>
                  </p>
                  {/* <p className="mt-1">
                    <a
                      href={`tel:${businessInfo.alternatePhone.replace(
                        /\s+/g,
                        ""
                      )}`}
                      className="text-blue-600 hover:underline"
                    >
                      {businessInfo.alternatePhone}
                    </a>
                  </p> */}
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Working Hours
                  </h3>

                  <p className="text-gray-600">Monday - Monday : 24/7</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href={businessInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-full p-3 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href={businessInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-full p-3 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href={businessInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-full p-3 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={businessInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-full p-3 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {messageSent ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mx-auto w-20 h-20 flex items-center justify-center mb-6">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-gray-600 mb-8">
                  Thank you for contacting CleanPro Services. We've received
                  your message and will get back to you as soon as possible.
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  onClick={() => setMessageSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
                <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
              </>
            )}
          </div>
        </div>

        {/* Map Section */}
        <SimpleLocationMap />

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqItems.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <svg
                    className={`h-6 w-6 text-blue-600 transform transition-transform ${
                      activeFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`mt-3 transition-all duration-300 overflow-hidden ${
                    activeFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience CleanPro Quality?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Book your cleaning service today or contact us for more
              information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg shadow-md transition-colors"
              >
                Book a Service
              </Link>
              <a
                href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
                className="inline-block bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
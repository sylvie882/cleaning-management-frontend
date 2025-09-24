/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/booking/bookingSlice";
import { getServiceById } from "../../features/services/servicesSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.booking);
  const { service, isLoading: serviceLoading } = useSelector(
    (state) => state.services
  );

  // SEO Metadata for booking page
  const seoData = {
    title: "Book Cleaning Services | Sylvie Cleaning Services Nairobi",
    description: "Schedule professional cleaning services in Nairobi. Book residential, commercial, deep cleaning, and specialized cleaning services with Sylvie Cleaning Services.",
    canonicalUrl: "https://www.sylviecleaningservices.com/booking",
    siteName: "Sylvie Cleaning Services",
    twitterHandle: "@sylviecleaning",
    socialImage: "https://www.sylviecleaningservices.com/booking-social.jpg",
    businessInfo: {
      name: "Sylvie Cleaning Services",
      url: "https://www.sylviecleaningservices.com",
      logo: "https://www.sylviecleaningservices.com/logo.png",
      phone: "+254726933261",
      address: {
        street: "Dale House, Rhapta Road Westlands",
        city: "Nairobi",
        state: "Nairobi",
        zip: "00100",
        country: "KE"
      }
    }
  };

  // Structured data for booking
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": seoData.title,
    "description": seoData.description,
    "url": seoData.canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": seoData.businessInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoData.businessInfo.logo
      }
    }
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    location: "",
    city: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  // List of services offered
  const serviceTypes = [
    "Residential Cleaning",
    "Commercial Cleaning",
    "Deep Cleaning",
    "Move-in/Move-out Cleaning",
    "Post-Construction Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
    "Office Cleaning",
  ];

  // Parse query parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get("service");
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (service) {
      let serviceType = "";
      const serviceData = service.data || service;
      if (serviceData.category === "commercial") {
        serviceType = "Commercial Cleaning";
        if (
          serviceData.name &&
          serviceData.name.toLowerCase().includes("window")
        ) {
          serviceType = "Window Cleaning";
        }
      } else if (serviceData.category === "residential") {
        serviceType = "Residential Cleaning";
      } else if (serviceData.category === "deep") {
        serviceType = "Deep Cleaning";
      } else if (serviceData.category === "move") {
        serviceType = "Move-in/Move-out Cleaning";
      } else if (serviceData.category === "construction") {
        serviceType = "Post-Construction Cleaning";
      } else if (serviceData.category === "carpet") {
        serviceType = "Carpet Cleaning";
      } else if (serviceData.category === "office") {
        serviceType = "Office Cleaning";
      }
      setInitialValues((prevValues) => ({
        ...prevValues,
        serviceType: serviceType,
      }));
    }
  }, [service]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    serviceType: Yup.string().required("Please select a service type"),
    location: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    preferredDate: Yup.date()
      .required("Preferred date is required")
      .min(new Date(), "Date cannot be in the past"),
    preferredTime: Yup.string().required("Preferred time is required"),
    message: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const bookingData = {
      client: {
        name: values.name,
        email: values.email,
        phone: values.phone,
      },
      serviceType: values.serviceType,
      location: {
        address: values.location,
        city: values.city,
      },
      preferredDateTime: new Date(
        `${values.preferredDate}T${values.preferredTime}`
      ),
      description: values.message,
      status: "pending",
    };
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get("service");
    if (serviceId) {
      bookingData.serviceId = serviceId;
    }
    const result = await dispatch(createBooking(bookingData));
    if (createBooking.fulfilled.match(result)) {
      resetForm();
      navigate("/booking/success", {
        state: {
          bookingId: result.payload._id,
          email: values.email,
        },
      });
    }
  };

  const getServiceData = () => {
    if (!service) return null;
    return service.data || service;
  };
  const serviceData = getServiceData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 bg-white rounded-3xl shadow-2xl animate-fade-in">
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
              "name": "Booking",
              "item": seoData.canonicalUrl
            }]
          })}
        </script>
      </Helmet>

      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3 drop-shadow-xl">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text animate-gradient-shift">
            Book a Cleaning Service
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Fill out the form below to schedule your cleaning service
        </p>
      </div>

      {/* Show loading indicator while fetching service */}
      {serviceLoading && !serviceData && (
        <div className="text-center py-4 animate-fade-in">
          <svg
            className="animate-spin mx-auto h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading service details...</p>
        </div>
      )}

      {/* Display selected service details if available */}
      {serviceData && (
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 shadow-md animate-fade-in">
          <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <i className="fas fa-broom text-blue-400 animate-float"></i>{" "}
            Selected Service
          </h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {serviceData.image && (
              <div className="w-full md:w-1/4 animate-fade-in">
                <img
                  src={serviceData.image}
                  alt={serviceData.name}
                  className="w-full h-auto rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
            <div className="flex-1 animate-fade-in">
              <h4 className="text-lg font-bold text-gray-800">
                {serviceData.name}
              </h4>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Category:</span>{" "}
                {serviceData.category.charAt(0).toUpperCase() +
                  serviceData.category.slice(1)}
              </p>
            </div>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-10 animate-fade-in">
            {/* Personal Information Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <i className="fas fa-user text-blue-400 animate-float"></i>{" "}
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Service Details Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <i className="fas fa-broom text-blue-400 animate-float"></i>{" "}
                Service Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Type
                  </label>
                  <Field
                    as="select"
                    id="serviceType"
                    name="serviceType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="serviceType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <i className="fas fa-calendar-alt text-blue-400 animate-float"></i>{" "}
                Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Preferred Date for Pre-Visit
                  </label>
                  <Field
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="preferredDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Preferred Time
                  </label>
                  <Field
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:shadow-lg"
                  />
                  <ErrorMessage
                    name="preferredTime"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <i className="fas fa-info-circle text-blue-400 animate-float"></i>{" "}
                Additional Information
              </h3>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Special Requests or Instructions
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none focus:shadow-lg"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 animate-fade-in">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-paper-plane animate-float"></i> Book
                    Now
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 2s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-fade-in,
          .animate-gradient-shift {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
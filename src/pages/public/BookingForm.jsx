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

  // Time slots for better UX
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "12:00", "13:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00"
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
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[\d\s-()]{10,}$/, "Please enter a valid phone number"),
    serviceType: Yup.string().required("Please select a service type"),
    location: Yup.string()
      .required("Address is required")
      .min(5, "Address should be at least 5 characters"),
    city: Yup.string().required("City is required"),
    preferredDate: Yup.date()
      .required("Preferred date is required")
      .min(new Date().toISOString().split('T')[0], "Date cannot be in the past"),
    preferredTime: Yup.string().required("Preferred time is required"),
    message: Yup.string().max(500, "Message cannot exceed 500 characters"),
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

  // Get tomorrow's date for min date attribute
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4 pt-44">
      <div className="max-w-4xl mx-auto">
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

        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Cleaning Service
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Complete the form below and we'll get back to you within 24 hours
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <i className="fas fa-shield-alt text-green-500"></i>
                Secure booking
              </span>
              <span className="flex items-center gap-1">
                <i className="fas fa-clock text-blue-500"></i>
                24/7 Support
              </span>
              <span className="flex items-center gap-1">
                <i className="fas fa-star text-yellow-500"></i>
                5-star rated
              </span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {/* <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg px-6 py-3">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-blue-600">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                Service Details
              </span>
              <span className="text-gray-400">→</span>
              <span className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs">2</span>
                Personal Info
              </span>
              <span className="text-gray-400">→</span>
              <span className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs">3</span>
                Confirmation
              </span>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Show loading indicator while fetching service */}
              {serviceLoading && !serviceData && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-gray-600">Loading service details...</p>
                </div>
              )}

              {/* Display selected service details if available */}
              {serviceData && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    {serviceData.image && (
                      <img
                        src={serviceData.image}
                        alt={serviceData.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">Selected Service</h3>
                      <p className="text-blue-600 font-medium">{serviceData.name}</p>
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
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="p-6 space-y-6">
                    {/* Service Details Section */}
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-broom text-blue-600 text-sm"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Service Details</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                            Service Type *
                          </label>
                          <Field
                            as="select"
                            id="serviceType"
                            name="serviceType"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          >
                            <option value="">Select a service type</option>
                            {serviceTypes.map((service, index) => (
                              <option key={index} value={service}>
                                {service}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="serviceType"
                            component="div"
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <Field
                              type="text"
                              id="city"
                              name="city"
                              placeholder="Enter your city"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            />
                          </div>
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                              Address *
                            </label>
                            <Field
                              type="text"
                              id="location"
                              name="location"
                              placeholder="Enter your full address"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                              name="location"
                              component="div"
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-calendar-alt text-green-600 text-sm"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Schedule Pre-Visit</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <Field
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            min={getTomorrowDate()}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                          <ErrorMessage
                            name="preferredDate"
                            component="div"
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <Field
                            as="select"
                            id="preferredTime"
                            name="preferredTime"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((time, index) => (
                              <option key={index} value={time}>
                                {time}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="preferredTime"
                            component="div"
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-purple-600 text-sm"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Your Information</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              placeholder="your@email.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <Field
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="+254 XXX XXX XXX"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-edit text-orange-600 text-sm"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Additional Details</h3>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Special Instructions or Requests
                        </label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="Any specific requirements, access instructions, or special requests..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Optional</span>
                          <span>{values.message.length}/500 characters</span>
                        </div>
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing Your Booking...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <i className="fas fa-calendar-check"></i>
                            Book Now - Get Free Quote
                          </span>
                        )}
                      </button>
                      <p className="text-center text-sm text-gray-500 mt-3">
                        By booking, you agree to our terms of service. We'll contact you within 24 hours to confirm.
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Sidebar - Benefits and Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Benefits Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Why Choose Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: "fa-shield-alt", color: "text-green-500", text: "Fully Insured & Bonded" },
                    { icon: "fa-clock", color: "text-blue-500", text: "Flexible Scheduling" },
                    { icon: "fa-star", color: "text-yellow-500", text: "5-Star Rated Service" },
                    { icon: "fa-award", color: "text-purple-500", text: "Professional Staff" },
                    { icon: "fa-leaf", color: "text-green-400", text: "Eco-Friendly Products" },
                    { icon: "fa-money-bill-wave", color: "text-green-600", text: "No Hidden Costs" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <i className={`fas ${item.icon} ${item.color} text-lg`}></i>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-xl p-6 text-white">
                <h3 className="font-semibold mb-4 text-lg">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone w-5 text-center"></i>
                    <span>+254 726 933 261</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope w-5 text-center"></i>
                    <span>info@sylviecleaning.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock w-5 text-center"></i>
                    <span>Mon-Sun: 7:00 AM - 9:00 PM</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <p className="text-sm opacity-90">
                    We're here to help you with any questions about our services or booking process.
                  </p>
                </div>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">What to Expect</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Free, no-obligation quote within 24 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Professional pre-visit assessment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Flexible rescheduling options</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>100% satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
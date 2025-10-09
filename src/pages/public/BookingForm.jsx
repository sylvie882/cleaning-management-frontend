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
  const { isLoading, isSuccess, error } = useSelector((state) => state.booking);
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
        street: "Dale House, Rhapta Road, Fox Close",
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

  const [submitError, setSubmitError] = useState("");

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
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM"
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

  // Handle successful booking
  useEffect(() => {
    if (isSuccess) {
      // Reset form and navigate to success page
      navigate("/booking/success", {
        state: {
          bookingId: "pending-confirmation", // You might want to get this from the actual response
          email: initialValues.email,
        },
      });
    }
  }, [isSuccess, navigate, initialValues.email]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setSubmitError(error.message || "Failed to create booking. Please try again.");
    }
  }, [error]);

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

  // ✅ FIXED: Helper function to convert time to 24-hour format
  const convertTimeTo24Hour = (time12h) => {
    if (!time12h) return "00:00";
    
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    // Handle 12 AM/PM conversion
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      // Convert to number, add 12, then back to string
      hours = String(parseInt(hours, 10) + 12);
    }
    
    // ✅ FIX: Ensure hours is always a string before using padStart
    return `${String(hours || '').padStart(2, '0')}:${minutes}`;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitError(""); // Clear previous errors
    
    try {
      // Format the date and time properly
      const formattedDate = new Date(`${values.preferredDate}T${convertTimeTo24Hour(values.preferredTime)}`);
      
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
        preferredDateTime: formattedDate.toISOString(),
        description: values.message,
        status: "pending",
      };

      // Add service ID if available from query params
      const queryParams = new URLSearchParams(location.search);
      const serviceId = queryParams.get("service");
      if (serviceId) {
        bookingData.serviceId = serviceId;
      }

      console.log("Submitting booking data:", bookingData); // For debugging

      // Dispatch the createBooking action
      const result = await dispatch(createBooking(bookingData));
      
      if (createBooking.fulfilled.match(result)) {
        // Success - reset form
        resetForm();
        setInitialValues({
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
        
        // Navigation will be handled by the useEffect watching isSuccess
      } else if (createBooking.rejected.match(result)) {
        // Error is already handled by the Redux state and useEffect
        console.error("Booking failed:", result.error);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4 pt-32">
      <div className="max-w-6xl mx-auto">
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
        <div className="text-center mb-12 pt-10">
          <div className="bg-blue-600 rounded-2xl shadow-sm border border-blue-900 p-8 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <i className="fas fa-calendar-plus text-blue-900 text-2xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Book Your Cleaning Service
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Complete the form below and we'll get back to you within 24 hours with a free, no-obligation quote
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
              <div>
                <p className="text-red-800 font-medium">Booking Failed</p>
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              {/* Show loading indicator while fetching service */}
              {serviceLoading && !serviceData && (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-gray-600">Loading service details...</p>
                </div>
              )}

              {/* Display selected service details if available */}
              {serviceData && (
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                  <div className="flex items-center gap-4 text-white">
                    {serviceData.image && (
                      <img
                        src={serviceData.image}
                        alt={serviceData.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-lg"
                      />
                    )}
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Selected Service</p>
                      <h3 className="font-bold text-lg">{serviceData.name}</h3>
                      {serviceData.price && (
                        <p className="text-blue-100 text-sm">Starting from {serviceData.price}</p>
                      )}
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
                {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                  <Form className="p-8 space-y-8">
                    {/* Personal Information Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-user text-blue-600 text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Your Information</h3>
                          <p className="text-gray-500 text-sm">We'll use this to contact you</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.name && touched.name ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <Field
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="+254 XXX XXX XXX"
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.phone && touched.phone ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                              errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Details Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-broom text-green-600 text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Service Details</h3>
                          <p className="text-gray-500 text-sm">Tell us about your cleaning needs</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                            Service Type *
                          </label>
                          <Field
                            as="select"
                            id="serviceType"
                            name="serviceType"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${
                              errors.serviceType && touched.serviceType ? 'border-red-300' : 'border-gray-300'
                            }`}
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
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                              City *
                            </label>
                            <Field
                              type="text"
                              id="city"
                              name="city"
                              placeholder="Enter your city"
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.city && touched.city ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                          </div>
                          <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                              Address *
                            </label>
                            <Field
                              type="text"
                              id="location"
                              name="location"
                              placeholder="Enter your full address"
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.location && touched.location ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage
                              name="location"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-calendar-alt text-purple-600 text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Schedule Pre-Visit</h3>
                          <p className="text-gray-500 text-sm">Choose your preferred date and time</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <Field
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            min={getTomorrowDate()}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                              errors.preferredDate && touched.preferredDate ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          <ErrorMessage
                            name="preferredDate"
                            component="div"
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          />
                        </div>
                        <div>
                          <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <Field
                            as="select"
                            id="preferredTime"
                            name="preferredTime"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${
                              errors.preferredTime && touched.preferredTime ? 'border-red-300' : 'border-gray-300'
                            }`}
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
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-edit text-orange-600 text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
                          <p className="text-gray-500 text-sm">Any special instructions or requests</p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          Special Instructions or Requests
                          <span className="text-gray-400 font-normal ml-1">(optional)</span>
                        </label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="Any specific requirements, access instructions, or special requests..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>Help us serve you better</span>
                          <span>{values.message.length}/500 characters</span>
                        </div>
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed group"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing Your Booking...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3 text-lg">
                            <i className="fas fa-calendar-check group-hover:scale-110 transition-transform"></i>
                            Book Now - Get Free Quote
                          </span>
                        )}
                      </button>
                      <p className="text-center text-sm text-gray-500 mt-4">
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
            <div className="space-y-6 sticky top-6">
              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <i className="fas fa-star"></i>
                  Why Choose Sylvie Cleaning
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "fa-shield-alt", text: "Fully Insured & Bonded" },
                    { icon: "fa-clock", text: "Flexible Scheduling" },
                    { icon: "fa-award", text: "Professional Staff" },
                    { icon: "fa-leaf", text: "Eco-Friendly Products" },
                    { icon: "fa-money-bill-wave", text: "No Hidden Costs" },
                    { icon: "fa-heart", text: "Satisfaction Guaranteed" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <i className={`fas ${item.icon} text-white`}></i>
                      </div>
                      <span className="text-blue-50">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <i className="fas fa-headset text-blue-600"></i>
                  Need Help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-blue-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Call us anytime</p>
                      <p className="font-semibold text-gray-900">+254 726 933 261</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email us</p>
                      <p className="font-semibold text-gray-900">info@sylviecleaning.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-clock text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Working hours</p>
                      <p className="font-semibold text-gray-900">Mon-Sun: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <i className="fas fa-bolt text-orange-500"></i>
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {[
                    "Free, no-obligation quote within 24 hours",
                    "Professional pre-visit assessment",
                    "Flexible rescheduling options",
                    "100% satisfaction guarantee",
                    "Professional equipment & supplies",
                    "Thorough quality inspection"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-1 text-sm"></i>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <i className="fas fa-shield-check text-2xl"></i>
                </div>
                <h4 className="font-bold mb-1">Secure & Trusted</h4>
                <p className="text-green-100 text-sm">Your information is safe with us. We respect your privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
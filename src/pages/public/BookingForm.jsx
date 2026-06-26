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

  // SEO Metadata - PRESERVED
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

  // Structured Data - PRESERVED
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

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM"
  ];

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

  useEffect(() => {
    if (isSuccess) {
      navigate("/booking/success", {
        state: {
          bookingId: "pending-confirmation",
          email: initialValues.email,
        },
      });
    }
  }, [isSuccess, navigate, initialValues.email]);

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

  const convertTimeTo24Hour = (time12h) => {
    if (!time12h) return "00:00";
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    return `${String(hours || '').padStart(2, '0')}:${minutes}`;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitError("");
    try {
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

      const queryParams = new URLSearchParams(location.search);
      const serviceId = queryParams.get("service");
      if (serviceId) {
        bookingData.serviceId = serviceId;
      }

      const result = await dispatch(createBooking(bookingData));
      
      if (createBooking.fulfilled.match(result)) {
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
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-32">
      {/* SEO - PRESERVED */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.socialImage} />
        <meta property="og:site_name" content={seoData.siteName} />
        <meta property="og:locale" content="en_KE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.socialImage} />
        <meta name="twitter:creator" content={seoData.twitterHandle} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header - Simplified */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Book Your Cleaning Service
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in your details and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 font-medium">{submitError}</p>
          </div>
        )}

        {/* Main Form - Simplified Single Column */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Selected Service Banner */}
          {service && service.data && (
            <div className="bg-blue-600 px-6 py-4">
              <p className="text-blue-100 text-sm">Selected Service</p>
              <h3 className="text-white font-bold text-lg">{service.data.name}</h3>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, values, setFieldValue, errors, touched }) => (
              <Form className="p-6 md:p-8 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name && touched.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+254 XXX XXX XXX"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone && touched.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type *
                    </label>
                    <Field
                      as="select"
                      id="serviceType"
                      name="serviceType"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                        errors.serviceType && touched.serviceType ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city && touched.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your full address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.location && touched.location ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date *
                      </label>
                      <Field
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        min={getTomorrowDate()}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.preferredDate && touched.preferredDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage name="preferredDate" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time *
                      </label>
                      <Field
                        as="select"
                        id="preferredTime"
                        name="preferredTime"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                          errors.preferredTime && touched.preferredTime ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>{time}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="preferredTime" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions <span className="text-gray-400">(optional)</span>
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Any specific requirements or special requests..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <div className="flex justify-end text-sm text-gray-400 mt-1">
                    {values.message.length}/500
                  </div>
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit - Simplified */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 text-lg">
                      <i className="fas fa-calendar-check"></i>
                      Book Now - Free Quote
                    </span>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500">
                  We'll contact you within 24 hours to confirm your booking.
                </p>
              </Form>
            )}
          </Formik>
        </div>

        {/* Trust Badge - Single simplified card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <i className="fas fa-shield-alt text-blue-600 text-2xl mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Fully Insured</p>
            </div>
            <div>
              <i className="fas fa-clock text-blue-600 text-2xl mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Flexible Scheduling</p>
            </div>
            <div>
              <i className="fas fa-leaf text-blue-600 text-2xl mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Eco-Friendly</p>
            </div>
            <div>
              <i className="fas fa-heart text-blue-600 text-2xl mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Satisfaction Guaranteed</p>
            </div>
          </div>
        </div>

        {/* Contact - Simple */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Call us at <span className="font-semibold text-gray-700">+254 726 933 261</span> or 
            email <span className="font-semibold text-gray-700">hello@sylviecleaning.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
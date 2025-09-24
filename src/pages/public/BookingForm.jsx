/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, getServiceById } from "../../features/booking/bookingSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isLoading, service } = useSelector((state) => state.booking);

  // SEO Metadata
  const seoData = {
    title: "Book Cleaning Services | Sylvie Cleaning Services Nairobi",
    description: "Schedule professional cleaning services in Nairobi. Book residential, commercial, deep cleaning, and specialized cleaning services.",
    canonicalUrl: "https://www.sylviecleaningservices.com/booking",
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    location: "",
    city: "Nairobi",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

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

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get("service");
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
  }, [dispatch, location.search]);

  // Set service type when service is loaded
  useEffect(() => {
    if (service) {
      const serviceData = service.data || service;
      let serviceType = "";
      
      // Map service category to service type
      const categoryMap = {
        commercial: "Commercial Cleaning",
        residential: "Residential Cleaning",
        deep: "Deep Cleaning",
        move: "Move-in/Move-out Cleaning",
        construction: "Post-Construction Cleaning",
        carpet: "Carpet Cleaning",
        office: "Office Cleaning"
      };

      serviceType = categoryMap[serviceData.category] || serviceData.name;
      
      setInitialValues(prev => ({
        ...prev,
        serviceType: serviceType,
        city: "Nairobi"
      }));
    }
  }, [service]);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[\d\s-()]+$/, "Invalid phone number")
      .required("Phone number is required"),
    serviceType: Yup.string().required("Please select a service type"),
    location: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    preferredDate: Yup.date()
      .required("Preferred date is required")
      .min(new Date(), "Date cannot be in the past"),
    preferredTime: Yup.string().required("Preferred time is required"),
    message: Yup.string().max(500, "Message too long"),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
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
          state: "Nairobi County",
        },
        preferredDateTime: new Date(`${values.preferredDate}T${values.preferredTime}`),
        description: values.message,
        status: "pending",
      };

      // Add service ID if coming from service page
      const queryParams = new URLSearchParams(location.search);
      const serviceId = queryParams.get("service");
      if (serviceId) {
        bookingData.serviceId = serviceId;
      }

      const result = await dispatch(createBooking(bookingData)).unwrap();
      
      if (result) {
        resetForm();
        navigate("/booking/success", {
          state: {
            bookingId: result._id,
            email: values.email,
            serviceType: values.serviceType,
          },
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      // You can show an error toast/message here
    } finally {
      setSubmitting(false);
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
        <link rel="canonical" href={seoData.canonicalUrl} />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">
          Book a Cleaning Service
        </h1>
        <p className="text-gray-600 text-lg">
          Fill out the form below to schedule your cleaning service
        </p>
      </div>

      {/* Selected Service Display */}
      {serviceData && (
        <div className="mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Selected Service
          </h3>
          <div className="flex items-center gap-4">
            {serviceData.image && (
              <img
                src={serviceData.image}
                alt={serviceData.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}
            <div>
              <h4 className="text-lg font-bold text-gray-800">
                {serviceData.name}
              </h4>
              <p className="text-gray-600">
                Category: {serviceData.category}
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
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Full Name *
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Your full name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email Address *
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border rounded-lg"
                    placeholder="your@email.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone Number *
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-3 border rounded-lg"
                    placeholder="+254 XXX XXX XXX"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="serviceType" className="block mb-2 font-medium">
                    Service Type *
                  </label>
                  <Field
                    as="select"
                    id="serviceType"
                    name="serviceType"
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="location" className="block mb-2 font-medium">
                    Address *
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Street address"
                  />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="city" className="block mb-2 font-medium">
                    City *
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Nairobi"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block mb-2 font-medium">
                    Preferred Date *
                  </label>
                  <Field
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full p-3 border rounded-lg"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <ErrorMessage name="preferredDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block mb-2 font-medium">
                    Preferred Time *
                  </label>
                  <Field
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="preferredTime" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Special Requests or Instructions
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Any special instructions or requirements..."
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting || isLoading || !isValid || !dirty}
                className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
/* eslint-disable no-unused-vars */
// src/components/Public/ContactForm.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage } from "../../features/contact/contactSlice";
import { toast } from "react-toastify";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Send contact message
    dispatch(sendContactMessage(formData)).then((result) => {
      if (sendContactMessage.fulfilled.match(result)) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        toast.success(
          "Your message has been sent successfully. We will get back to you soon!"
        );
      }
    });
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <form onSubmit={handleSubmit} className="flex-1 p-10 bg-white">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">
            Send Us a Message
          </h3>
          <p className="text-gray-600 text-sm">
            We'll get back to you as soon as possible
          </p>
        </div>

        <div className="flex gap-5 mb-5">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="flex gap-5 mb-5">
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.subject ? "border-red-500" : "border-gray-200"
              } rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.subject && (
              <div className="text-red-500 text-xs mt-1">{errors.subject}</div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 border ${
              errors.message ? "border-red-500" : "border-gray-200"
            } rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors`}
          ></textarea>
          {errors.message && (
            <div className="text-red-500 text-xs mt-1">{errors.message}</div>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md inline-flex items-center gap-2 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

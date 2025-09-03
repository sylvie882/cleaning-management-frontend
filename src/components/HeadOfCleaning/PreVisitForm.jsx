// src/components/HeadOfCleaning/PreVisitForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreVisitForm = ({ booking, mode, onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    preVisitDate: "",
    preVisitTime: "",
    notes: "",
    assessmentDetails: "",
    budget: 0,
    estimatedDuration: 60,
    requiredCleaners: 1,
    recommendedServices: [],
  });

  // Define available services
  const availableServices = [
    { id: "deep_cleaning", name: "Deep Cleaning", icon: "fas fa-broom" },
    {
      id: "window_cleaning",
      name: "Window Cleaning",
      icon: "fas fa-window-maximize",
    },
    { id: "carpet_cleaning", name: "Carpet Cleaning", icon: "fas fa-couch" },
    { id: "floor_polishing", name: "Floor Polishing", icon: "fas fa-sparkles" },
    {
      id: "furniture_cleaning",
      name: "Furniture Cleaning",
      icon: "fas fa-chair",
    },
    {
      id: "sanitization",
      name: "Sanitization & Disinfection",
      icon: "fas fa-spray-can",
    },
  ];

  // Populate form with booking data if available
  useEffect(() => {
    if (booking) {
      // Format date and time for input fields
      let preVisitDate = "";
      let preVisitTime = "";

      if (booking.preVisitDate) {
        const date = new Date(booking.preVisitDate);
        preVisitDate = date.toISOString().split("T")[0];
        preVisitTime = date.toTimeString().slice(0, 5);
      } else if (booking.preferredDateTime) {
        // Use preferred date/time as default if no pre-visit date is set
        const date = new Date(booking.preferredDateTime);
        preVisitDate = date.toISOString().split("T")[0];
        preVisitTime = date.toTimeString().slice(0, 5);
      }

      setFormData({
        preVisitDate,
        preVisitTime,
        notes: booking.notes || "",
        assessmentDetails: booking.assessmentDetails || "",
        budget: booking.budget || 0,
        estimatedDuration: booking.estimatedDuration || 60,
        requiredCleaners: booking.requiredCleaners || 1,
        recommendedServices: booking.recommendedServices || [],
      });
    }
  }, [booking]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Handle checkbox changes for recommended services
  const handleServiceChange = (serviceId) => {
    const currentServices = [...formData.recommendedServices];

    if (currentServices.includes(serviceId)) {
      // Remove service if already selected
      const updatedServices = currentServices.filter((id) => id !== serviceId);
      setFormData({
        ...formData,
        recommendedServices: updatedServices,
      });
    } else {
      // Add service if not selected
      setFormData({
        ...formData,
        recommendedServices: [...currentServices, serviceId],
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine date and time
    const preVisitDateTime = new Date(
      `${formData.preVisitDate}T${formData.preVisitTime}`
    );

    const updatedData = {
      ...formData,
      preVisitDate: preVisitDateTime.toISOString(),
      status:
        mode === "schedule" ? "pre_visit_scheduled" : "pre_visit_completed",
    };

    // Remove separate date and time fields
    delete updatedData.preVisitTime;

    onSubmit(updatedData);
  };

  // Cancel and go back
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-8">
        {mode === "schedule" && (
          <>
            {/* Schedule Header */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center mb-2">
                <i className="fas fa-calendar-check text-blue-600 text-xl mr-3"></i>
                <h2 className="text-2xl font-bold text-gray-900">
                  Schedule Pre-Visit
                </h2>
              </div>
              <p className="text-gray-600">
                Set a date and time for the pre-visit assessment
              </p>
            </div>

            {/* Date and Time Row */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Visit Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="preVisitDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="preVisitDate"
                      name="preVisitDate"
                      value={formData.preVisitDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                    <i className="fas fa-calendar-alt absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preVisitTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="preVisitTime"
                      name="preVisitTime"
                      value={formData.preVisitTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                    <i className="fas fa-clock absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes for Pre-Visit
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any specific instructions or notes for the pre-visit..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
              ></textarea>
            </div>
          </>
        )}

        {mode === "complete" && (
          <>
            {/* Complete Header */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-2">
                <i className="fas fa-clipboard-check text-green-600 text-xl mr-3"></i>
                <h2 className="text-2xl font-bold text-gray-900">
                  Complete Pre-Visit Assessment
                </h2>
              </div>
              <p className="text-gray-600">
                Provide assessment details and budget information
              </p>
            </div>

            {/* Assessment Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <label
                htmlFor="assessmentDetails"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Assessment Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="assessmentDetails"
                name="assessmentDetails"
                value={formData.assessmentDetails}
                onChange={handleChange}
                rows={4}
                placeholder="Provide details about the assessment findings..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-colors duration-200"
                required
              ></textarea>
            </div>

            {/* Budget and Duration Row */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="estimatedDuration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="estimatedDuration"
                      name="estimatedDuration"
                      value={formData.estimatedDuration}
                      onChange={handleChange}
                      min="30"
                      step="15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                      required
                    />
                    <i className="fas fa-clock absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="requiredCleaners"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Required Cleaners <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="requiredCleaners"
                      name="requiredCleaners"
                      value={formData.requiredCleaners}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                      required
                    />
                    <i className="fas fa-users absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Services */}
            <div className="bg-gray-50 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Recommended Additional Services
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                      formData.recommendedServices.includes(service.id)
                        ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleServiceChange(service.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.recommendedServices.includes(
                          service.id
                        )}
                        onChange={() => handleServiceChange(service.id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex items-center">
                        <i className={`${service.icon} text-gray-600 mr-2`}></i>
                        <span className="text-sm font-medium text-gray-900">
                          {service.name}
                        </span>
                      </div>
                    </div>

                    {formData.recommendedServices.includes(service.id) && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {formData.recommendedServices.length > 0 && (
                <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-info-circle text-green-600 mr-2"></i>
                    <span className="text-sm text-green-800">
                      {formData.recommendedServices.length} additional service
                      {formData.recommendedServices.length > 1 ? "s" : ""}{" "}
                      selected
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="bg-gray-50 rounded-lg p-6">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any additional notes or instructions..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-colors duration-200"
              ></textarea>
            </div>
          </>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            onClick={handleCancel}
          >
            <i className="fas fa-times mr-2"></i>
            Cancel
          </button>
          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-3 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
              mode === "schedule"
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            }`}
          >
            <i
              className={`fas ${
                mode === "schedule" ? "fa-calendar-check" : "fa-clipboard-check"
              } mr-2`}
            ></i>
            {mode === "schedule" ? "Schedule Pre-Visit" : "Complete Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreVisitForm;

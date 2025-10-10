/* eslint-disable no-unused-vars */
// src/pages/Admin/ServiceManagement.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../features/services/servicesSlice";
import ServiceForm from "../../components/Admin/ServiceForm";
import { formatCurrency } from "../../utils/formatters";
import { formatContentForDisplay } from "../../utils/markdownUtils";

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { services, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.services
  );

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  // Debug services data
  useEffect(() => {
    if (services && services.length > 0) {
      console.log("Services loaded:", services);
      services.forEach((service, index) => {
        console.log(`Service ${index + 1}:`, {
          name: service.name,
          images: service.images,
          imageUrl: service.imageUrl,
          hasImagesArray: Array.isArray(service.images),
          imagesCount: service.images ? service.images.length : 0
        });
      });
    }
  }, [services]);

  // Filter services by category and search term
  useEffect(() => {
    // Ensure services is an array before processing
    if (!services || !Array.isArray(services)) {
      setFilteredServices([]);
      return;
    }

    let result = [...services];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((service) => service.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          service.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredServices(result);
  }, [services, activeCategory, searchTerm]);

  // Open create service modal
  const openCreateModal = () => {
    setSelectedService(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  // Open edit service modal
  const openEditModal = (service) => {
    setSelectedService(service);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Handle form submission
  const handleSubmit = (serviceData) => {
    console.log("Submitting service data:", serviceData);
    
    // Ensure images array is properly formatted
    const formattedData = {
      ...serviceData,
      images: Array.isArray(serviceData.images) ? serviceData.images : [],
    };

    if (modalMode === "create") {
      dispatch(createService(formattedData)).then((result) => {
        if (createService.fulfilled.match(result)) {
          closeModal();
          dispatch(getServices());
        } else {
          console.error("Create failed:", result.error);
        }
      });
    } else {
      dispatch(updateService({ id: selectedService._id, serviceData: formattedData })).then(
        (result) => {
          if (updateService.fulfilled.match(result)) {
            closeModal();
            dispatch(getServices());
          } else {
            console.error("Update failed:", result.error);
          }
        }
      );
    }
  };

  // Handle service deletion
  const handleDelete = (serviceId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this service? This action cannot be undone."
      )
    ) {
      dispatch(deleteService(serviceId)).then(() => {
        dispatch(getServices());
      });
    }
  };

  // Toggle service active state
  const toggleServiceActive = (service) => {
    const updatedService = {
      ...service,
      isActive: !service.isActive,
      // Ensure images are preserved
      images: service.images || [],
    };

    dispatch(
      updateService({ id: service._id, serviceData: updatedService })
    ).then((result) => {
      if (updateService.fulfilled.match(result)) {
        dispatch(getServices());
      }
    });
  };

  // Service categories
  const categories = [
    { id: "all", name: "All Services" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "specialized", name: "Specialized" },
    { id: "move-in-out", name: "Move In/Out" },
    { id: "post-construction", name: "Post Construction" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Service Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your cleaning service offerings
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                    activeCategory === category.id
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
                !service.isActive ? "opacity-75" : ""
              }`}
            >
              {/* Service Image - FIXED SECTION */}
              <div className="relative h-48 bg-gray-200">
                {/* Image Count Badge */}
                {(service.images && service.images.length > 0) && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-black bg-opacity-70 text-white">
                      {service.images.length} {service.images.length === 1 ? 'image' : 'images'}
                    </span>
                  </div>
                )}

                {service.images && service.images.length > 0 ? (
                  <img
                    src={service.images[0]} // Use first image from images array
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22400%22 height%3D%22300%22 viewBox%3D%220 0 400 300%22%3E%3Crect fill%3D%22%23f3f4f6%22 width%3D%22400%22 height%3D%22300%22%2F%3E%3Ctext x%3D%22200%22 y%3D%22150%22 text-anchor%3D%22middle%22 fill%3D%22%239ca3af%22 font-size%3D%2216%22%3ENo Image%3C%2Ftext%3E%3C%2Fsvg%3E";
                    }}
                  />
                ) : service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22400%22 height%3D%22300%22 viewBox%3D%220 0 400 300%22%3E%3Crect fill%3D%22%23f3f4f6%22 width%3D%22400%22 height%3D%22300%22%2F%3E%3Ctext x%3D%22200%22 y%3D%22150%22 text-anchor%3D%22middle%22 fill%3D%22%239ca3af%22 font-size%3D%2216%22%3ENo Image%3C%2Ftext%3E%3C%2Fsvg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      service.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formatContentForDisplay(service.description, false),
                  }}
                />

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Category:</span>
                    <span className="text-gray-800 capitalize">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Price:</span>
                    <span className="text-gray-800 font-medium">
                      {formatCurrency(service.basePrice || service.price)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Duration:</span>
                    <span className="text-gray-800">
                      {service.duration >= 60
                        ? `${Math.floor(service.duration / 60)} hr${
                            service.duration % 60 > 0
                              ? ` ${service.duration % 60} min`
                              : ""
                          }`
                        : `${service.duration} min`}
                    </span>
                  </div>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-blue-600 pl-7">
                          +{service.features.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => openEditModal(service)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit Service"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleServiceActive(service)}
                    className={`${
                      service.isActive
                        ? "text-amber-600 hover:text-amber-800"
                        : "text-green-600 hover:text-green-800"
                    } transition-colors`}
                    title={
                      service.isActive
                        ? "Deactivate Service"
                        : "Activate Service"
                    }
                  >
                    {service.isActive ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Service"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Services Found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            No services match your current filters or no services have been
            added yet.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Your First Service
          </button>
        </div>
      )}

      {isModalOpen && (
        <ServiceForm
          mode={modalMode}
          service={selectedService}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
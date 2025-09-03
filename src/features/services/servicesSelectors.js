// src/features/services/servicesSelectors.js

// Select all services
export const selectAllServices = (state) => state.services.services;

// Select current service
export const selectCurrentService = (state) => state.services.service;

// Select featured services
export const selectFeaturedServices = (state) =>
  state.services.featuredServices;

// Select services loading state
export const selectServicesLoading = (state) => state.services.isLoading;

// Select services error state
export const selectServicesError = (state) => state.services.isError;

// Select services error message
export const selectServicesErrorMessage = (state) => state.services.message;

// Select services success state
export const selectServicesSuccess = (state) => state.services.isSuccess;

// Select services by category
export const selectServicesByCategory = (category) => (state) =>
  state.services.services.filter((service) => service.category === category);

// Select active services
export const selectActiveServices = (state) =>
  state.services.services.filter((service) => service.isActive);

// Select service by ID
export const selectServiceById = (serviceId) => (state) =>
  state.services.services.find((service) => service._id === serviceId);

// Select total number of services
export const selectTotalServices = (state) => state.services.services.length;

// Select total active services
export const selectTotalActiveServices = (state) =>
  state.services.services.filter((service) => service.isActive).length;

// Select services by price range
export const selectServicesByPriceRange = (minPrice, maxPrice) => (state) =>
  state.services.services.filter(
    (service) => service.price >= minPrice && service.price <= maxPrice
  );

// Select services by duration range
export const selectServicesByDurationRange =
  (minDuration, maxDuration) => (state) =>
    state.services.services.filter(
      (service) =>
        service.duration >= minDuration && service.duration <= maxDuration
    );

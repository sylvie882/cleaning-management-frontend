// src/features/testimonial/testimonialSelectors.js
// Select all testimonials
export const selectAllTestimonials = (state) => state.testimonial.testimonials;

// Select current testimonial
export const selectCurrentTestimonial = (state) =>
  state.testimonial.currentTestimonial;

// Select testimonial loading state
export const selectTestimonialLoading = (state) => state.testimonial.isLoading;

// Select testimonial success state
export const selectTestimonialSuccess = (state) => state.testimonial.isSuccess;

// Select testimonial error state
export const selectTestimonialError = (state) => state.testimonial.isError;

// Select testimonial error message
export const selectTestimonialErrorMessage = (state) =>
  state.testimonial.errorMessage;

// Select approved testimonials
export const selectApprovedTestimonials = (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) => testimonial.status === "approved"
  );

// Select pending testimonials
export const selectPendingTestimonials = (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) => testimonial.status === "pending"
  );

// Select rejected testimonials
export const selectRejectedTestimonials = (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) => testimonial.status === "rejected"
  );

// Select testimonials by status
export const selectTestimonialsByStatus = (status) => (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) => testimonial.status === status
  );

// Select testimonial by ID
export const selectTestimonialById = (id) => (state) =>
  state.testimonial.testimonials.find((testimonial) => testimonial._id === id);

// Select featured testimonials
export const selectFeaturedTestimonials = (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) =>
      testimonial.status === "approved" && testimonial.featured === true
  );

// Select recent testimonials (last 30 days)
export const selectRecentTestimonials = (state) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return state.testimonial.testimonials.filter(
    (testimonial) =>
      testimonial.status === "approved" &&
      new Date(testimonial.createdAt) >= thirtyDaysAgo
  );
};

// Select testimonials by rating (1-5 stars)
export const selectTestimonialsByRating = (rating) => (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) =>
      testimonial.status === "approved" && testimonial.rating === rating
  );

// Select testimonials with rating above specified value
export const selectTestimonialsAboveRating = (minRating) => (state) =>
  state.testimonial.testimonials.filter(
    (testimonial) =>
      testimonial.status === "approved" && testimonial.rating >= minRating
  );

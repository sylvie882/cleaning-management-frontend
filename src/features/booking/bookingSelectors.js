// src/features/booking/bookingSelectors.js

// Select all bookings
export const selectAllBookings = (state) => state.booking.bookings;

// Select current booking
export const selectCurrentBooking = (state) => state.booking.booking;

// Select bookings loading state
export const selectBookingsLoading = (state) => state.booking.isLoading;

// Select bookings error state
export const selectBookingsError = (state) => state.booking.isError;

// Select bookings error message
export const selectBookingsErrorMessage = (state) => state.booking.message;

// Select bookings success state
export const selectBookingsSuccess = (state) => state.booking.isSuccess;

// Select booking stats
export const selectBookingStats = (state) => state.booking.bookingStats;

// Select recent bookings
export const selectRecentBookings = (state) => state.booking.recentBookings;

// Select bookings by status
export const selectBookingsByStatus = (status) => (state) =>
  state.booking.bookings.filter((booking) => booking.status === status);

// Select pending bookings
export const selectPendingBookings = (state) =>
  state.booking.bookings.filter((booking) => booking.status === "pending");

// Select pre-visit scheduled bookings
export const selectPreVisitScheduledBookings = (state) =>
  state.booking.bookings.filter(
    (booking) => booking.status === "pre_visit_scheduled"
  );

// Select pre-visit completed bookings
export const selectPreVisitCompletedBookings = (state) =>
  state.booking.bookings.filter(
    (booking) => booking.status === "pre_visit_completed"
  );

// Select assigned bookings
export const selectAssignedBookings = (state) =>
  state.booking.bookings.filter((booking) => booking.status === "assigned");

// Select in-progress bookings
export const selectInProgressBookings = (state) =>
  state.booking.bookings.filter((booking) => booking.status === "in_progress");

// Select completed bookings
export const selectCompletedBookings = (state) =>
  state.booking.bookings.filter((booking) => booking.status === "completed");

// Select cleaner bookings
export const selectCleanerBookings = (cleanerId) => (state) =>
  state.booking.bookings.filter(
    (booking) => booking.assignedCleaner === cleanerId
  );

// Select booking by ID
export const selectBookingById = (bookingId) => (state) =>
  state.booking.bookings.find((booking) => booking._id === bookingId);

// Select total number of bookings
export const selectTotalBookings = (state) => state.booking.bookings.length;

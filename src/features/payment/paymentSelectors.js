// src/features/payment/paymentSelectors.js

// Select all payments
export const selectAllPayments = (state) => state.payment.payments;

// Select current payment
export const selectCurrentPayment = (state) => state.payment.payment;

// Select payments loading state
export const selectPaymentsLoading = (state) => state.payment.isLoading;

// Select payments error state
export const selectPaymentsError = (state) => state.payment.isError;

// Select payments error message
export const selectPaymentsErrorMessage = (state) => state.payment.message;

// Select payments success state
export const selectPaymentsSuccess = (state) => state.payment.isSuccess;

// Select payment stats
export const selectPaymentStats = (state) => state.payment.paymentStats;

// Select financial stats
export const selectFinancialStats = (state) => state.payment.financialStats;

// Select payments by status
export const selectPaymentsByStatus = (status) => (state) =>
  state.payment.payments.filter((payment) => payment.status === status);

// Select pending payments
export const selectPendingPayments = (state) =>
  state.payment.payments.filter((payment) => payment.status === "pending");

// Select completed payments
export const selectCompletedPayments = (state) =>
  state.payment.payments.filter((payment) => payment.status === "completed");

// Select failed payments
export const selectFailedPayments = (state) =>
  state.payment.payments.filter((payment) => payment.status === "failed");

// Select payments by booking ID
export const selectPaymentsByBookingId = (bookingId) => (state) =>
  state.payment.payments.filter((payment) => payment.booking === bookingId);

// Select payment by ID
export const selectPaymentById = (paymentId) => (state) =>
  state.payment.payments.find((payment) => payment._id === paymentId);

// Select today's payments
export const selectTodayPayments = (state) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return state.payment.payments.filter((payment) => {
    const paymentDate = new Date(payment.createdAt);
    return paymentDate >= today;
  });
};

// Select total revenue
export const selectTotalRevenue = (state) => {
  return state.payment.payments
    .filter((payment) => payment.status === "completed")
    .reduce((total, payment) => total + payment.amount, 0);
};

// Select total payments
export const selectTotalPayments = (state) => state.payment.payments.length;

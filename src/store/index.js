// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookingReducer from "../features/booking/bookingSlice";
import userReducer from "../features/users/userSlice";
import paymentReducer from "../features/payment/paymentSlice";
import serviceReducer from "../features/services/servicesSlice";
import testimonialReducer from "../features/testimonial/testimonialSlice";
import contactReducer from "../features/contact/contactSlice";
import notificationReducer from "../features/notification/notificationSlice";
import settingsReducer from "../features/settings/settingsSlice";
import articleReducer from "../features/articles/articleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    users: userReducer,
    payment: paymentReducer,
    services: serviceReducer,
    testimonials: testimonialReducer,
    contact: contactReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
    articles: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["payload.timestamp", "meta.arg", "payload.headers"],
      },
    }),
});

export default store;

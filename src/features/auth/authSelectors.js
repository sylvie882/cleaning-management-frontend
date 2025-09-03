// src/features/auth/authSelectors.js

// Select the current user from the auth state
export const selectCurrentUser = (state) => state.auth.user;

// Select user's role
export const selectUserRole = (state) => state.auth.user?.role;

// Select user's name
export const selectUserName = (state) => state.auth.user?.name;

// Select loading state
export const selectAuthLoading = (state) => state.auth.isLoading;

// Select error state
export const selectAuthError = (state) => state.auth.isError;

// Select error message
export const selectAuthErrorMessage = (state) => state.auth.message;

// Select success state
export const selectAuthSuccess = (state) => state.auth.isSuccess;

// Select if user is authenticated
export const selectIsAuthenticated = (state) => !!state.auth.user;

// Check if user has a specific role
export const selectHasRole = (role) => (state) =>
  state.auth.user?.role === role;

// Check if user is admin
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";

// Check if user is manager
export const selectIsManager = (state) => state.auth.user?.role === "manager";

// Check if user is head of cleaning
export const selectIsHeadOfCleaning = (state) =>
  state.auth.user?.role === "head_of_cleaning";

// Check if user is cleaner
export const selectIsCleaner = (state) => state.auth.user?.role === "cleaner";

// Check if user is accountant
export const selectIsAccountant = (state) =>
  state.auth.user?.role === "accountant";

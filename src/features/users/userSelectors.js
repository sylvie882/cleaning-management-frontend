// src/features/users/userSelectors.js

// Select all users
export const selectAllUsers = (state) => state.users.users;

// Select current user (individual user, not the logged-in user)
export const selectCurrentUser = (state) => state.users.user;

// Select all cleaners
export const selectCleaners = (state) => state.users.cleaners;

// Select users loading state
export const selectUsersLoading = (state) => state.users.isLoading;

// Select users error state
export const selectUsersError = (state) => state.users.isError;

// Select users error message
export const selectUsersErrorMessage = (state) => state.users.message;

// Select users success state
export const selectUsersSuccess = (state) => state.users.isSuccess;

// Select user statistics
export const selectUserStats = (state) => state.users.userStats;

// Select users by role
export const selectUsersByRole = (role) => (state) =>
  state.users.users.filter((user) => user.role === role);

// Select active users
export const selectActiveUsers = (state) =>
  state.users.users.filter((user) => user.isActive);

// Select user by ID
export const selectUserById = (userId) => (state) =>
  state.users.users.find((user) => user._id === userId);

// Select total number of users
export const selectTotalUsers = (state) => state.users.users.length;

// Select total number of cleaners
export const selectTotalCleaners = (state) => state.users.cleaners.length;

// Select total users by role
export const selectTotalUsersByRole = (role) => (state) =>
  state.users.users.filter((user) => user.role === role).length;

// Select active cleaners (available for assignment)
export const selectActiveCleaners = (state) =>
  state.users.cleaners.filter(
    (cleaner) => cleaner.isActive && cleaner.isAvailable
  );

// Select inactive users
export const selectInactiveUsers = (state) =>
  state.users.users.filter((user) => !user.isActive);

// Select cleaner by ID
export const selectCleanerById = (cleanerId) => (state) =>
  state.users.cleaners.find((cleaner) => cleaner._id === cleanerId);

// Select top performing cleaners
export const selectTopCleaners =
  (limit = 5) =>
  (state) => {
    if (!state.users.userStats || !state.users.userStats.cleanerPerformance) {
      return [];
    }

    // Sort by completed bookings or other performance metric
    return [...state.users.userStats.cleanerPerformance]
      .sort((a, b) => b.completedBookings - a.completedBookings)
      .slice(0, limit);
  };

// src/features/settings/settingsSelectors.js
// Select all settings
export const selectAllSettings = (state) => state.settings.settings;

// Select settings loading state
export const selectSettingsLoading = (state) => state.settings.isLoading;

// Select settings success state
export const selectSettingsSuccess = (state) => state.settings.isSuccess;

// Select settings error state
export const selectSettingsError = (state) => state.settings.isError;

// Select settings error message
export const selectSettingsErrorMessage = (state) =>
  state.settings.errorMessage;

// Select a specific setting by key
export const selectSettingByKey = (key) => (state) => {
  const setting = state.settings.settings.find(
    (setting) => setting.key === key
  );
  return setting ? setting.value : null;
};

// Select multiple settings by category
export const selectSettingsByCategory = (category) => (state) =>
  state.settings.settings.filter((setting) => setting.category === category);

// Select site settings
export const selectSiteSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "site");

// Select theme settings
export const selectThemeSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "theme");

// Select email settings
export const selectEmailSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "email");

// Select payment settings
export const selectPaymentSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "payment");

// Select social media settings
export const selectSocialMediaSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "social");

// Select API settings
export const selectApiSettings = (state) =>
  state.settings.settings.filter((setting) => setting.category === "api");

// Select site name
export const selectSiteName = (state) => {
  const siteName = state.settings.settings.find(
    (setting) => setting.key === "siteName"
  );
  return siteName ? siteName.value : "";
};

// Select site logo
export const selectSiteLogo = (state) => {
  const siteLogo = state.settings.settings.find(
    (setting) => setting.key === "siteLogo"
  );
  return siteLogo ? siteLogo.value : "";
};

// Select primary color
export const selectPrimaryColor = (state) => {
  const primaryColor = state.settings.settings.find(
    (setting) => setting.key === "primaryColor"
  );
  return primaryColor ? primaryColor.value : "#000000";
};

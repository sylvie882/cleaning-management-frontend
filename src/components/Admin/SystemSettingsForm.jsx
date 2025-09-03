/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Save, RefreshCw, Upload, X, Plus, Minus } from "lucide-react";

const SystemSettingsForm = ({ settings, activeTab, onSave, saving }) => {
  // Initialize formData with proper default structure
  const [formData, setFormData] = useState({
    company: {
      name: "",
      email: "",
      phone: "",
      address: "",
      logo: null,
    },
    business: {
      currency: "USD",
      timezone: "UTC",
      workingHours: {
        monday: { isOpen: true, start: "08:00", end: "17:00" },
        tuesday: { isOpen: true, start: "08:00", end: "17:00" },
        wednesday: { isOpen: true, start: "08:00", end: "17:00" },
        thursday: { isOpen: true, start: "08:00", end: "17:00" },
        friday: { isOpen: true, start: "08:00", end: "17:00" },
        saturday: { isOpen: false, start: "08:00", end: "17:00" },
        sunday: { isOpen: false, start: "08:00", end: "17:00" },
      },
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      minimumBookingNotice: 24,
      maximumBookingAdvance: 30,
    },
    pricing: {
      baseRate: 25,
      emergencyRate: 50,
      holidayRate: 35,
      taxRate: 10,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingConfirmation: true,
      reminderNotifications: true,
      completionNotifications: true,
    },
    system: {
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      sessionTimeout: 30,
      maxLoginAttempts: 3,
    },
  });

  // Update formData when settings prop changes
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        ...settings,
        // Ensure workingHours has proper structure
        business: {
          ...prevData.business,
          ...(settings.business || {}),
          workingHours: {
            ...prevData.business.workingHours,
            ...(settings.business?.workingHours || {}),
          },
        },
      }));
    }
  }, [settings]);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            [field]: value,
          },
        },
      },
    }));
  };

  const handleArrayChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: Array.isArray(value) ? value : [value],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.company.name}
            onChange={(e) =>
              handleInputChange("company", "name", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.company.email}
            onChange={(e) =>
              handleInputChange("company", "email", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="company@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.company.phone}
            onChange={(e) =>
              handleInputChange("company", "phone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={(e) =>
                handleInputChange("company", "logo", e.target.files[0])
              }
              className="hidden"
            />
            <label
              htmlFor="logo-upload"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </label>
            {formData.company.logo && (
              <span className="text-sm text-gray-600">
                {formData.company.logo.name || "Logo uploaded"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Address
        </label>
        <textarea
          value={formData.company.address}
          onChange={(e) =>
            handleInputChange("company", "address", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter full company address"
        />
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={formData.business.currency}
            onChange={(e) =>
              handleInputChange("business", "currency", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={formData.business.timezone}
            onChange={(e) =>
              handleInputChange("business", "timezone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">GMT</option>
            <option value="Europe/Paris">CET</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Booking Notice (hours)
          </label>
          <input
            type="number"
            value={formData.business.minimumBookingNotice}
            onChange={(e) =>
              handleInputChange(
                "business",
                "minimumBookingNotice",
                parseInt(e.target.value)
              )
            }
            min="1"
            max="168"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Booking Advance (days)
          </label>
          <input
            type="number"
            value={formData.business.maximumBookingAdvance}
            onChange={(e) =>
              handleInputChange(
                "business",
                "maximumBookingAdvance",
                parseInt(e.target.value)
              )
            }
            min="1"
            max="365"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Working Hours Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Working Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {formData.business.workingHours &&
            Object.entries(formData.business.workingHours).map(
              ([day, hours]) => (
                <div key={day} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700 capitalize">
                      {day}
                    </span>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hours?.isOpen || false}
                        onChange={(e) =>
                          handleWorkingHoursChange(
                            day,
                            "isOpen",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {hours?.isOpen ? "Open" : "Closed"}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={hours?.start || "08:00"}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "start", e.target.value)
                      }
                      disabled={!hours?.isOpen}
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="time"
                      value={hours?.end || "17:00"}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "end", e.target.value)
                      }
                      disabled={!hours?.isOpen}
                      className="block w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );

  const renderPricingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Rate (per hour)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={formData.pricing.baseRate}
              onChange={(e) =>
                handleInputChange(
                  "pricing",
                  "baseRate",
                  parseFloat(e.target.value)
                )
              }
              min="0"
              step="0.01"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Rate (per hour)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={formData.pricing.emergencyRate}
              onChange={(e) =>
                handleInputChange(
                  "pricing",
                  "emergencyRate",
                  parseFloat(e.target.value)
                )
              }
              min="0"
              step="0.01"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Holiday Rate (per hour)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={formData.pricing.holidayRate}
              onChange={(e) =>
                handleInputChange(
                  "pricing",
                  "holidayRate",
                  parseFloat(e.target.value)
                )
              }
              min="0"
              step="0.01"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.pricing.taxRate}
              onChange={(e) =>
                handleInputChange(
                  "pricing",
                  "taxRate",
                  parseFloat(e.target.value)
                )
              }
              min="0"
              max="100"
              step="0.1"
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2 text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(formData.notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.split(/(?=[A-Z])/).join(" ")}
              </h4>
              <p className="text-sm text-gray-600">
                {getNotificationDescription(key)}
              </p>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  handleInputChange("notifications", key, e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={formData.system.sessionTimeout}
            onChange={(e) =>
              handleInputChange(
                "system",
                "sessionTimeout",
                parseInt(e.target.value)
              )
            }
            min="5"
            max="480"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={formData.system.maxLoginAttempts}
            onChange={(e) =>
              handleInputChange(
                "system",
                "maxLoginAttempts",
                parseInt(e.target.value)
              )
            }
            min="3"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(formData.system)
          .filter(([key]) => typeof formData.system[key] === "boolean")
          .map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </h4>
                <p className="text-sm text-gray-600">
                  {getSystemSettingDescription(key)}
                </p>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    handleInputChange("system", key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );

  const getNotificationDescription = (key) => {
    const descriptions = {
      emailNotifications: "Send email notifications to users",
      smsNotifications: "Send SMS notifications to users",
      bookingConfirmation: "Send confirmation emails for new bookings",
      reminderNotifications: "Send reminder notifications before appointments",
      completionNotifications: "Send notifications when services are completed",
    };
    return descriptions[key] || "";
  };

  const getSystemSettingDescription = (key) => {
    const descriptions = {
      maintenanceMode: "Put the system in maintenance mode",
      allowRegistration: "Allow new user registrations",
      requireEmailVerification: "Require email verification for new accounts",
    };
    return descriptions[key] || "";
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return renderCompanySettings();
      case "business":
        return renderBusinessSettings();
      case "pricing":
        return renderPricingSettings();
      case "notifications":
        return renderNotificationSettings();
      case "system":
        return renderSystemSettings();
      default:
        return renderCompanySettings();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderTabContent()}

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => setFormData(settings)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={saving}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SystemSettingsForm;

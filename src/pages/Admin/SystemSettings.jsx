import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react";
import SystemSettingsForm from "./../../components/Admin/SystemSettingsForm";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
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
        start: "08:00",
        end: "17:00",
      },
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      minimumBookingNotice: 24, // hours
      maximumBookingAdvance: 30, // days
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
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 3,
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("company");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // This would be your actual API call
      // const response = await fetch('/api/admin/settings');
      // const data = await response.json();
      // setSettings(data);

      // Mock loading
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage({ type: "error", text: "Failed to load settings" });
      setLoading(false);
    }
  };

  const handleSave = async (updatedSettings) => {
    setSaving(true);
    try {
      // This would be your actual API call
      // const response = await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedSettings)
      // });

      // Mock save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSettings(updatedSettings);
      setMessage({ type: "success", text: "Settings saved successfully!" });

      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "company", label: "Company Info", icon: Globe },
    { id: "business", label: "Business Rules", icon: Clock },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Mail },
    { id: "system", label: "System", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your cleaning company system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {message.text && (
            <div
              className={`flex items-center px-4 py-2 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              {message.text}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <SystemSettingsForm
            settings={settings}
            activeTab={activeTab}
            onSave={handleSave}
            saving={saving}
          />
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-green-900">System Online</p>
              <p className="text-sm text-green-600">
                All services running normally
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-blue-900">Database Connected</p>
              <p className="text-sm text-blue-600">Response time: 45ms</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="font-medium text-yellow-900">Last Backup</p>
              <p className="text-sm text-yellow-600">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 bg-white rounded-lg shadow-md border-l-4 border-red-500">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-2">
            Danger Zone
          </h2>
          <p className="text-gray-600 mb-4">
            These actions are irreversible. Please be certain before proceeding.
          </p>
          <div className="space-y-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Reset All Settings
            </button>
            <button className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

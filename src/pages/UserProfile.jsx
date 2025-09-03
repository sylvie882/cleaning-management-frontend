import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { formatPhoneNumber } from "../utils/formatters";

import {
  User,
  Edit3,
  X,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Star,
  Clock,
  AlertTriangle,
  Save,
  Camera,
  Brush, // instead of Broom
  UserCheck, // instead of UserTie
  Settings, // instead of HardHat
  Hash, // instead of Calculator
  KeyRound, // instead of Key
  ClipboardList, // instead of Tasks
} from "lucide-react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    isAvailable: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        isAvailable: user.isAvailable !== undefined ? user.isAvailable : true,
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess && isEditing) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    }

    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);

    // Reset form data to current user data if canceling edit
    if (isEditing && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        isAvailable: user.isAvailable !== undefined ? user.isAvailable : true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  // Get role display name
  const getRoleDisplay = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "manager":
        return "Manager";
      case "head_of_cleaning":
        return "Head of Cleaning";
      case "cleaner":
        return "Cleaning Specialist";
      case "accountant":
        return "Accountant";
      default:
        return role;
    }
  };

  // Get role icon component
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return Shield;
      case "manager":
        return UserCheck;
      case "head_of_cleaning":
        return Settings;
      case "cleaner":
        return Brush;
      case "accountant":
        return Hash;
      default:
        return User;
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "manager":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "head_of_cleaning":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cleaner":
        return "bg-green-100 text-green-800 border-green-200";
      case "accountant":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-600">
            Unable to load user profile. Please try logging in again.
          </p>
        </div>
      </div>
    );
  }

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">
                Manage your account information and settings
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleEditToggle}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isEditing
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Profile Avatar */}
              <div className="text-center">
                <div className="relative inline-block">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-24 w-24 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {user.name}
                </h2>

                {/* Role Badge */}
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getRoleColor(
                    user.role
                  )}`}
                >
                  <RoleIcon className="h-4 w-4 mr-1" />
                  {getRoleDisplay(user.role)}
                </div>

                {/* Availability Status for Cleaners */}
                {user.role === "cleaner" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      <div
                        className={`h-3 w-3 rounded-full mr-2 ${
                          user.isAvailable ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          user.isAvailable ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {user.isAvailable ? "Available for Tasks" : "Busy"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      {formatPhoneNumber(user.phone)}
                    </span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{user.address}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <KeyRound className="h-4 w-4 mr-2" />
                  Change Password
                </button>

                {user.role === "cleaner" && (
                  <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    View My Tasks
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-lg shadow-sm">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Email cannot be changed. Contact admin for
                            assistance.
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Address Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Availability Settings for Cleaners */}
                    {user.role === "cleaner" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Availability Settings
                        </h3>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="isAvailable"
                            className="ml-2 text-sm font-medium text-gray-700"
                          >
                            Available for new assignments
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t">
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6">
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            Full Name
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {user.name}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            Email Address
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {user.email}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            Phone Number
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {user.phone
                              ? formatPhoneNumber(user.phone)
                              : "Not provided"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            Role
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {getRoleDisplay(user.role)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Address Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            Street Address
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {user.address || "Not provided"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">
                            City
                          </p>
                          <p className="text-lg text-gray-900 mt-1">
                            {user.city || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Performance Statistics for Cleaners */}
                    {user.role === "cleaner" && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Performance Statistics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                            <div className="flex items-center">
                              <div className="p-3 bg-green-500 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-white" />
                              </div>
                              <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                  {user.completedTasks || 0}
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                  Completed Tasks
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                            <div className="flex items-center">
                              <div className="p-3 bg-yellow-500 rounded-lg">
                                <Star className="h-6 w-6 text-white" />
                              </div>
                              <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                  {user.averageRating?.toFixed(1) || "0.0"}
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                  Average Rating
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                            <div className="flex items-center">
                              <div className="p-3 bg-blue-500 rounded-lg">
                                <Clock className="h-6 w-6 text-white" />
                              </div>
                              <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                  {user.onTimePercentage || 0}%
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                  On-Time Rate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

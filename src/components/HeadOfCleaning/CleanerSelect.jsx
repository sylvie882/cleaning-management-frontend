// src/components/HeadOfCleaning/CleanerSelect.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCleaners } from "../../features/users/userSlice";

const CleanerSelect = ({
  onSelect,
  initialCleanerId = null,
  requiredCleaners = 1,
}) => {
  const dispatch = useDispatch();
  const { cleaners, isLoading } = useSelector((state) => state.users);

  const [selectedCleaners, setSelectedCleaners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCleaners, setFilteredCleaners] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load cleaners on component mount
  useEffect(() => {
    dispatch(getCleaners());
  }, [dispatch]);

  // Set initial selected cleaner if provided
  useEffect(() => {
    if (initialCleanerId && cleaners.length > 0) {
      const initialCleaner = cleaners.find(
        (cleaner) => cleaner._id === initialCleanerId
      );
      if (initialCleaner) {
        setSelectedCleaners([initialCleaner]);
      }
    }
  }, [initialCleanerId, cleaners]);

  // Filter cleaners based on search term
  useEffect(() => {
    if (cleaners.length > 0) {
      if (searchTerm.trim() === "") {
        setFilteredCleaners(cleaners);
      } else {
        const filtered = cleaners.filter(
          (cleaner) =>
            cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cleaner.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCleaners(filtered);
      }
    }
  }, [cleaners, searchTerm]);

  // Notify parent component when selected cleaners change
  useEffect(() => {
    if (requiredCleaners === 1 && selectedCleaners.length > 0) {
      onSelect(selectedCleaners[0]._id);
    } else if (requiredCleaners > 1) {
      onSelect(selectedCleaners.map((cleaner) => cleaner._id));
    }
  }, [selectedCleaners, requiredCleaners, onSelect]);

  // Handle cleaner selection
  const handleSelectCleaner = (cleaner) => {
    if (requiredCleaners === 1) {
      // Single selection mode
      setSelectedCleaners([cleaner]);
    } else {
      // Multiple selection mode
      const isAlreadySelected = selectedCleaners.some(
        (c) => c._id === cleaner._id
      );

      if (isAlreadySelected) {
        setSelectedCleaners(
          selectedCleaners.filter((c) => c._id !== cleaner._id)
        );
      } else if (selectedCleaners.length < requiredCleaners) {
        setSelectedCleaners([...selectedCleaners, cleaner]);
      }
    }

    // Close dropdown in single selection mode
    if (requiredCleaners === 1) {
      setShowDropdown(false);
      setSearchTerm("");
    }
  };

  // Handle removing a selected cleaner
  const handleRemoveCleaner = (cleanerId) => {
    setSelectedCleaners(selectedCleaners.filter((c) => c._id !== cleanerId));
  };

  // Render cleaner card for the dropdown
  const renderCleanerCard = (cleaner) => {
    const isSelected = selectedCleaners.some((c) => c._id === cleaner._id);
    const isDisabled =
      !isSelected &&
      selectedCleaners.length >= requiredCleaners &&
      requiredCleaners > 1;

    return (
      <div
        key={cleaner._id}
        className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
          isSelected
            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
            : isDisabled
            ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
        onClick={() => !isDisabled && handleSelectCleaner(cleaner)}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          {cleaner.profileImage ? (
            <img
              src={cleaner.profileImage}
              alt={cleaner.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
              {cleaner.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Cleaner Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {cleaner.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">{cleaner.email}</p>
          {cleaner.phone && (
            <p className="text-xs text-gray-400 truncate">{cleaner.phone}</p>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0 ml-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              cleaner.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mr-1 ${
                cleaner.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {cleaner.isAvailable ? "Available" : "Busy"}
          </span>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Selected Cleaners Display */}
      <div className="relative">
        <div
          className={`min-h-12 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 ${
            showDropdown ? "ring-2 ring-blue-500 border-blue-500" : ""
          }`}
        >
          {selectedCleaners.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedCleaners.map((cleaner) => (
                <div
                  key={cleaner._id}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs mr-2">
                    {cleaner.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-32">{cleaner.name}</span>
                  {requiredCleaners > 1 && (
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCleaner(cleaner._id);
                      }}
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-gray-500 cursor-pointer flex items-center"
              onClick={() => setShowDropdown(true)}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                  Loading cleaners...
                </div>
              ) : (
                <div className="flex items-center">
                  <i className="fas fa-user-plus text-gray-400 mr-2"></i>
                  Select{" "}
                  {requiredCleaners > 1
                    ? `${requiredCleaners} cleaners`
                    : "cleaner"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dropdown Toggle Button */}
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i
            className={`fas fa-chevron-${
              showDropdown ? "up" : "down"
            } transition-transform duration-200`}
          ></i>
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search cleaners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {requiredCleaners > 1 && (
              <div className="mt-2 text-xs text-gray-600">
                Select up to {requiredCleaners} cleaners (
                {selectedCleaners.length} selected)
              </div>
            )}
          </div>

          {/* Cleaners List */}
          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Loading cleaners...</p>
              </div>
            ) : filteredCleaners.length > 0 ? (
              <div className="p-2 space-y-1">
                {filteredCleaners.map((cleaner) => renderCleanerCard(cleaner))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                  <i className="fas fa-user-slash text-3xl"></i>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No cleaners found
                </h3>
                <p className="text-xs text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No cleaners available"}
                </p>
              </div>
            )}
          </div>

          {/* Close Dropdown on Outside Click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CleanerSelect;

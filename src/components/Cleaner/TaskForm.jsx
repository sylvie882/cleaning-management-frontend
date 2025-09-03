// src/components/Cleaner/TaskForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ task, mode, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "",
    notes: "",
    completionPhotos: [],
    issues: "",
  });

  // Populate form with task data if available
  useEffect(() => {
    if (task) {
      setFormData({
        status: task.status || "",
        notes: task.notes || "",
        completionPhotos: task.completionPhotos || [],
        issues: task.issues || "",
      });
    }
  }, [task]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload for completion photos
  const handlePhotoUpload = (e) => {
    // This is a placeholder - in a real implementation,
    // you would upload the files to a server and get URLs back
    const files = Array.from(e.target.files);

    // Mock upload - just store file objects for now
    setFormData({
      ...formData,
      completionPhotos: [...formData.completionPhotos, ...files],
    });
  };

  // Remove a photo from the list
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...formData.completionPhotos];
    updatedPhotos.splice(index, 1);

    setFormData({
      ...formData,
      completionPhotos: updatedPhotos,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine status based on mode
    let status;
    if (mode === "start") {
      status = "in_progress";
    } else if (mode === "complete") {
      status = "completed";
    } else {
      status = formData.status;
    }

    const updatedData = {
      ...formData,
      status,
    };

    onSubmit(updatedData);
  };

  // Cancel and go back
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "start" && (
            <>
              {/* Header for Start Mode */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-play text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Start Task
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Update the status of this task to "In Progress"
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Notes Before Starting
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Add any initial observations or preparation notes
                  </p>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any notes before you start the task..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-sm placeholder-gray-400"
                  />
                </div>
              </div>
            </>
          )}

          {mode === "complete" && (
            <>
              {/* Header for Complete Mode */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-check text-green-600 text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Complete Task
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Mark this task as completed and provide details
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Completion Notes */}
                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Completion Notes <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Describe what was accomplished and any important
                    observations
                  </p>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what was done and any observations..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none text-sm placeholder-gray-400"
                  />
                </div>

                {/* Issues Section */}
                <div className="space-y-2">
                  <label
                    htmlFor="issues"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Issues Encountered
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Report any challenges, problems, or unexpected situations
                    (optional)
                  </p>
                  <textarea
                    id="issues"
                    name="issues"
                    value={formData.issues}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe any issues or challenges you faced..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 resize-none text-sm placeholder-gray-400"
                  />
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Upload Completion Photos
                    </label>
                    <p className="text-xs text-gray-500 mb-4">
                      Add photos to document the completed work (JPEG, PNG, max
                      10MB each)
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-colors duration-200">
                    <input
                      type="file"
                      id="completionPhotos"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="completionPhotos"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-3 text-center"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-cloud-upload-alt text-blue-600 text-2xl"></i>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          Choose Files
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          or drag and drop images here
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Photo Previews */}
                  {formData.completionPhotos.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Uploaded Photos ({formData.completionPhotos.length})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.completionPhotos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                              {typeof photo === "string" ? (
                                <img
                                  src={photo}
                                  alt={`Completion ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-sm"
                              onClick={() => handleRemovePhoto(index)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              onClick={handleCancel}
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </button>

            <button
              type="submit"
              className={`order-1 sm:order-2 px-6 py-3 border border-transparent rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm ${
                mode === "start"
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
              }`}
            >
              <i
                className={`mr-2 ${
                  mode === "start" ? "fas fa-play" : "fas fa-check"
                }`}
              ></i>
              {mode === "start" ? "Start Task" : "Complete Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

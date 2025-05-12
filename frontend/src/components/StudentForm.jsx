import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const StudentForm = ({ isOpen, onClose, onSubmit, title, student, isEdit = false }) => {
  const { isStudentAdding, isStudentUpdating } = useSelector((state) => state.Student);
  const [previewImage, setPreviewImage] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (isEdit && student) {
      // Set form values for editing
      setValue("firstName", student.firstName);
      setValue("lastName", student.lastName);
      setValue("email", student.email);
      setValue("phone", student.phone || "");
      setValue("Address", student.Address || "");
      setValue("gender", student.gender || "");
      setValue("status", student.status);
      
      // Format date for date input (YYYY-MM-DD)
      if (student.Dateofbirth) {
        const date = new Date(student.Dateofbirth);
        setValue("Dateofbirth", date.toISOString().split('T')[0]);
      }

      // Set image preview if exists
      if (student.profileImage) {
        setPreviewImage(student.profileImage);
      }
    }
  }, [isEdit, student, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    // Create FormData object to handle file uploads
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(data).forEach(key => {
      if (key !== "profileImage") {
        formData.append(key, data[key]);
      }
    });
    
    // Add profile image if selected
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                {...register("Dateofbirth", { required: "Date of birth is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.Dateofbirth && (
                <p className="text-red-500 text-sm mt-1">{errors.Dateofbirth.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Status - Only show for edit mode */}
            {isEdit && (
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  {...register("status")}
                  className="w-full p-2 border rounded"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="graduated">Graduated</option>
                </select>
              </div>
            )}

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                {...register("Address")}
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
            </div>

            {/* Profile Image */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Profile Image</label>
              <div className="flex items-center space-x-4">
                {previewImage && (
                  <div className="w-24 h-24 relative">
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  {...register("profileImage")}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={isStudentAdding || isStudentUpdating}
            >
              {isStudentAdding || isStudentUpdating
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm; 
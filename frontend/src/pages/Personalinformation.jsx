import React, { useState } from 'react';

function PersonalInformationForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    dob: '',
    phone: '',
    gender: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Personal Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
          )}

          <div>
            <label
              htmlFor="upload"
              className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200"
            >
              📤 Upload
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstname"
            placeholder="Enter your Firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Enter your Lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex justify-between mt-8">
          <div className="space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            🗑 Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformationForm;

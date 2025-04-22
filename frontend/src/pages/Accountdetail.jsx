"use client"

import { useState } from "react"
import { FiUpload, FiTrash2, FiChevronDown, FiSave, FiX, FiTrash } from "react-icons/fi"

function Accountdetail() {
  const [formData, setFormData] = useState({
    name: "Can Saas",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    country: "Indonesia",
    timeZone: "Eastern - US & Canada",
    welcomeMessage: "Welcome to my scheduling page. Please follow the instruction to add an event calendar",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-4xl w-full h-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
          <div className="text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-blue-600 hover:bg-blue-50 transition-colors">
          <FiUpload className="text-blue-600" />
          <span>Upload</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
          <FiTrash2 className="text-gray-600" />
          <span>Remove</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <div className="relative">
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Indonesian">Indonesian</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div>
          <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
            Date Format
          </label>
          <div className="relative">
            <select
              id="dateFormat"
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div>
          <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 mb-1">
            Time Format
          </label>
          <div className="relative">
            <select
              id="timeFormat"
              name="timeFormat"
              value={formData.timeFormat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">24h</option>
              <option value="12h">12h</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Indonesia">Indonesia</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">
              Time Zone
            </label>
            <div className="relative">
              <select
                id="timeZone"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Eastern - US & Canada">Eastern - US & Canada</option>
                <option value="Central - US & Canada">Central - US & Canada</option>
                <option value="Pacific - US & Canada">Pacific - US & Canada</option>
                <option value="GMT">GMT</option>
                <option value="UTC">UTC</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mt-6">
            <div className="text-sm text-gray-400">Current Time: 22:37</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700 mb-1">
            Welcome Message
          </label>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FiSave />
          <span>Save Change</span>
        </button>

        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiX />
          <span>Cancel</span>
        </button>

        <button className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
          <FiTrash />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  )
}

export default Accountdetail

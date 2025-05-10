import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettingallTeachers, SearchTeacher } from "../features/Teacher";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaSearch, FaTimes, FaUserGraduate, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const AdminTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getallTeachers, isLoading, error, searchdata, issearchdata } = useSelector((state) => state.Teacher);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(gettingallTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timer = setTimeout(() => {
        dispatch(SearchTeacher(searchQuery));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(gettingallTeachers());
    }
  }, [dispatch, searchQuery]);

  const teachers = searchQuery.trim() ? searchdata : getallTeachers || [];

  const calculateAge = (dob) => {
    return dob ? dayjs().diff(dayjs(dob), "year") : "N/A";
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleRefresh = () => {
    dispatch(gettingallTeachers());
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Teacher Management</h1>
            <p className="text-gray-600">View and manage all teachers in the system</p>
          </div>
          <button
            onClick={() => navigate("/admin/teachers/add")}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Add New Teacher
          </button>
        </div>

        {/* Tabs and Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 md:mb-0">
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "all" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("all")}
              >
                All Teachers
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "active" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "inactive" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setActiveTab("inactive")}
              >
                Inactive
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teachers..."
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaTimes className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        {isLoading && (
          <div className="flex items-center justify-center p-6 bg-blue-50 text-blue-700 rounded-lg mb-6">
            <FiRefreshCw className="animate-spin mr-2" />
            Loading teachers...
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {/* Teachers Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr key={teacher._id || teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={teacher.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(teacher.firstName + " " + teacher.lastName) + "&background=random"}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {teacher.firstName || "N/A"} {teacher.lastName || ""}
                            </div>
                            <div className="text-sm text-gray-500">
                              {teacher._id?.substring(0, 8) || teacher.id?.substring(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{teacher.phone || "N/A"}</div>
                        <div className="text-sm text-gray-500">{teacher.Address?.substring(0, 20) + (teacher.Address?.length > 20 ? "..." : "") || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateAge(teacher.Dateofbirth)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {teacher.classTeach || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.year || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/teachers/edit/${teacher._id || teacher.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => console.log("Delete", teacher._id || teacher.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/teachers/view/${teacher._id || teacher.id}`)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <FaUserGraduate />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FaUserGraduate className="text-gray-400 text-4xl mb-2" />
                        <h3 className="text-lg font-medium text-gray-900">No teachers found</h3>
                        <p className="text-gray-500 mt-1">
                          {searchQuery ? "Try a different search term" : "Add a new teacher to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (would be implemented with actual pagination logic) */}
        {teachers.length > 0 && (
          <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{teachers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeacher;
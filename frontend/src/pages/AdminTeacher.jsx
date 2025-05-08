import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Eye } from "lucide-react";
import {
  gettingallTeachers,
  SearchTeacher,
  RemoveTeacher,
} from "../features/Teacher";

const AdminTeacher = () => {
  const dispatch = useDispatch();
  const { getallTeacher, issearchdata, searchdata } = useSelector(
    (state) => state.Teacher
  );
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  
    dispatch(gettingallTeachers());
  }, [dispatch]);

  const filteredTeachers = (searchdata || getallTeacher).filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.year.includes(searchTerm)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      dispatch(gettingallTeachers()); // Reset to fetch all teachers
    } else {
      dispatch(SearchTeacher(e.target.value)); // Perform search
    }
  };

  const handleRemoveTeacher = (id) => {
    dispatch(RemoveTeacher(id));
  };

  return (
    <div className="p-6 font-poppins bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Teacher List</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

           
              <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                <Plus className="h-4 w-4" />
                <span>Add Teacher</span>
              </button>
            </div>
          </div>


          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b text-gray-700">ID</th>
                  <th className="px-6 py-3 border-b text-gray-700">Name</th>
                  <th className="px-6 py-3 border-b text-gray-700">Year</th>
                  <th className="px-6 py-3 border-b text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b text-gray-800">{teacher.id}</td>
                      <td className="px-6 py-4 border-b text-gray-800">{teacher.name}</td>
                      <td className="px-6 py-4 border-b text-gray-800">{teacher.year}</td>
                      <td className="px-6 py-4 border-b">
                        <button className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>View</span>
                        </button>
                        <button
                          className="flex items-center text-red-600 hover:text-red-800 transition-colors ml-4"
                          onClick={() => handleRemoveTeacher(teacher.id)}
                        >
                          <span>Remove</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No teachers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredTeachers.length} of {getallTeacher.length} teachers
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacher;

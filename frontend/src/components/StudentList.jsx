import React from "react";

const StudentList = ({ students, isLoading, onDelete, onEdit, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          alt={`${student.firstName} ${student.lastName}`}
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                          <span className="text-gray-600">
                            {student.firstName.charAt(0)}
                            {student.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {student.phone || "No phone"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{student.email}</td>
                  <td className="py-3 px-4">
                    {formatDate(student.Dateofbirth)}
                  </td>
                  <td className="py-3 px-4">{student.gender || "Not specified"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : student.status === "suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewDetails(student)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(student)}
                        className="text-green-500 hover:text-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(student._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList; 
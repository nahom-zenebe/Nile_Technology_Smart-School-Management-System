import React from "react";
import { useDispatch } from "react-redux";
import { getStudentAcademicRecords } from "../features/Student";

const StudentDetails = ({ isOpen, onClose, student, onEdit }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (student?._id) {
      dispatch(getStudentAcademicRecords(student._id));
    }
  }, [student, dispatch]);

  if (!isOpen || !student) return null;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFeeStatusColor = (status) => {
    return status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Student Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Profile Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center mb-6">
              {student.profileImage ? (
                <img
                  src={student.profileImage}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="w-48 h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500 text-4xl font-medium">
                    {student.firstName.charAt(0)}
                    {student.lastName.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-gray-500">{student.email}</p>
              <div className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    student.status
                  )}`}
                >
                  {student.status}
                </span>
              </div>
              <button
                onClick={onEdit}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Information</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium w-24">Phone:</span>
                  <span>{student.phone || "Not provided"}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-24">Address:</span>
                  <span>{student.Address || "Not provided"}</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Personal Information</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium w-24">Gender:</span>
                  <span>{student.gender || "Not specified"}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-24">Birthday:</span>
                  <span>{formatDate(student.Dateofbirth)}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-24">Fee Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getFeeStatusColor(student.feeStatus)}`}>
                    {student.feeStatus}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column - Academic Info */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="border-b mb-4">
              <ul className="flex">
                <li className="mr-1">
                  <a
                    href="#attendance"
                    className="bg-white inline-block py-2 px-4 text-blue-500 font-semibold border-l border-t border-r rounded-t"
                  >
                    Attendance
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    href="#grades"
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Grades
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    href="#fees"
                    className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Fee History
                  </a>
                </li>
              </ul>
            </div>

            {/* Attendance Section */}
            <div id="attendance" className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Attendance History</h3>
              {student.attendance && student.attendance.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border text-left">Date</th>
                        <th className="py-2 px-4 border text-left">Status</th>
                        <th className="py-2 px-4 border text-left">Subject</th>
                        <th className="py-2 px-4 border text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Placeholder for attendance data */}
                      <tr>
                        <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                          Attendance data will be displayed here
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No attendance records found.</p>
              )}
            </div>

            {/* Grades Section */}
            <div id="grades" className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Academic Performance</h3>
              {student.grades && student.grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border text-left">Subject</th>
                        <th className="py-2 px-4 border text-left">Grade</th>
                        <th className="py-2 px-4 border text-left">Term</th>
                        <th className="py-2 px-4 border text-left">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Placeholder for grades data */}
                      <tr>
                        <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                          Grade data will be displayed here
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No grade records found.</p>
              )}
            </div>

            {/* Fee History Section */}
            <div id="fees" className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Fee History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border text-left">Date</th>
                      <th className="py-2 px-4 border text-left">Amount</th>
                      <th className="py-2 px-4 border text-left">Status</th>
                      <th className="py-2 px-4 border text-left">Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Placeholder for fee data */}
                    <tr>
                      <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                        Fee history will be displayed here
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails; 
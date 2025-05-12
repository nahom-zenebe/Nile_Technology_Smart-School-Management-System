import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStudents,
  addStudent,
  removeStudent,
  updateStudent,
  calculateStudentStats
} from "../features/Student";
import TopNavbar from "../components/Topnavbar";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import StudentDetails from "../components/StudentDetails";
import toast from "react-hot-toast";

const StudentManagement = () => {
  const dispatch = useDispatch();
  const { students, isStudentsLoading, studentStats } = useSelector((state) => state.Student);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      dispatch(calculateStudentStats());
    }
  }, [students, dispatch]);

  // Filter students based on status and search query
  const filteredStudents = students?.filter((student) => {
    // Filter by status
    if (filterStatus !== "all" && student.status !== filterStatus) return false;

    // Filter by search query (name or email)
    if (searchQuery) {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return true;
  }) || [];

  const handleAddStudent = (formData) => {
    dispatch(addStudent(formData))
      .unwrap()
      .then(() => {
        setShowAddModal(false);
      })
      .catch((error) => {
        toast.error(error || "Failed to add student");
      });
  };

  const handleEditStudent = (formData) => {
    dispatch(updateStudent({ id: currentStudent._id, updatedData: formData }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
        setCurrentStudent(null);
      })
      .catch((error) => {
        toast.error(error || "Failed to update student");
      });
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(removeStudent(studentId));
    }
  };

  const handleViewDetails = (student) => {
    setCurrentStudent(student);
    setShowDetailsModal(true);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  return (
    <div className="block">
      <TopNavbar />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add New Student
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-2xl font-bold">{studentStats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm">Active</h3>
            <p className="text-2xl font-bold text-green-600">{studentStats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm">Suspended</h3>
            <p className="text-2xl font-bold text-red-600">{studentStats.suspended}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm">Graduated</h3>
            <p className="text-2xl font-bold text-blue-600">{studentStats.graduated}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
        </div>

        {/* Student List Component */}
        <StudentList 
          students={filteredStudents}
          isLoading={isStudentsLoading}
          onDelete={handleDeleteStudent}
          onEdit={handleEditClick}
          onViewDetails={handleViewDetails}
        />

        {/* Add Student Modal */}
        {showAddModal && (
          <StudentForm
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddStudent}
            title="Add New Student"
          />
        )}

        {/* Edit Student Modal */}
        {showEditModal && currentStudent && (
          <StudentForm
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setCurrentStudent(null);
            }}
            onSubmit={handleEditStudent}
            title="Edit Student"
            student={currentStudent}
            isEdit={true}
          />
        )}

        {/* Student Details Modal */}
        {showDetailsModal && currentStudent && (
          <StudentDetails
            isOpen={showDetailsModal}
            onClose={() => {
              setShowDetailsModal(false);
              setCurrentStudent(null);
            }}
            student={currentStudent}
            onEdit={() => {
              setShowDetailsModal(false);
              setShowEditModal(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentManagement; 
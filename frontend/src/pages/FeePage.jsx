import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFees,
  addFee,
  removeFee,
  updateFee,
  markFeePaid
} from "../features/Fee";
import TopNavbar from "../components/Topnavbar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const FeePage = () => {
  const dispatch = useDispatch();
  const { fees, isFeesLoading, isFeeAdding, isFeeRemoving, isFeeUpdating } = useSelector((state) => state.Fee);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  // Mock student data - replace with actual API call
  useEffect(() => {
    setStudents([
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
      { _id: "3", name: "Bob Johnson" },
    ]);
  }, []);

  // Add Fee form
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm();

  // Edit Fee form
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  // Payment form
  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    reset: resetPayment,
    formState: { errors: errorsPayment },
  } = useForm();

  useEffect(() => {
    dispatch(fetchAllFees());
  }, [dispatch]);

  // Handle add fee form submission
  const onAddSubmit = (data) => {
    const feeData = {
      studentId: data.studentId,
      amount: parseFloat(data.amount),
      dueDate: new Date(data.dueDate).toISOString(),
      description: data.description,
    };
    
    dispatch(addFee(feeData));
    setShowAddModal(false);
    resetAdd();
  };

  // Handle edit fee form submission
  const onEditSubmit = (data) => {
    if (!currentFee) return;

    const updatedData = {
      amount: parseFloat(data.amount),
      dueDate: new Date(data.dueDate).toISOString(),
      description: data.description,
    };

    dispatch(updateFee({ id: currentFee._id, updatedData }));
    setShowEditModal(false);
    resetEdit();
  };

  // Handle payment form submission
  const onPaymentSubmit = (data) => {
    if (!currentFee) return;

    const paymentDetails = {
      paymentMethod: data.paymentMethod,
      receipt: data.receipt,
    };

    dispatch(markFeePaid({ id: currentFee._id, paymentDetails }));
    setShowPaymentModal(false);
    resetPayment();
  };

  // Handle delete fee
  const handleDeleteFee = (feeId) => {
    if (confirm("Are you sure you want to delete this fee?")) {
      dispatch(removeFee(feeId));
    }
  };

  // Open edit modal with fee data
  const handleEditFee = (fee) => {
    setCurrentFee(fee);
    setValueEdit("amount", fee.amount);
    setValueEdit("dueDate", new Date(fee.dueDate).toISOString().substring(0, 10));
    setValueEdit("description", fee.description || "");
    setShowEditModal(true);
  };

  // Open payment modal with fee data
  const handlePaymentFee = (fee) => {
    setCurrentFee(fee);
    setShowPaymentModal(true);
  };

  // Filter fees based on status and search query
  const filteredFees = fees?.filter((fee) => {
    // Filter by payment status
    if (filterStatus === "paid" && !fee.paidStatus) return false;
    if (filterStatus === "unpaid" && fee.paidStatus) return false;

    // Filter by search query (student name or fee ID)
    if (searchQuery) {
      const student = students.find(s => s._id === fee.studentId);
      const studentName = student ? student.name.toLowerCase() : "";
      return (
        studentName.includes(searchQuery.toLowerCase()) ||
        fee._id.includes(searchQuery)
      );
    }

    return true;
  }) || [];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get student name by ID
  const getStudentName = (studentId) => {
    const student = students.find(s => s._id === studentId);
    return student ? student.name : "Unknown Student";
  };

  return (
    <div className="block">
      <TopNavbar />

      <div className="m-5 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Fee Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add New Fee
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by student name or ID"
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
              <option value="all">All Fees</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {/* Fees Table */}
        {isFeesLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Student</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Due Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Payment Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFees.length > 0 ? (
                  filteredFees.map((fee) => (
                    <tr key={fee._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{getStudentName(fee.studentId)}</td>
                      <td className="py-3 px-4">${fee.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">{formatDate(fee.dueDate)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            fee.paidStatus
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {fee.paidStatus ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {fee.paymentDate ? formatDate(fee.paymentDate) : "-"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditFee(fee)}
                            className="text-blue-500 hover:text-blue-700"
                            disabled={isFeeUpdating}
                          >
                            Edit
                          </button>
                          {!fee.paidStatus && (
                            <button
                              onClick={() => handlePaymentFee(fee)}
                              className="text-green-500 hover:text-green-700"
                              disabled={isFeeUpdating}
                            >
                              Pay
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteFee(fee._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isFeeRemoving}
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
                      No fees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Fee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Fee</h2>
            <form onSubmit={handleSubmitAdd(onAddSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Student</label>
                <select
                  {...registerAdd("studentId", { required: "Student is required" })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                {errorsAdd.studentId && (
                  <p className="text-red-500 text-sm mt-1">{errorsAdd.studentId.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...registerAdd("amount", {
                    required: "Amount is required",
                    min: { value: 0.01, message: "Amount must be greater than 0" },
                  })}
                  className="w-full p-2 border rounded"
                />
                {errorsAdd.amount && (
                  <p className="text-red-500 text-sm mt-1">{errorsAdd.amount.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  {...registerAdd("dueDate", { required: "Due date is required" })}
                  className="w-full p-2 border rounded"
                />
                {errorsAdd.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errorsAdd.dueDate.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  {...registerAdd("description")}
                  className="w-full p-2 border rounded"
                  rows="2"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetAdd();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  disabled={isFeeAdding}
                >
                  {isFeeAdding ? "Adding..." : "Add Fee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Fee Modal */}
      {showEditModal && currentFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Fee</h2>
            <form onSubmit={handleSubmitEdit(onEditSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Student</label>
                <input
                  type="text"
                  value={getStudentName(currentFee.studentId)}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...registerEdit("amount", {
                    required: "Amount is required",
                    min: { value: 0.01, message: "Amount must be greater than 0" },
                  })}
                  className="w-full p-2 border rounded"
                />
                {errorsEdit.amount && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.amount.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  {...registerEdit("dueDate", { required: "Due date is required" })}
                  className="w-full p-2 border rounded"
                />
                {errorsEdit.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.dueDate.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  {...registerEdit("description")}
                  className="w-full p-2 border rounded"
                  rows="2"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetEdit();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  disabled={isFeeUpdating}
                >
                  {isFeeUpdating ? "Updating..." : "Update Fee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && currentFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Mark Fee as Paid</h2>
            <form onSubmit={handleSubmitPayment(onPaymentSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Student</label>
                <input
                  type="text"
                  value={getStudentName(currentFee.studentId)}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="text"
                  value={`$${currentFee.amount.toFixed(2)}`}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Payment Method</label>
                <select
                  {...registerPayment("paymentMethod", { required: "Payment method is required" })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select payment method</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                </select>
                {errorsPayment.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{errorsPayment.paymentMethod.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Receipt Number (Optional)</label>
                <input
                  type="text"
                  {...registerPayment("receipt")}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    resetPayment();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  disabled={isFeeUpdating}
                >
                  {isFeeUpdating ? "Processing..." : "Mark as Paid"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeePage; 
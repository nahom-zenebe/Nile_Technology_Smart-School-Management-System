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

  const handleDeleteFee = (feeId) => {
    if (confirm("Are you sure you want to delete this fee?")) {
      dispatch(removeFee(feeId));
    }
  };

  const handleEditFee = (fee) => {
    setCurrentFee(fee);
    setValueEdit("amount", fee.amount);
    setValueEdit("dueDate", new Date(fee.dueDate).toISOString().substring(0, 10));
    setValueEdit("description", fee.description || "");
    setShowEditModal(true);
  };

  const handlePaymentFee = (fee) => {
    setCurrentFee(fee);
    setShowPaymentModal(true);
  };

  const filteredFees = fees?.filter((fee) => {
    if (filterStatus === "paid" && !fee.paidStatus) return false;
    if (filterStatus === "unpaid" && fee.paidStatus) return false;
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

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

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
        {/* Remaining JSX content for forms and modals here */}
      </div>
    </div>
  );
};

export default FeePage;
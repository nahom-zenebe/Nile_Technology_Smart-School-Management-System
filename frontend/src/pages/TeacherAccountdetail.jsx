import { useFormik } from "formik";
import * as yup from "yup";
import { FiUpload, FiTrash2, FiSave, FiX, FiTrash } from "react-icons/fi";
import TopNavbar from "../../../frontend/src/components/Topnavbar";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AddTeacher, RemoveTeacher, EditTeacher } from "../features/Teacher";

const validationSchema = yup.object({
  Firstname: yup.string().required("Firstname is required"),
  Lastname: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  Phone: yup
    .number()
    .typeError("Phone must be a number")
    .required("Phone number is required"),
  gender: yup.string().oneOf(["man", "women"]).required("Gender is required"),
});

function TeacherAccountdetail() {
  const dispatch = useDispatch();
  const { isTeacheradd } = useSelector((state) => state.Teacher);

  const formik = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      email: "",
      address: "",
      dateOfBirth: "",
      Phone: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    dispatch(AddTeacher(values));
    toast.success("Teacher added successfully!");
    formik.resetForm();
  };

  const handleDelete = (TeacherId) => {
    dispatch(RemoveTeacher(TeacherId));
    toast.success("Teacher deleted!");
  };

  return (
    <>
      <TopNavbar />
      <Toaster />
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-sm space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border text-blue-600 rounded-md hover:bg-blue-50"
          >
            <FiUpload /> Upload
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Firstname",
            "Lastname",
            "email",
            "address",
            "dateOfBirth",
            "Phone",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === "dateOfBirth" ? "Date of Birth" : field}
              </label>
              <input
                type={field === "dateOfBirth" ? "date" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-500 text-sm">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select gender</option>
              <option value="man">Man</option>
              <option value="women">Woman</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FiSave /> Save Changes
          </button>
          <button
            type="button"
            className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <FiX /> Cancel
          </button>
          <button
            onClick={() => handleDelete("123")}
            type="button"
            className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <FiTrash /> Delete Account
          </button>
        </div>
      </form>
    </>
  );
}

export default TeacherAccountdetail;

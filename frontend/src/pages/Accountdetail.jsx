import { useFormik } from "formik";
import * as yup from "yup";
import { FiUpload, FiTrash2, FiSave, FiX, FiTrash } from "react-icons/fi";
import TopNavbar from '../components/Topnavbar';

const validationSchema = yup.object({
  Firstname: yup.string().required("Firstname is required"),
  Lastname: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  subjects: yup.string().required("Subjects are required"),
  Phone: yup.number().typeError("Phone must be a number").required("Phone number is required"),
  gender: yup.string().oneOf(["Boy", "Girl"]).required("Gender is required"),
});

function AccountDetail() {
  const formik = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      email: "",
      address: "",
      dateOfBirth: "",
      subjects: "",
      Phone: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <>
      <TopNavbar />
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
          <button type="button" className="flex items-center gap-2 px-4 py-2 border text-blue-600 rounded-md hover:bg-blue-50">
            <FiUpload /> Upload
          </button>
        
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Firstname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
            <input
              type="text"
              name="Firstname"
              value={formik.values.Firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.Firstname && formik.errors.Firstname && (
              <p className="text-red-500 text-sm">{formik.errors.Firstname}</p>
            )}
          </div>

          {/* Lastname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
            <input
              type="text"
              name="Lastname"
              value={formik.values.Lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.Lastname && formik.errors.Lastname && (
              <p className="text-red-500 text-sm">{formik.errors.Lastname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{formik.errors.dateOfBirth}</p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
            <input
              type="text"
              name="subjects"
              value={formik.values.subjects}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.subjects && formik.errors.subjects && (
              <p className="text-red-500 text-sm">{formik.errors.subjects}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="Phone"
              value={formik.values.Phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.Phone && formik.errors.Phone && (
              <p className="text-red-500 text-sm">{formik.errors.Phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Boy">Man</option>
              <option value="Girl">Woman</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-6">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
          <button type="button" className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <FiX /> Cancel
          </button>
          <button type="button" className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
            <FiTrash /> Delete Account
          </button>
        </div>
      </form>
    </>
  );
}

export default AccountDetail;

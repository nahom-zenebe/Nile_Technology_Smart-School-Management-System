import React, { useState } from 'react';
import TopNavbar from "../../../frontend/src/components/Topnavbar";
import { FaBook, FaFlask, FaAtom, FaHistory, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";

function TeacherSubject() {
  const [enrolled, setEnrolled] = useState([false, true, false, true]);

  const toggleEnrollment = (index) => {
    const newEnrollmentStatus = [...enrolled];
    newEnrollmentStatus[index] = !newEnrollmentStatus[index];
    setEnrolled(newEnrollmentStatus);
  };

  const viewDetails = (className) => {
    alert(`Viewing details for ${className}`);
  };

  const classes = [
    {
      name: "Math 101",
      icon: <FaBook className="text-blue-500 text-4xl" />,
      grade: "A",
      description: "This is an introductory math class where students learn about algebra, geometry, and basic calculus concepts.",
      color: "bg-gray-100"
    },
    {
      name: "Physics 101",
      icon: <FaAtom className="text-blue-500 text-4xl" />,
      grade: "B",
      description: "Physics basics focusing on Newton's Laws, motion, and energy principles.",
      color: "bg-gray-100"
    },
    {
      name: "Chemistry 101",
      icon: <FaFlask className="text-blue-500 text-4xl" />,
      grade: "A+",
      description: "This class introduces the fundamentals of chemistry, including atoms, molecules, and chemical reactions.",
      color: "bg-gray-100"
    },
    {
      name: "History 101",
      icon: <FaHistory className="text-blue-500 text-4xl" />,
      grade: "B+",
      description: "An exploration of world history, focusing on key events and historical figures that shaped civilization.",
      color: "bg-gray-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-300 text-gray-200">
      <TopNavbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">My Classes</h1>

        <div className="relative mb-10">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name or Title"
            className="pl-10 pr-4 py-3 text-black  rounded-full text-sm w-80 focus:outline-none border border-gray-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem, index) => (
            <div key={index} className={`${classItem.color} rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  {classItem.icon}
                  <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-semibold shadow-lg">
                    {classItem.grade}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-4">{classItem.name}</h3>
                <p className="text-gray-800 mt-2 text-sm">{classItem.description}</p>

                <div className="mt-6 flex items-center justify-between">
                  {enrolled[index] ? (
                    <div className="flex items-center text-blue-500">
                      <FaCheckCircle className="mr-2" />
                      <span className="font-medium">Enrolled</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEnrollment(index)}
                      className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}

                  <button
                    onClick={() => viewDetails(classItem.name)}
                    className="flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <FaInfoCircle className="mr-1" />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherSubject;
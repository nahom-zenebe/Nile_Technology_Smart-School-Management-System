import React, { useState } from 'react';
import TopNavbar from "../../../frontend/src/components/Topnavbar";
import { FaBook, FaFlask, FaAtom, FaHistory, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

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
        color: "bg-blue-50"
      },
      {
        name: "Physics 101",
        icon: <FaAtom className="text-purple-500 text-4xl" />,
        grade: "B",
        description: "Physics basics focusing on Newton's Laws, motion, and energy principles.",
        color: "bg-purple-50"
      },
      {
        name: "Chemistry 101",
        icon: <FaFlask className="text-green-500 text-4xl" />,
        grade: "A+",
        description: "This class introduces the fundamentals of chemistry, including atoms, molecules, and chemical reactions.",
        color: "bg-green-50"
      },
      {
        name: "History 101",
        icon: <FaHistory className="text-amber-500 text-4xl" />,
        grade: "B+",
        description: "An exploration of world history, focusing on key events and historical figures that shaped civilization.",
        color: "bg-amber-50"
      }
    ];


   

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Classes</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Class Card 1 */}
          <div className={`${classes[0].color} rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                {classes[0].icon}
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {classes[0].grade}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">{classes[0].name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{classes[0].description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                {enrolled[0] ? (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-medium">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEnrollment(0)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
                
                <button
                  onClick={() => viewDetails(classes[0].name)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaInfoCircle className="mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Class Card 2 */}
          <div className={`${classes[1].color} rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                {classes[1].icon}
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {classes[1].grade}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">{classes[1].name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{classes[1].description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                {enrolled[1] ? (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-medium">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEnrollment(1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
                
                <button
                  onClick={() => viewDetails(classes[1].name)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaInfoCircle className="mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Class Card 3 */}
          <div className={`${classes[2].color} rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                {classes[2].icon}
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {classes[2].grade}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">{classes[2].name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{classes[2].description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                {enrolled[2] ? (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-medium">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEnrollment(2)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
                
                <button
                  onClick={() => viewDetails(classes[2].name)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaInfoCircle className="mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Class Card 4 */}
          <div className={`${classes[3].color} rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                {classes[3].icon}
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                  {classes[3].grade}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">{classes[3].name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{classes[3].description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                {enrolled[3] ? (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-medium">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEnrollment(3)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
                
                <button
                  onClick={() => viewDetails(classes[3].name)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaInfoCircle className="mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherSubject
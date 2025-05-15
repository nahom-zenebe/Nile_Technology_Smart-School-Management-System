import React, { useState } from 'react';
import { FiLogOut } from "react-icons/fi";
import { IoIosBook, IoIosPeople } from "react-icons/io";
import { FaChalkboardTeacher, FaUserCircle, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import { MdDashboard, MdAssignmentTurnedIn, MdNotificationsActive, MdSettings } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"; 
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowDropDownLine } from "react-icons/ri";
import CampanyLogo from '../assets/logo.png';

function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const { Authuser } = useSelector((state) => state.auth);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleDropdown = () => setDropdown(!dropdown);

  return (
    <div>
      <div className={`flex flex-col ${isOpen ? "w-64" : "w-20"} text-white min-h-screen p-4 shadow-lg bg-gradient-to-b from-blue-800 to-blue-900 transition-all duration-300`}>
        <div className="flex justify-between items-center mb-10">
          {isOpen && <img src={CampanyLogo} alt="Company logo" className="w-28 ml-10" />}
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
          </button>
        </div>

        <nav className="space-y-2">
          <Link to={`/${Authuser?.role}/dashboard`} className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
            <MdDashboard className="text-xl" />
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* ==== TEACHER SECTION ==== */}
          {Authuser.role === "teacher" && (
            <>
              <div className="relative">
                <button
                  onClick={handleDropdown}
                  className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition"
                >
                  <FaChalkboardTeacher className="text-xl" />
                  {isOpen && <span>My Classes</span>}
                  <RiArrowDropDownLine className={`ml-2 text-3xl ${dropdown ? "rotate-180" : ""} transition-transform`} />
                </button>

                <div className={`absolute left-5 top-12 w-0.5 bg-yellow-300 rounded-full transition-all duration-300 ${dropdown && isOpen ? 'h-24' : 'h-0'}`}></div>

                {dropdown && isOpen && (
                  <ul className="pl-12 mt-2 space-y-3">
                    <li className="flex items-center space-x-3 text-md hover:text-yellow-300 cursor-pointer">
                      <FaUserGraduate className="text-lg text-yellow-300" />
                      <span onClick={() => navigate("/")}>Students</span>
                    </li>
                    <li className="flex items-center space-x-3 text-md hover:text-yellow-300 cursor-pointer">
                      <MdAssignmentTurnedIn className="text-lg text-yellow-300" />
                      <span onClick={() => navigate("/")}>Assignments</span>
                    </li>
                    <li className="flex items-center space-x-3 text-md hover:text-yellow-300 cursor-pointer">
                      <FaCalendarAlt className="text-lg text-yellow-300" />
                      <span onClick={() => navigate("/TeachersAssignmentpage")}>Schedule</span>
                    </li>
                  </ul>
                )}
              </div>

              <Link to="/teacher/TeacherSubject" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <IoIosBook className="text-xl" />
                {isOpen && <span>Subjects</span>}
              </Link>

              <Link to="/teacher/Attendancepage" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <MdAssignmentTurnedIn className="text-xl" />
                {isOpen && <span>Attendance</span>}
              </Link>

              <Link to="/teacher/timetable" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <FaCalendarAlt className="text-xl" />
                {isOpen && <span>Timetable</span>}
              </Link>

              <Link to="/teacher" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <BsClipboardData className="text-xl" />
                {isOpen && <span>Grades</span>}
              </Link>
            </>
          )}

          {/* ==== STUDENT SECTION ==== */}
          {Authuser.role === "student" && (
            <>
              <Link to="/student/courses" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <IoIosBook className="text-xl" />
                {isOpen && <span>Courses</span>}
              </Link>
              <Link to="/student/timetable" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <FaCalendarAlt className="text-xl" />
                {isOpen && <span>Timetable</span>}
              </Link>
              <Link to="/student/grades" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <BsClipboardData className="text-xl" />
                {isOpen && <span>Grades</span>}
              </Link>
            </>
          )}

          {/* ==== ADMIN / MANAGER SECTION ==== */}
          {(Authuser.role === "admin" || Authuser.role === "manager") && (
            <>
              <Link to="/admin/users" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <IoIosPeople className="text-xl" />
                {isOpen && <span>Manage Users</span>}
              </Link>
              <Link to="/admin/settings" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
                <MdSettings className="text-xl" />
                {isOpen && <span>Settings</span>}
              </Link>
            </>
          )}

          {/* ==== COMMON ITEMS ==== */}
          <Link to={`/${Authuser.role}/account`} className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
            <FaUserCircle className="text-xl" />
            {isOpen && <span>Account Setting</span>}
          </Link>

          <Link to={`/${Authuser.role}/notifications`} className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
            <MdNotificationsActive className="text-xl" />
            {isOpen && <span>Notifications</span>}
          </Link>
        </nav>

        <div className="mt-auto border-t border-white pt-4">
          <div className="flex items-center space-x-3 text-lg hover:text-red-300 cursor-pointer p-2 rounded-md transition">
            <FiLogOut className="text-xl" />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

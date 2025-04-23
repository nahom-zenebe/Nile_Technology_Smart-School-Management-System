import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { IoIosBook, IoIosPeople } from "react-icons/io";
import { FaChalkboardTeacher, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard, MdAssignmentTurnedIn, MdNotificationsActive, MdSettings } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
function Sidebar() {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <div className="flex flex-col w-64 text-white min-h-screen p-6 shadow-lg bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="text-center mb-10 font-bold text-2xl">
        <p>LOGO</p>
      </div>

      <nav className="space-y-2">
        <div className="flex items-center space-x-3 mt-8 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdDashboard className="text-xl" />
          <Link to="/Teacherpage/TeacherDashboard">Dashboard</Link>
        </div>

        <div className="flex items-center space-x-3 mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaChalkboardTeacher className="text-xl" />
          <Link to="">My Classes</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <IoIosBook className="text-xl" />
          <Link to="">Subjects</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdAssignmentTurnedIn className="text-xl" />
          <Link to="">Attendance</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaCalendarAlt className="text-xl" />
          <Link to="">Timetable</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <BsClipboardData className="text-xl" />
          <Link to="">Grades</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaUserCircle className="text-xl" />
          <Link to="/Teacherpage/Accountdetail">Account Setting</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdNotificationsActive className="text-xl" />
          <Link to="">Notifications</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdSettings className="text-xl" />
          <Link to="">Settings</Link>
        </div>

        <div className="flex items-center space-x-3  mt-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <IoIosPeople className="text-xl" />
          <Link to="">Users</Link>
        </div>
      </nav>

      <div className="mt-auto border-t border-white pt-4">
        <div className="flex items-center space-x-3 text-lg hover:text-red-300 cursor-pointer p-2 rounded-md transition">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

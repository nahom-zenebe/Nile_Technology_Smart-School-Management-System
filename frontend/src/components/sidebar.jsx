import React, { useState } from 'react';
import { FiLogOut } from "react-icons/fi";
import { IoIosBook, IoIosPeople } from "react-icons/io";
import { FaChalkboardTeacher, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard, MdAssignmentTurnedIn, MdNotificationsActive, MdSettings } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col ${isOpen ? "w-64" : "w-20"} text-white min-h-screen p-4 shadow-lg bg-gradient-to-b from-blue-800 to-blue-900 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-10">
        {isOpen && <p className="text-center font-bold text-2xl">LOGO</p>}
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
        </button>
      </div>

      <nav className="space-y-2">
        <Link to="/Teacherpage/TeacherDashboard" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdDashboard className="text-xl" />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaChalkboardTeacher className="text-xl" />
          {isOpen && <span>My Classes</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <IoIosBook className="text-xl" />
          {isOpen && <span>Subjects</span>}
        </Link>

        <Link to="/Teacherpage/Attendancepage" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdAssignmentTurnedIn className="text-xl" />
          {isOpen && <span>Attendance</span>}
        </Link>

        <Link to="/Teacherpage/Timetable" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaCalendarAlt className="text-xl" />
          {isOpen && <span>Timetable</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <BsClipboardData className="text-xl" />
          {isOpen && <span>Grades</span>}
        </Link>

        <Link to="/Teacherpage/Accountdetail" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <FaUserCircle className="text-xl" />
          {isOpen && <span>Account Setting</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdNotificationsActive className="text-xl" />
          {isOpen && <span>Notifications</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <MdSettings className="text-xl" />
          {isOpen && <span>Settings</span>}
        </Link>

        <Link to="" className="flex items-center space-x-3 hover:text-yellow-300 cursor-pointer p-2 rounded-md transition">
          <IoIosPeople className="text-xl" />
          {isOpen && <span>Users</span>}
        </Link>
      </nav>

      <div className="mt-auto border-t border-white pt-4">
        <div className="flex items-center space-x-3 text-lg hover:text-red-300 cursor-pointer p-2 rounded-md transition">
          <FiLogOut className="text-xl" />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

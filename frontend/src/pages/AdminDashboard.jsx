import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TopNavbar from "../components/Topnavbar";
import { fetchAllStudents, calculateStudentStats } from "../features/Student";
import { fetchAllTimetables } from "../features/TimeTable";
import { fetchAllFees } from "../features/Fee";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { students, studentStats } = useSelector((state) => state.Student);
  const { fees } = useSelector((state) => state.Fee);
  const { Timetables } = useSelector((state) => state.Timetable);

  useEffect(() => {
    dispatch(fetchAllStudents());
    dispatch(fetchAllFees());
    dispatch(fetchAllTimetables());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      dispatch(calculateStudentStats());
    }
  }, [students, dispatch]);

  // Calculate fees stats
  const totalFees = fees?.reduce((sum, fee) => sum + fee.amount, 0) || 0;
  const paidFees = fees?.filter(fee => fee.paidStatus).reduce((sum, fee) => sum + fee.amount, 0) || 0;
  const unpaidFees = totalFees - paidFees;
  const paidPercentage = totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0;

  // Get upcoming events from timetable (next 3 days)
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);
  
  const upcomingEvents = Timetables?.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate >= today && eventDate <= threeDaysLater;
  }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).slice(0, 5) || [];

  // Format date for timetable events
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopNavbar />
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Student Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-2xl font-bold">{studentStats.total}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <span className="text-green-500 font-semibold">{studentStats.active}</span>
                <span className="text-gray-500 text-sm ml-1">Active</span>
              </div>
              <div>
                <span className="text-red-500 font-semibold">{studentStats.suspended}</span>
                <span className="text-gray-500 text-sm ml-1">Suspended</span>
              </div>
              <div>
                <span className="text-blue-500 font-semibold">{studentStats.graduated}</span>
                <span className="text-gray-500 text-sm ml-1">Graduated</span>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/Admin/students" className="text-blue-500 hover:text-blue-700 text-sm">
                View All Students →
              </Link>
            </div>
          </div>
          
          {/* Fee Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Fees</p>
                <p className="text-2xl font-bold">${totalFees.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <span className="text-green-500 font-semibold">${paidFees.toFixed(2)}</span>
                  <p className="text-gray-500 text-sm">Paid</p>
                </div>
                <div className="text-right">
                  <span className="text-red-500 font-semibold">${unpaidFees.toFixed(2)}</span>
                  <p className="text-gray-500 text-sm">Unpaid</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/Admin/fee" className="text-blue-500 hover:text-blue-700 text-sm">
                Manage Fees →
              </Link>
            </div>
          </div>
          
          {/* Classes/Timetable Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Timetable</p>
                <p className="text-2xl font-bold">{Timetables?.length || 0}</p>
                <p className="text-gray-500 text-sm">Scheduled Events</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/Admin/Timetable" className="text-blue-500 hover:text-blue-700 text-sm">
                View Timetable →
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/Admin/students" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Add New Student</span>
              </Link>
              <Link to="/Admin/Timetable" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule Class</span>
              </Link>
              <Link to="/Admin/fee" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>Add Fee Record</span>
              </Link>
              <Link to="/Admin/AdminTeacher" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <svg className="w-5 h-5 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Manage Teachers</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Upcoming Events</h3>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event._id} className="flex border-b pb-4">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">
                          {new Date(event.startTime).getDate()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">
                        {formatEventDate(event.startTime)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.description || "No description"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming events in the next 3 days.</p>
            )}
            
            <div className="mt-4">
              <Link to="/Admin/Timetable" className="text-blue-500 hover:text-blue-700 text-sm">
                View All Events →
              </Link>
            </div>
          </div>
          
          {/* Recent Student Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Recent Students</h3>
            
            {students.length > 0 ? (
              <div className="space-y-4">
                {students.slice(0, 5).map((student) => (
                  <div key={student._id} className="flex items-center border-b pb-4">
                    <div className="mr-4 flex-shrink-0">
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          alt={`${student.firstName} ${student.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {student.firstName.charAt(0)}
                            {student.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">
                        {student.firstName} {student.lastName}
                      </h4>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          student.status === "active"
                            ? "bg-green-100 text-green-800"
                            : student.status === "suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
            
            <div className="mt-4">
              <Link to="/Admin/students" className="text-blue-500 hover:text-blue-700 text-sm">
                View All Students →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
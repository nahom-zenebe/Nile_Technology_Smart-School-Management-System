import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import Notificationpage from "./pages/Notificationpage"
import Register from './pages/Register';
import Login from './pages/Login';
import Timetable from "./pages/Timetable"
import Header from './components/Header'; // <-- Add this import!
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

function App() {
  return (
    <Router>
      {/* Always show Header */}
      <Header />

      <Routes>
        {/* Main routes */}
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Nested teacher routes */}
        <Route path='/teacher' element={<Teacherpage />}>
          <Route path='dashboard' element={<TeacherDashboardpage />} />
          <Route path='account' element={<TeacherAccountdetail />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='notifications' element={<Notificationpage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

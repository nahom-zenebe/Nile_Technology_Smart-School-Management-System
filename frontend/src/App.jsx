import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import toast, { Toaster } from 'react-hot-toast';
import Timetable from "./pages/Timetable"
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        
 
        <Route path='/Teacherpage' element={<Teacherpage />}>
          <Route path='TeacherDashboard' element={<TeacherDashboardpage />} />
          <Route path='Accountdetail' element={<TeacherAccountdetail />} />
     
          <Route path='Timetable' element={<Timetable/>} />
          
        </Route>
      </Routes>
      <Toaster />
      
    </Router>
  );
}

export default App;

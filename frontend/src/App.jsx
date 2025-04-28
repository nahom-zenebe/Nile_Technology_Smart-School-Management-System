import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import Notificationpage from "./pages/Notificationpage"
import Register from './pages/Register';
import toast, { Toaster } from 'react-hot-toast';
import Timetable from "./pages/Timetable"
import React from 'react';
import TeacherClass from './pages/TeacherClass';
import TeacherSubject from './pages/TeacherSubject';
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        
   
        <Route path='/teacher' element={<Teacherpage />}>
          <Route path='dashboard' element={<TeacherDashboardpage />} />
          <Route path='account' element={<TeacherAccountdetail />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='notifications' element={<Notificationpage />} />
          <Route path='Class' element={<TeacherClass />} />
          <Route path='Subject' element={<TeacherSubject />} />

   
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import Notificationpage from './pages/Notificationpage';
import TeacherSubject from './pages/TeacherSubject'
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'
import Attendancepage from './pages/Attendancepage'
import Timetable from './pages/Timetable';
import toast, { Toaster } from 'react-hot-toast';
import AdminTeacher from './pages/AdminTeacher';
import Adminpage from './pages/Adminpage'
import TimeTable from './features/TimeTable';
import Adminclass from './pages/Adminclass'
import TeachersAssignmentpage from "./pages/TeachersAssignmentpage"
import FeePage from './pages/FeePage';
import StudentManagement from './pages/StudentManagement';
import Studentpage from "./pages/Studentpage"
import StudentAccountdetails from "./pages/StudentAccountdetails"
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        
        
        <Route path='/teacher' element={<Teacherpage />}>
          <Route path='dashboard' element={<TeacherDashboardpage />} />
          <Route path='account' element={<TeacherAccountdetail />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='TeachersAssignmentpage' element={<TeachersAssignmentpage />} />
          <Route path='notifications' element={<Notificationpage />} />
          <Route path='Attendancepage' element={<Attendancepage/>}/>
          <Route path='TeacherSubject' element={<TeacherSubject/>}/>
        </Route>


        <Route path='/Admin' element={<Adminpage/>}>
          <Route path='AdminDashboard' element={<AdminDashboard />} />
          <Route path='AdminTeacher' element={<AdminTeacher/>} />
          <Route path='Timetable' element={<Timetable/>} />
          <Route path='fee' element={<FeePage/>} />
          <Route path='studentsDashboard' element={<StudentManagement/>} />
        
        </Route>

        <Route path='/Student' element={<Studentpage/>}>
        <Route path='StudentAccountdetails' element={<StudentAccountdetails/>} />
       
        </Route>

        <Route path='/Managerpage' element={<Managerpage/>}>
        <Route path='ManagerAccountdetails' element={<ManagerAccountdetails/>} />
        
        </Route>

     
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;

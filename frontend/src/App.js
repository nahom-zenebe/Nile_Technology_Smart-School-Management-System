import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import toast, { Toaster } from 'react-hot-toast';
import Attendancepage from './pages/Attendancepage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        
 
        <Route path='/Teacherpage' element={<Teacherpage />}>
          <Route path='TeacherDashboard' element={<TeacherDashboardpage />} />
          <Route path='Accountdetail' element={<TeacherAccountdetail />} />
          <Route path='Attendancepage' element={<Attendancepage/>} />
          
        </Route>
      </Routes>
      <Toaster />
      
    </Router>
  );
}

export default App;

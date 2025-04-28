
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import Notificationpage from './pages/Notificationpage';
import Register from './pages/Register';
import Login from './pages/Login';
import Timetable from './pages/Timetable';
import Header from './components/Header'; // <-- Add this import!
import toast, { Toaster } from 'react-hot-toast';
import TimeTable from './features/TimeTable';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        
        
        <Route path='/teacherpage' element={<Teacherpage />}>
          <Route path='teacherdashboard' element={<TeacherDashboardpage />} />
          <Route path='accountdetail' element={<TeacherAccountdetail />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='notificationpage' element={<Notificationpage />} />
        </Route>
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;

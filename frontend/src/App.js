import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import Accountdetail from './pages/Accountdetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        
 
        <Route path='/Teacherpage' element={<Teacherpage />}>
          <Route path='TeacherDashboard' element={<TeacherDashboardpage />} />
          <Route path='Accountdetail' element={<Accountdetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

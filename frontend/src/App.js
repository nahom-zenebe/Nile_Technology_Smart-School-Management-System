import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        
 
        <Route path='/Teacherpage' element={<Teacherpage />}>
          <Route path='TeacherDashboard' element={<TeacherDashboardpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

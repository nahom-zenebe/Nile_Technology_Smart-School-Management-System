import Teacher from './features/Teacher';
import './index.css'; 
import Landingpage from './pages/Landingpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacherpage from './pages/Teacherpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/Teacherpage' element={<Teacherpage />} />
      </Routes>
    </Router>
  );
}

export default App;

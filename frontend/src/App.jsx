import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';

function PrivateRoute({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/students" element={<PrivateRoute><StudentList /></PrivateRoute>} />
                        <Route path="/students/new" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
                        <Route path="/students/edit/:id" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

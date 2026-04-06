import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">SMS Hub</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/students" className="nav-link">Students</Link>
                        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

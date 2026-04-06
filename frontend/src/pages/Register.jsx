import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, password, role: 'ADMIN' });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Failed to register');
        }
    };

    return (
        <div className="card" style={{ marginTop: '5rem' }}>
            <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Create Account</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
            </p>
        </div>
    );
}

export default Register;

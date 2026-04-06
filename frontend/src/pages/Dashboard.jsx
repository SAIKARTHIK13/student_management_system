import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        api.get('/students')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Welcome, {user?.username}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Here is what's happening with your students today.</p>
                </div>
                <Link to="/students/new" className="btn btn-primary">+ Add New Student</Link>
            </div>

            <div className="stat-cards">
                <div className="stat-card">
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Total Enrolled</h3>
                    <div className="stat-value">{students.length}</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(14, 165, 233, 0.1))' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Active Courses</h3>
                    <div className="stat-value">
                        {new Set(students.map(s => s.course)).size}
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '2rem', maxWidth: '100%' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Students</h3>
                {students.length > 0 ? (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.slice(0, 5).map(student => (
                                    <tr key={student.id}>
                                        <td style={{ fontWeight: 500 }}>{student.name}</td>
                                        <td style={{ color: 'var(--text-muted)' }}>{student.email}</td>
                                        <td>
                                            <span style={{ 
                                                background: 'rgba(99, 102, 241, 0.1)', 
                                                color: 'var(--primary)', 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600
                                            }}>
                                                {student.course}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No students found. Start by adding some!</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

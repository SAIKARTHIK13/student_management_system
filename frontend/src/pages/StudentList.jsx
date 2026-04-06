import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/students');
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error("Error deleting student", error);
            }
        }
    };

    if (loading) return <div>Loading students...</div>;

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Student Directory</h1>
                <Link to="/students/new" className="btn btn-primary">+ Add New Student</Link>
            </div>

            <div className="card" style={{ maxWidth: '100%', padding: '0', overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                students.map(student => (
                                    <tr key={student.id}>
                                        <td style={{ color: 'var(--text-muted)' }}>#{student.id}</td>
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
                                        <td>
                                            <div className="action-buttons">
                                                <Link to={`/students/edit/${student.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Edit</Link>
                                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentList;

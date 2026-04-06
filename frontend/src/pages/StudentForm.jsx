import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

function StudentForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [loading, setLoading] = useState(isEdit);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            api.get(`/students/${id}`)
                .then(res => {
                    setFormData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch student details.');
                    setLoading(false);
                });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/students/${id}`, formData);
            } else {
                await api.post('/students', formData);
            }
            navigate('/students');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving student');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="page-header">
                <div>
                    <Link to="/students" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.5rem', display: 'inline-block' }}>&larr; Back to Directory</Link>
                    <h1 className="page-title">{isEdit ? 'Edit Student' : 'Add New Student'}</h1>
                </div>
            </div>

            <div className="card">
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Course</label>
                        <input 
                            type="text" 
                            name="course"
                            className="form-control" 
                            value={formData.course} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            {isEdit ? 'Update Student' : 'Save Student'}
                        </button>
                        <Link to="/students" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;

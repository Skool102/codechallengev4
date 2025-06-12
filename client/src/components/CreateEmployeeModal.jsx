import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import './CreateEmployeeModal.scss';

export default function CreateEmployeeModal({ onClose }) {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        role: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const { name, phone, email, address, role } = form;

        if (!name || !phone || !email || !address || !role) {
            setError('All fields are required.');
            return;
        }

        try {
            setLoading(true);
            await createEmployee(form);
            onClose(); // Close the modal
        } catch (err) {
            setError('Failed to create employee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>Create New Employee</h3>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />

                {error && <p className="error">{error}</p>}

                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

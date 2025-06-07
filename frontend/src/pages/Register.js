import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
                <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
                <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border" />
                <button className="w-full bg-blue-500 text-white py-2">Register</button>
            </form>
        </div>
    );
};

export default Register;

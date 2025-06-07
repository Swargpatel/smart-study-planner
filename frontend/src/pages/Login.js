import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
                <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border" />
                <button className="w-full bg-green-500 text-white py-2">Login</button>
            </form>
        </div>
    );
};

export default Login;

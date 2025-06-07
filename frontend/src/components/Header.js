import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-lg font-bold">📘 Study Planner</h1>
            {localStorage.getItem('token') && (
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            )}
        </header>
    );
};

export default Header;

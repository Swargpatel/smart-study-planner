import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', subject: '', date: '', time: '' });
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem('token');

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            alert('Failed to fetch tasks');
        }
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/tasks/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEditingId(null);
            } else {
                await axios.post('/tasks', form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setForm({ title: '', description: '', subject: '', date: '', time: '' });
            fetchTasks();
        } catch (err) {
            alert('Error submitting task');
        }
    };

    const handleEdit = (task) => {
        setForm(task);
        setEditingId(task._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            alert('Error deleting task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Smart Study Planner</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 border" required />
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="p-2 border" required />
                <input name="date" value={form.date} onChange={handleChange} type="date" className="p-2 border" required />
                <input name="time" value={form.time} onChange={handleChange} type="time" className="p-2 border" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border md:col-span-2" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded col-span-full">
                    {editingId ? 'Update Task' : 'Add Task'}
                </button>
            </form>

            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task._id} className="p-4 border rounded shadow-sm bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{task.title}</h3>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(task)} className="text-blue-600">Edit</button>
                                <button onClick={() => handleDelete(task._id)} className="text-red-600">Delete</button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{task.subject} • {task.date?.split('T')[0]} at {task.time}</p>
                        <p className="mt-1">{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

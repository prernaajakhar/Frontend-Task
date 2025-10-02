import React, { useContext, useEffect, useState } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const { user, setUser, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user?.username || '');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setUsernameInput(user?.username || '');
  }, [user]);

  const addTask = async () => {
    if (!title.trim()) return alert('Task title cannot be empty');
    try {
      const res = await API.post('/tasks', { title, description: desc });
      setTasks((prev) => [res.data.task, ...prev]);
      setTitle('');
      setDesc('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add task');
    }
  };

  const updateProfile = async () => {
    if (!usernameInput.trim()) return alert('Username cannot be empty');
    try {
      const res = await API.put('/profile', { username: usernameInput });
      setUser(res.data.user);
      setEditingProfile(false);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logout={logout} />
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-3">Profile</h2>
          {editingProfile ? (
            <div className="flex gap-2">
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="p-2 border rounded flex-1"
              />
              <button onClick={updateProfile} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
              <button onClick={() => setEditingProfile(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">{user?.username}</div>
                <div className="text-sm text-gray-600">{user?.email}</div>
              </div>
              <button onClick={() => setEditingProfile(true)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            </div>
          )}
        </div>

        <div className="mb-4 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="p-2 border rounded flex-1"
          />
        </div>

        <div className="mb-4 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="p-2 border rounded flex-1"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="p-2 border rounded flex-1"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded">Add</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((task) => (
            <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
          ))}
        </div>
      </div>
    </div>
  );
}


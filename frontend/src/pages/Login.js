import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic client-side validation
    if (!email.includes('@')) return alert('Please enter a valid email');
    if (password.length < 6) return alert('Password must be at least 6 characters');

    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const profile = await API.get('/profile');
      setUser(profile.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form className="bg-white p-8 rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <label className="block mb-2 text-sm">Email</label>
        <input
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          required
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded mb-3">Login</button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}


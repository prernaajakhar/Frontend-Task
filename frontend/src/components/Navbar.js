import React from 'react';

export default function Navbar({ logout }) {
  return (
    <div className="bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
}


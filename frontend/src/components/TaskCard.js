import React from 'react';
import API from '../api/api';

export default function TaskCard({ task, fetchTasks }) {
  const toggleStatus = async () => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === 'pending' ? 'completed' : 'pending'
      });
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update task');
    }
  };

  const deleteTask = async () => {
    if (!confirm('Delete this task?')) return;
    try {
      await API.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={toggleStatus} className="bg-green-500 text-white px-3 py-1 rounded text-sm">
            {task.status === 'pending' ? 'Complete' : 'Undo'}
          </button>
          <button onClick={deleteTask} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}


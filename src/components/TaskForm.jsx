import React, { useState } from 'react';

const API_URL = 'https://todo-backend-5lck.onrender.com';

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      await fetchTasks();
      setTask({ title: '', description: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Add Task
      </button>
    </form>
  );
}
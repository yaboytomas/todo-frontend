import React from 'react';

const API_URL = 'https://todo-backend-5lck.onrender.com';

export default function TaskList({ tasks, fetchTasks }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul className="list-none p-0">
      {tasks.map((task) => (
        <li key={task.id} className="border p-4 mb-2 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
// This component renders a list of tasks and provides a delete button for each task.
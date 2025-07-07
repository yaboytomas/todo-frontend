import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'https://todo-backend-5lck.onrender.com/api/tasks';

function App() {  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      )}
    </div>
  );
}

export default App;

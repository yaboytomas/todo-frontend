import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = 'https://todo-backend-5lck.onrender.com/api/tasks';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-secondary-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

function AppContent() {  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <header className="flex items-center justify-between mb-8 animate-slide-down">
              <div>
                <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  Task Manager
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Organize your tasks efficiently
                </p>
              </div>
              <ThemeToggle />
            </header>
            
            <div className="card p-8 text-center animate-scale-in">
              <div className="text-danger-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                Something went wrong
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                {error}
              </p>
              <button 
                onClick={fetchTasks}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8 animate-slide-down">
            <div>
              <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                Task Manager
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400">
                Organize your tasks efficiently
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <div className="grid gap-8 animate-fade-in">
            <div className="card p-6 animate-slide-up">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                Add New Task
              </h2>
              <TaskForm fetchTasks={fetchTasks} />
            </div>
            
            <div className="card p-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  Your Tasks
                </h2>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {loading ? (
                <LoadingSpinner text="Loading your tasks..." />
              ) : (
                <TaskList tasks={tasks} fetchTasks={fetchTasks} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

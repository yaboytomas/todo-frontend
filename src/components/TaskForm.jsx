import React, { useState } from 'react';

const API_URL = 'https://todo-backend-5lck.onrender.com/api/tasks';

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null });
    }
    
    // Clear general error
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!task.title.trim()) {
      errors.title = 'Title is required';
    } else if (task.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    } else if (task.title.trim().length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
    
    if (!task.description.trim()) {
      errors.description = 'Description is required';
    } else if (task.description.trim().length < 5) {
      errors.description = 'Description must be at least 5 characters';
    } else if (task.description.trim().length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title.trim(),
          description: task.description.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create task');
      }

      await fetchTasks();
      setTask({ title: '', description: '' });
      setFieldErrors({});
      
      // Show success animation
      const form = e.target;
      form.classList.add('animate-bounce-subtle');
      setTimeout(() => {
        form.classList.remove('animate-bounce-subtle');
      }, 600);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Task Title *
        </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className={`input-field ${fieldErrors.title ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
          placeholder="Enter a descriptive title for your task..."
          disabled={isSubmitting}
          maxLength={100}
        />
        {fieldErrors.title && (
          <p className="text-danger-600 dark:text-danger-400 text-sm flex items-center animate-slide-down">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fieldErrors.title}
          </p>
        )}
        <div className="text-right">
          <span className={`text-xs ${task.title.length > 80 ? 'text-danger-500' : 'text-secondary-500 dark:text-secondary-400'}`}>
            {task.title.length}/100
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Description *
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          rows={4}
          className={`input-field resize-none ${fieldErrors.description ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : ''}`}
          placeholder="Describe what needs to be done..."
          disabled={isSubmitting}
          maxLength={500}
        />
        {fieldErrors.description && (
          <p className="text-danger-600 dark:text-danger-400 text-sm flex items-center animate-slide-down">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fieldErrors.description}
          </p>
        )}
        <div className="text-right">
          <span className={`text-xs ${task.description.length > 450 ? 'text-danger-500' : 'text-secondary-500 dark:text-secondary-400'}`}>
            {task.description.length}/500
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg animate-slide-down">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-danger-600 dark:text-danger-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-danger-800 dark:text-danger-200 text-sm font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || !task.title.trim() || !task.description.trim()}
          className="btn-primary flex-1 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Task...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Task
            </>
          )}
        </button>
        
        {(task.title || task.description) && (
          <button
            type="button"
            onClick={() => {
              setTask({ title: '', description: '' });
              setFieldErrors({});
              setError(null);
            }}
            disabled={isSubmitting}
            className="btn-secondary"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
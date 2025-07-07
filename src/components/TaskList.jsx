import React, { useState } from 'react';

const API_URL = 'https://todo-backend-5lck.onrender.com/api/tasks';

function TaskCard({ task, onDelete, isDeleting }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    onDelete(task.id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card card-hover p-4 sm:p-6 group animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
            <h3 className="text-base sm:text-lg font-semibold text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 break-words">
              {task.title}
            </h3>
          </div>
          
          <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 mb-3 sm:mb-4 leading-relaxed break-words">
            {task.description}
          </p>
          
          {task.createdAt && (
            <div className="flex items-center text-xs text-secondary-500 dark:text-secondary-500">
              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="break-words">Created {formatDate(task.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 justify-end sm:justify-start">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="btn-danger sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 sm:transform sm:translate-x-2 sm:group-hover:translate-x-0 min-h-[44px] sm:min-h-[32px] px-3 sm:px-4"
              title="Delete task"
            >
              {isDeleting ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          ) : (
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 animate-scale-in">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-2 sm:px-3 sm:py-1 bg-danger-600 hover:bg-danger-700 text-white text-sm font-medium rounded transition-colors duration-200 min-h-[44px] sm:min-h-[32px] flex-1 sm:flex-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-3 py-2 sm:px-3 sm:py-1 bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 text-sm font-medium rounded transition-colors duration-200 min-h-[44px] sm:min-h-[32px] flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8 sm:py-12 animate-fade-in">
      <div className="text-secondary-400 dark:text-secondary-500 mb-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h3 className="text-base sm:text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
        No tasks yet
      </h3>
      <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 max-w-sm mx-auto px-4 sm:px-0">
        Get started by creating your first task above. Stay organized and productive!
      </p>
    </div>
  );
}

export default function TaskList({ tasks, fetchTasks }) {
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingTaskId(id);
    
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
      // You could show a toast notification here
    } finally {
      setDeletingTaskId(null);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TaskCard
            task={task}
            onDelete={handleDelete}
            isDeleting={deletingTaskId === task.id}
          />
        </div>
      ))}
      
      {tasks.length > 0 && (
        <div className="pt-3 sm:pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-center text-sm text-secondary-500 dark:text-secondary-400 px-4 sm:px-0">
            {tasks.length === 1 
              ? "You have 1 task to complete" 
              : `You have ${tasks.length} tasks to complete`
            }
          </p>
        </div>
      )}
    </div>
  );
}
// This component renders a list of tasks and provides a delete button for each task.
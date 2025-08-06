import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Task reducer for managing state
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now(),
          title: action.payload,
          completed: false,
          createdAt: new Date()
        }]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  tasks: [],
  searchQuery: ''
};

// Create context
const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Actions
  const addTask = (title) => {
    dispatch({ type: 'ADD_TASK', payload: title });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  // Computed values
  const filteredTasks = useMemo(() => {
    return state.tasks.filter(task =>
      task.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.tasks, state.searchQuery]);

  const stats = useMemo(() => {
    const completed = state.tasks.filter(t => t.completed).length;
    return [
      { label: 'Total Tasks', value: state.tasks.length },
      { label: 'Completed', value: completed },
      { label: 'Pending', value: state.tasks.length - completed },
      { label: 'Completion Rate', value: state.tasks.length 
        ? ((completed / state.tasks.length) * 100).toFixed(1)
        : 0
      }
    ];
  }, [state.tasks]);

  const value = {
    ...state,
    filteredTasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    setSearchQuery
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 
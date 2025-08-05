import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TasksState = {
  tasks: Task[];
  addTask: (title: string) => void;
  searchQuery: string;
  toggleTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  setSearchQuery: (query: string) => void;
};

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  searchQuery: "",
  addTask: (title: string) => {
    set(state => ({
      tasks: [...state.tasks, {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date()
      }]
    }));
  },
  toggleTask: (taskId: number) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    }));
  },
  deleteTask: (taskId: number) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    }));
  },
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));

// Simple selectors that subscribe to specific state slices.
// `useShallow` won't have much impact on performance here because the state is small, 
// but it will prevent re-renders on larger state slices. a good practice to use it for larger state slices
export const useTasks = () => useTasksStore(useShallow(state => state.tasks));
export const useSearchQuery = () => useTasksStore(state => state.searchQuery);

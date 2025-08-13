import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TasksState = {
  tasks: Task[];
  searchQuery: string;
  addTask: (title: string) => void;
  toggleTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  setSearchQuery: (query: string) => void;
  getTaskById: (taskId: number) => Task | undefined;
};

export const useTasksStore = create<TasksState>()(
  devtools(
    persist(
    (set, get) => ({
      tasks: [],
      searchQuery: "",
      addTask: (title: string) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              title,
              completed: false,
              createdAt: new Date(),
            },
          ],
        }));
      },
      toggleTask: (taskId: number) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        }));
      },
      deleteTask: (taskId: number) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },
      getTaskById: (taskId: number) => {
        return get().tasks.find((task) => task.id === taskId);
      },
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: "tasks-storage",
      partialize: (state) => ({ tasks: state.tasks, searchQuery: state.searchQuery }),
    }
  ),
  { name: "TasksStore", enabled: typeof window !== "undefined" }
)
);

// Simple selectors
export const useTasks = () =>
  useTasksStore(useShallow((state) => state.tasks));
export const useSearchQuery = () =>
  useTasksStore((state) => state.searchQuery);

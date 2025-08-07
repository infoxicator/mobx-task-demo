import { atom } from "jotai";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Base atoms
export const tasksAtom = atom<Task[]>([]);
export const searchQueryAtom = atom('');

// Derived atom for filtered tasks for performance
export const filteredTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const query = get(searchQueryAtom);
  if (!query) {
    return tasks;
  }
  return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
});

// Write-only atoms for actions to encapsulate business logic
export const addTaskAtom = atom(
  null,
  (get, set, title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    const tasks = get(tasksAtom);
    set(tasksAtom, [...tasks, newTask]);
  }
);

export const toggleTaskAtom = atom(
  null,
  (get, set, taskId: number) => {
    const tasks = get(tasksAtom);
    set(tasksAtom, tasks.map(task => 
      {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }
    ));
  }
);

export const deleteTaskAtom = atom(
  null,
  (get, set, taskId: number) => {
    const tasks = get(tasksAtom);
    set(tasksAtom, tasks.filter(task => task.id !== taskId));
  }
);

// Derived atoms for stats
export const completedTasksAtom = atom((get) => get(tasksAtom).filter(task => task.completed).length);
export const totalTasksAtom = atom((get) => get(tasksAtom).length);


import { atom } from "jotai";
import { splitAtom } from 'jotai/utils';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Base atoms
export const tasksAtom = atom<Task[]>([]);
export const searchQueryAtom = atom('');

// Create an atom for each task in the tasksAtom array
export const taskAtomsAtom = splitAtom(tasksAtom, task => task.id);

// Derived atom that provides a filtered list of task atoms
export const filteredTaskAtomsAtom = atom((get) => {
  const taskAtoms = get(taskAtomsAtom);
  const query = get(searchQueryAtom);
  if (!query) {
    return taskAtoms;
  }
  return taskAtoms.filter(taskAtom => {
    const task = get(taskAtom);
    return task.title.toLowerCase().includes(query.toLowerCase());
  });
});

// Derived atoms for stats
export const completedTasksAtom = atom((get) => get(tasksAtom).filter(task => task.completed).length);
export const totalTasksAtom = atom((get) => get(tasksAtom).length);


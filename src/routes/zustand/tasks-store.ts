import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TaskStats = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
};

export type TasksState = {
  tasks: Task[];
  displayTaskIds: number[];
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  searchQuery: string;
  useRelativeStats: boolean;
  addTask: (title: string) => void;
  toggleTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  setSearchQuery: (query: string) => void;
  getTaskById: (taskId: number) => Task | undefined;
  setUseRelativeStats: (useRelativeStats: boolean) => void;
};

const calculateStatsWithContext = ({
  tasks,
  displayTaskIds,
  useRelativeStats,
}: Pick<TasksState, "tasks" | "displayTaskIds" | "useRelativeStats">): TaskStats => {
  const selectedTaskList = useRelativeStats
    ? tasks.filter((task) => displayTaskIds.includes(task.id))
    : tasks;

  const totalTasks = selectedTaskList.length;
  const completedTasks = selectedTaskList.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return { totalTasks, completedTasks, pendingTasks, completionRate };
};

type WrappedOptions = {
  organizeDisplayIds?: boolean;
  calculateStats?: boolean;
};

type OptionHandlers<StateType> = {
  [OptionName in keyof WrappedOptions]-?: (nextState: StateType) => Partial<StateType>;
};

const runTruthyOptionHandlers = <StateType>(
  providedOptions: WrappedOptions | undefined,
  nextState: StateType,
  handlers: OptionHandlers<StateType>
): Partial<StateType> => {
  const handlerEntries = Object.entries(handlers) as Array<
    [keyof WrappedOptions, (state: StateType) => Partial<StateType>]
  >;

  const mergedPatch: Partial<StateType> = {};
  for (const [optionName, handleOption] of handlerEntries) {
    if (providedOptions?.[optionName]) {
      Object.assign(mergedPatch, handleOption(nextState));
    }
  }
  return mergedPatch;
};

type ExtendedSet = (
  partialOrUpdater:
    | TasksState
    | Partial<TasksState>
    | ((state: TasksState) => TasksState | Partial<TasksState>),
  replaceWholeState?: boolean,
  options?: WrappedOptions
) => void;

export const useTasksStore = create<TasksState>()(
  devtools(
    persist(
      (originalSet, get) => {
        const optionHandlers: OptionHandlers<TasksState> = {
          organizeDisplayIds: (nextState) => {
            const normalizedQuery = nextState.searchQuery.toLowerCase();
            const matchingIds: number[] = [];
            for (const task of nextState.tasks) {
              if (task.title.toLowerCase().includes(normalizedQuery)) {
                matchingIds.push(task.id);
              }
            }
            originalSet({ displayTaskIds: matchingIds });
            return { displayTaskIds: matchingIds };
          },
          calculateStats: (nextState) => {
            const stats = calculateStatsWithContext(nextState)
            originalSet({...stats})
            return { ...stats }
          },
        };

        const set: ExtendedSet = (partialOrUpdater, replaceWholeState, options) => {
          const previousState = get();
          const computedPatch =
            typeof partialOrUpdater === "function"
              ? (partialOrUpdater as (s: TasksState) => TasksState | Partial<TasksState>)(previousState)
              : partialOrUpdater;

          const fullNextState: TasksState = {
            ...previousState,
            ...(computedPatch as Partial<TasksState>),
          };

          const derivedPatch = runTruthyOptionHandlers(options, fullNextState, optionHandlers);

          if (replaceWholeState === true) {
            originalSet(
              {
                ...fullNextState,
                ...derivedPatch,
              } as TasksState,
              true
            );
          } else {
            originalSet({
              ...(computedPatch as Partial<TasksState>),
              ...derivedPatch,
            });
          }
        };

        return {
          tasks: [],
          displayTaskIds: [],
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          completionRate: 0,
          useRelativeStats: false,
          searchQuery: "",

          addTask: (title: string) => {
            const newTask: Task = {
              id: Date.now(),
              title,
              completed: false,
              createdAt: new Date(),
            };
            set(
              (state) => ({ tasks: [...state.tasks, newTask] }),
              false,
              { calculateStats: true, organizeDisplayIds: true }
            );
          },

          toggleTask: (taskId: number) => {
            set(
              (state) => ({
                tasks: state.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
              }),
              false,
              { calculateStats: true, organizeDisplayIds: true }
            );
          },

          deleteTask: (taskId: number) => {
            set(
              (state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }),
              false,
              { calculateStats: true, organizeDisplayIds: true }
            );
          },

          getTaskById: (taskId: number) => get().tasks.find((task) => task.id === taskId),

          setSearchQuery: (query: string) => {
            set(
              { searchQuery: query },
              false,
              { organizeDisplayIds: true, calculateStats: true }
            );
          },

          setUseRelativeStats: (useRelativeStats: boolean) => {
            set(
              { useRelativeStats },
              false,
              { calculateStats: true }
            );
          },
        };
      },
      {
        name: "tasks-storage",

        // Only persist source-of-truth fields (no derived state)
        partialize: (state) => ({
          tasks: state.tasks,
          searchQuery: state.searchQuery,
          useRelativeStats: state.useRelativeStats,
        }),

        // Revive Dates from JSON
        storage: createJSONStorage(() => localStorage, {
          reviver: (key, value) => (key === "createdAt" && typeof value === "string" ? new Date(value) : value),
        }),

        merge: (persisted, current) => {
          const merged = { ...current, ...(persisted as Partial<TasksState>) };

          const normalizedQuery = merged.searchQuery?.toLowerCase?.() ?? "";
          const displayTaskIds =
            Array.isArray(merged.tasks)
              ? merged.tasks
                  .filter((task) => task.title.toLowerCase().includes(normalizedQuery))
                  .map((task) => task.id)
              : [];

          const stats = calculateStatsWithContext(merged)

          return {
            ...merged,
            displayTaskIds,
            ...stats,
          } as TasksState;
        },
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

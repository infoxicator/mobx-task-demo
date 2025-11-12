import { observable, computed } from '@legendapp/state'

const state = observable({
  tasks: [],
  searchQuery: '',
})

const filteredTasks = computed(() => {
  const query = state.searchQuery.get().trim().toLowerCase()

  if (!query) {
    return state.tasks.get()
  }

  return state.tasks.get().filter((task) =>
    task.title.toLowerCase().includes(query),
  )
})

const stats = computed(() => {
  const tasks = state.tasks.get()
  const completed = tasks.filter((task) => task.completed).length

  return [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Completed', value: completed },
    { label: 'Pending', value: tasks.length - completed },
    {
      label: 'Completion Rate',
      value: tasks.length
        ? ((completed / tasks.length) * 100).toFixed(1)
        : 0,
    },
  ]
})

const addTask = (title) => {
  state.tasks.set((prev) => [
    ...prev,
    {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ])
}

const toggleTask = (taskId) => {
  state.tasks.set((prev) =>
    prev.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task,
    ),
  )
}

const deleteTask = (taskId) => {
  state.tasks.set((prev) => prev.filter((task) => task.id !== taskId))
}

const setSearchQuery = (value) => {
  state.searchQuery.set(value)
}

export const legendStore = {
  state,
  filteredTasks,
  stats,
  addTask,
  toggleTask,
  deleteTask,
  setSearchQuery,
}

import { makeAutoObservable, runInAction } from 'mobx'

class TaskStore {
  tasks = [];
  state = {
    searchQuery: '',
  };

  constructor() {
    makeAutoObservable(this)
  }

  addTask(title) {
    this.tasks.push({
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    })
  }

  toggleTask(taskId) {
    const task = this.tasks.find(task => task.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
  }

  deleteTask(taskId) {
    runInAction(() => {
      this.tasks.replace(this.tasks.filter(task => task.id !== taskId))
    })
  }
  get searchQuery() {
    return this.state.searchQuery;
  }
  setSearchQuery(value) {
    console.log('setSearchQuery', value)
    this.state.searchQuery = value;
  }

  get filteredTasks() {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  get stats() {
    const completed = this.tasks.filter(t => t.completed).length
    return [
      { label: 'Total Tasks', value: this.tasks.length },
      { label: 'Completed', value: completed },
      { label: 'Pending', value: this.tasks.length - completed },
      { label: 'Completion Rate', value: this.tasks.length 
        ? ((completed / this.tasks.length) * 100).toFixed(1)
        : 0
      }
    ]
  }

  dispose() {
    this.serverTasks.dispose();
  }
}

export const store = new TaskStore()

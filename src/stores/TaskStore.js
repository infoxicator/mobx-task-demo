import { makeAutoObservable, runInAction } from 'mobx'
import { MobxQuery } from '../mobx-query'
import { tasksQuery } from '../queries/useTasksQuery'

class TaskStore {
  serverTasks = new MobxQuery({...tasksQuery});
   
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
  get tasks() {
    return this.serverTasks.query()?.data || [];
  }
  get filteredTasks() {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  get isLoading() {
    return this.serverTasks.isLoading
  }

  get isError() {
    return this.serverTasks.isError
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed).length
  }

  get pendingTasks() {
    return this.tasks.length - this.completedTasks;
  }
  get totalTasks() {
    return this.tasks.length
  }
  get completionRate() {
    return this.tasks.length 
      ? ((this.completedTasks.length / this.tasks.length) * 100).toFixed(1)
      : 0
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

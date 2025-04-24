import { observable } from 'mobx'

class TaskStore {
  @observable tasks = [];
  @observable state = {
    searchQuery: '',
  };

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
      this.tasks.replace(this.tasks.filter(task => task.id !== taskId))
  }
  get searchQuery() {
    return this.state.searchQuery;
  }
  setSearchQuery(value) {
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
}

export const store = new TaskStore()

import { observable, runInAction } from 'mobx'
import { MobxQuery } from '../mobx-query'
import { tasksQuery } from '../queries/useTasksQuery'

class TaskStore {
  
  serverTasks = new MobxQuery({...tasksQuery});
   
  @observable state = {
    searchQuery: '',
  };

  addTask(title) {
    this.tasks.data?.push({
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    })
  }

  toggleTask(taskId) {
    const task = this.tasks.data.find(task => task.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
  }

  deleteTask(taskId) {
      this.tasks.data?.replace(this.tasks.data?.filter(task => task.id !== taskId))
  }
  get searchQuery() {
    return this.state.searchQuery;
  }
  setSearchQuery(value) {
    this.state.searchQuery = value;
  }
  get tasks() {
    console.log('get task', this.serverTasks.query())
    return this.serverTasks.query();
  }
  // get filteredTasks() {
  //   return this.tasks.data?.filter((task) =>
  //     task.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
  //   );
  // }


  get stats() {
    const completed = this.tasks.data?.filter(t => t.completed).length
    return [
      { label: 'Total Tasks', value: this.tasks.data?.length },
      { label: 'Completed', value: completed },
      { label: 'Pending', value: this.tasks.data?.length - completed },
      { label: 'Completion Rate', value: this.tasks.data?.length 
        ? ((completed / this.tasks.data?.length) * 100).toFixed(1)
        : 0
      }
    ]
  }

  dispose() {
    this.serverTasks.dispose();
  }
}

export const store = new TaskStore()

import React from 'react'
import { useTasks, useSearchQuery } from '../tasks-store'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'

const TaskList = () => {
  const tasks = useTasks()
  const searchQuery = useSearchQuery()

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <div className="no-tasks">
            {searchQuery 
              ? 'No tasks match your search'
              : 'No tasks yet'}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList 
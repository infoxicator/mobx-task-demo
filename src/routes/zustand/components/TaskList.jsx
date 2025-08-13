import React from 'react'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'
import { useTasksStore } from '../tasks-store'

const TaskList = () => {
  const searchQuery = useTasksStore(state => state.searchQuery)
  const displayTaskIds = useTasksStore(state => state.displayTaskIds)

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">

        {displayTaskIds.length === 0 ? (
          <div className="no-tasks">
            {searchQuery ? 'No tasks match your search' : 'No tasks yet'}
          </div>
        ) : (
          displayTaskIds.map(id => (
            <TaskItem key={id} taskId={id} />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList

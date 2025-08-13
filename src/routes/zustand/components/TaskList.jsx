import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'
import { useTasksStore } from '../tasks-store'

const TaskList = () => {
  const searchQuery = useTasksStore(state => state.searchQuery)
  const filteredIds = useTasksStore(
    useShallow((state) => {
      const q = searchQuery.toLowerCase()
      return state.tasks.reduce((acc, task) => {
        if (task.title.toLowerCase().includes(q)) acc.push(task.id)
        return acc
      }, [])
    })
  )

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">

        {filteredIds.length === 0 ? (
          <div className="no-tasks">
            {searchQuery ? 'No tasks match your search' : 'No tasks yet'}
          </div>
        ) : (
          filteredIds.map(id => (
            <TaskItem key={id} taskId={id} />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList

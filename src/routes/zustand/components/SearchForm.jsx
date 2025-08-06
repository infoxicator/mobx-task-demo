import React from 'react'
import { useTasksStore } from '../tasks-store'

const SearchForm = () => {
  const searchQuery = useTasksStore(state => state.searchQuery)
  const setSearchQuery = useTasksStore(state => state.setSearchQuery)

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
    </div>
  )
}

export default SearchForm 
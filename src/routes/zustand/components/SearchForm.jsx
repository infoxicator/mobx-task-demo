import React, { useRef, useState } from "react";
import { useTasksStore } from '../tasks-store'

const SearchForm = () => {
  const searchQuery = useTasksStore(state => state.searchQuery)
  const setSearchQuery = useTasksStore(state => state.setSearchQuery)
  const [componentSearchQuery, setComponentSearchQuery] = useState(searchQuery)
  const debounceRef = useRef(null)

  const handleChange = (e) => {
    const next = e.target.value;
    setComponentSearchQuery(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(next);
    }, 200);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={componentSearchQuery}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="search-input"
      />
    </div>
  )
}

export default SearchForm 
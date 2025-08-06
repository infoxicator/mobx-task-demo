import React from 'react';
import { useTaskContext } from './TaskContext';

const SearchForm = () => {
  const { searchQuery, setSearchQuery } = useTaskContext();

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
  );
};

export default SearchForm; 
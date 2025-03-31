const SearchForm = ({ searchQuery, setSearchQuery }) => {

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-search"
          onClick={() => setSearchQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchForm 
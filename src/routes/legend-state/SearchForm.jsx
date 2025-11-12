import { useValue } from '@legendapp/state/react'
import { legendStore } from '../../stores/TaskStoreLegendState'

const SearchForm = () => {
  const query = useValue(legendStore.state.searchQuery)

  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        onChange={(event) => legendStore.setSearchQuery(event.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
      {query && (
        <button
          type="button"
          className="clear-search"
          onClick={() => legendStore.setSearchQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchForm

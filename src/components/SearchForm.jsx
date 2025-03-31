import { observer } from 'mobx-react-lite'
import { store } from '../stores/TaskStore'

const SearchForm = observer(() => {
  return (
    <div className="search-form">
      <input
        type="text"
        value={store.searchQuery}
        onChange={(e) => store.setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
      {store.searchQuery && (
        <button 
          className="clear-search"
          onClick={() => store.setSearchQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  )
})

export default SearchForm 
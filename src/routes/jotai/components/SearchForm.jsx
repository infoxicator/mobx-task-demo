import React from 'react';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '../atoms';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

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

SearchForm.displayName = 'SearchForm';
// export default React.memo(SearchForm); 
export default SearchForm;
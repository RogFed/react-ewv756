import React, { useContext } from 'react';
import { AppContext } from '../context';
import '../styles/search_bar.css';

const SearchBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const { term, sort } = state;

  const handleInputChange = (e) => {
    dispatch({
      type: 'UPDATE_TERM',
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleSortUsers = () => {
    dispatch({
      type: 'UPDATE_TERM',
      payload: '',
    });

    dispatch({
      type: 'UPDATE_SORT',
      payload: sort === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <section className="filters">
      <form name="filter-form" className="search-bar" onSubmit={handleSubmit}>
        <input
          placeholder="Enter a filter term"
          value={term}
          onChange={handleInputChange}
        />
      </form>
      <button
        className={sort === 'asc' ? 'sorted' : null}
        onClick={handleSortUsers}
      >
        Sort By Name ({sort})
      </button>
    </section>
  );
};

export default SearchBar;

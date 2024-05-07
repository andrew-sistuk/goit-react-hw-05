import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

import css from './SearchBar.module.css';

export const SearchBar = ({ changeFilter }) => {
  function handleSubmit(evt) {
    evt.preventDefault();
    const { searchBar } = evt.target.elements;
    if (!searchBar.value.trim()) {
      toast.error('You must write some text!');
      return;
    }
    changeFilter(searchBar.value.trim());
    evt.target.reset();
  }

  return (
    <form className={css['search-form']} onSubmit={handleSubmit}>
      <input
        className={css['search-bar']}
        name="searchBar"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search you best movie"
      />
      <button className={css['submit-button']} type="submit">
        <FaSearch />
      </button>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: '#c0c0c0',
            color: 'rgb(27, 24, 56)',
          },
        }}
      />
    </form>
  );
};

// import { Formik, Form, Field } from 'formik';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

import css from './MoviesPage.module.css';
import clsx from 'clsx';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import SearchBar from '../../components/SearchBar/SearchBar';


const MoviesPage = () => {
  const [error, setError] = useState(false);

  function changeQuery(value) {
    // setQuery(value);
    // setPage(1);
  }

  return error ? <ErrorMsg/> :  (
    <section className={clsx(css.movies, 'container')}>
      <SearchBar changeFilter={changeQuery} />
    </section>
  );
};

export default MoviesPage;

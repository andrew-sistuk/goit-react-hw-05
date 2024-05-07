
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import {Loader, MovieList, SearchBar, ErrorMsg} from 'components';

// import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import MovieList from '../../components/MovieList/MovieList';
// import Loader from '../../components/Loader/Loader';

import { searchData } from '../../helpers/tmdbApi';

import css from './MoviesPage.module.css';

export const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Infinity scroll
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function callFetchMovie() {
      try {
        if (!query) {
          return;
        }

        setLoading(true);
        setError(false);
        const data = await searchData(query, page);

        if (
          parseInt(data.total_pages) === parseInt(page) ||
          parseInt(data.total_pages) === 0 ||
          parseInt(data.total_pages) === 1
        ) {
          setLoading(false);
        }

        if (page > 1) {
          setMovies(prevItems => {
            return [...prevItems, ...data.results];
          });
        } else {
          setMovies(data.results);
        }
      } catch {
        setError(true);
      }
    }
    callFetchMovie();
  }, [query, page]);

  useEffect(() => {
    if (inView) {
      setPage(prevPage => {
        return prevPage + 1;
      });
    }
  }, [inView]);

  function changeQuery(value) {
    setQuery(value);
    setPage(1);
  }

  return error ? (
    <ErrorMsg />
  ) : (
    <section className={clsx(css.movies, 'container')}>
      <SearchBar changeFilter={changeQuery} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader ref={ref} loading={loading}/>}
    </section>
  );
};
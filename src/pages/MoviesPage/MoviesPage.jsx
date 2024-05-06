import { useEffect, useState } from 'react';

import css from './MoviesPage.module.css';
import clsx from 'clsx';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { searchData } from '../../helpers/tmdbApi';
import { PacmanLoader } from 'react-spinners';


const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function callFetchPhotos() {
      try {
        if (!query) {
          return;
        }

        setLoading(true);
        setError(false);
        const data = await searchData(query, page);

        if(parseInt(data.total_pages) === parseInt(page) || parseInt(data.total_pages) === 0 || parseInt(data.total_pages) === 1) {
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
    callFetchPhotos();
  }, [query, page]);

  function changeQuery(value) {
    setQuery(value);
    setPage(1);
  }

  return error ? <ErrorMsg/> :  (
    <section className={clsx(css.movies, 'container')}>
      <SearchBar changeFilter={changeQuery} />
      {movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      {loading && <PacmanLoader color="#c0c0c0" />}
    </section>
  );
};

export default MoviesPage;

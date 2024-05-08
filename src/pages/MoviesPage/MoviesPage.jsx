
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import {Loader, MovieList, SearchBar, ErrorMsg} from 'components';

import { searchData } from 'helpers';

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';


  // Infinity scroll
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    async function callFetchMovie() {
      try {
        if (!query) {
          return;
        }

        if (page === 1) {
          setLoadingFirst(true);
        }
        else {
          setLoadingFirst(false);
        }

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
          setLoading(true);
          setLoadingFirst(false);
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
    searchParams.set('query', value)
    setSearchParams(searchParams);
    setPage(1);
  }

  return error ? (
    <ErrorMsg />
  ) : (
    <section className={clsx(css.movies, 'container')}>
      <SearchBar changeFilter={changeQuery} />
      <MovieList movies={movies} />
      {loadingFirst && <Loader loading={loadingFirst}/>}
      {loading && <Loader ref={ref} loading={loading}/>}
    </section>
  );
};

export default MoviesPage;
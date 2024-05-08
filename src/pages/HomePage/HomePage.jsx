import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

import { MovieList, Loader, ErrorMsg } from 'components';

// import MovieList from '../../components/MovieList/MovieList';
// import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
// import Loader from '../../components/Loader/Loader';

import { callTrendings } from '../../helpers/tmdbApi';

import css from './HomePage.module.css';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time_window, setTimeWindow] = useState('day');

  // Infinity scroll
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function callFetchMovie() {
      try {
        if (!time_window) {
          return;
        }

        setError(false);
        const info = await callTrendings(time_window, page);
        
        if (
          parseInt(info.total_pages) === parseInt(page) ||
          parseInt(info.total_pages) === 0 ||
          parseInt(info.total_pages) === 1
        ) {
          setLoading(false);
        }
        
        if (page > 1) {
          setMovies(prevItems => {
            return [...prevItems, ...info.results];
          });
        } else {
          setLoading(true);
          setMovies(info.results);
        }
      } catch {
        setError(true);
      }
    }
    callFetchMovie();
  }, [time_window, page]);

  useEffect(() => {
    if (inView) {
      setPage(prevPage => {
        return prevPage + 1;
      });
    }
  }, [inView]);

  return error ? (
    <ErrorMsg />
  ) : (
    <main>
      <section className={clsx(css.hero, 'container')}>
        <h1 className={css.header}>Trending movies</h1>
        <img className={css['hero-img']} src="/hero.png" alt="hero" />
      </section>
      <section className={clsx(css.movies, 'container')}>
        <select
          className={css['filter-tranding']}
          name="time_window"
          id="time_window"
          value={time_window}
          onChange={evt => {
            setTimeWindow(evt.target.value);
            setPage(1);
          }}
        >
          <option value="day">day</option>
          <option value="week">week</option>
        </select>
        <MovieList movies={movies} />
        {loading && <Loader ref={ref} loading={loading}/>}
      </section>
    </main>
  );
};

export default HomePage;

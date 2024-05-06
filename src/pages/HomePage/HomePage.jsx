// import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { callTrendings } from '../../helpers/tmdbApi';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

import css from './HomePage.module.css';
import clsx from 'clsx';

const HomePage = () => {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [time_window, setTimeWindow] = useState('day');
  useEffect(() => {
    async function setTrendings() {
      try {
        const info = await callTrendings(time_window);
        setMovies(info.results);
      }
      catch(errorMsg) {
        setError(true);
        console.log(errorMsg);
      } 
    }
    setTrendings();
  }, [time_window]);

  return error ? <ErrorMsg/> : (
    <main>
      <section className={clsx(css.hero, 'container')}>
        <h1 className={css.header}>Trending movies</h1>
        <img className={css['hero-img']} src="/src/assets/hero.png" alt="hero" />
      </section>
      <section className={clsx(css.movies, 'container')}>
        <select
          className={css['filter-tranding']}
          name="time_window"
          id="time_window"
          value={time_window}
          onChange={evt => setTimeWindow(evt.target.value)}
        >
          <option value="day">day</option>
          <option value="week">week</option>
        </select>
        <MovieList movies={movies} />
      </section>
    </main>
  );
};

export default HomePage;

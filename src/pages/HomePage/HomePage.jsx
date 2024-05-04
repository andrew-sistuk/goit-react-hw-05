// import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { callTrendings } from '../../helpers/tmdbApi';

import css from './HomePage.module.css';
import clsx from 'clsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [time_window, setTimeWindow] = useState('day');
  // const location = useLocation();
  useEffect(() => {
    console.log(time_window);
    async function setTrendings() {
      const info = await callTrendings(time_window);
      setMovies(info.results);
      console.log(info.results);
    }
    setTrendings();
  }, [time_window]);
  // console.log(location);
  return (
    <main>
      <section className={clsx(css.hero, 'container')}>
        <h1 className={css.header}>Trending movies</h1>
        <img className={css['hero-img']} src="/src/assets/hero.png" alt="hero" />
        {/* <Link to="./somethink" state={location}>
          Click me
        </Link> */}
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

// import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const path = 'https://image.tmdb.org/t/p/w500/';
  return (
    <ul className={css['gallety-movies']}>
      {movies.map(movie => {
        return (
          <li className={css['movies-item']} key={movie.id}>
            <div className={css.box}>
              <img
                className={css['movie-img']}
                src={path + movie.poster_path}
                alt={movie.title}
                loading="lazzy"
              />
              <p className={css.overlay}>{movie.overview}</p>
            </div>
            <h2 className={css['movie-header']}>{movie.title}</h2>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;

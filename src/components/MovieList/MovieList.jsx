import { Link, useLocation } from 'react-router-dom';

import { setImgPath } from 'helpers';

import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css['gallety-movies']}>
      {movies.map(movie => {
        return (
          <li className={css['movies-item']} key={movie.id+movie.title}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={css.box}>
                <img
                  className={css['movie-img']}
                  src={setImgPath(movie.poster_path, 'w500', 'poster')}
                  alt={movie.title}
                  loading="lazzy"
                />
                <p className={css.overlay}>{movie.overview}</p>
              </div>
              <h2 className={css['movie-header']}>{movie.title}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
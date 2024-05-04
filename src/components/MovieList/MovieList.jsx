// import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const path = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();
  return (
    <ul className={css['gallety-movies']}>
      {movies.map(movie => {
        return (
          <li className={css['movies-item']} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
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
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { FaPlayCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import clsx from 'clsx';

import { VideoModal, ErrorMsg } from 'components';

// import VideoModal from '../../components/VideoModal/VideoModal';
// import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

import { setImgPath } from '../../helpers/imgPath';
import { callMoviesDetails } from '../../helpers/tmdbApi';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { movieId } = useParams();
  const { state } = useLocation();
  const locationBack = useRef(state);

  useEffect(() => {
    if (!movieId) return;
    async function initPage() {
      try {
        const movieDetail = await callMoviesDetails(movieId);
        setMovie(movieDetail);
      } catch (errorMsg) {
        setError(true);
        console.log(errorMsg);
      }
    }
    initPage();
  }, [movieId]);

  function writeInfo(genres) {
    if (genres) {
      const arrGenres = genres.map(({ name }) => name);
      return arrGenres.join(' / ');
    } else {
      return '';
    }
  }

  function setBackground(backdrop) {
    return (
      backdrop && {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
      }
    );
  }
  const handleClassLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  function handleShowModal() {
    setShowModal(prevValue => !prevValue);
  }

  return error ? (
    <ErrorMsg />
  ) : (
    movie && (
      <section className={clsx(css.movie, 'container')}>
        <Link className={css['button-back']} to={locationBack.current ? locationBack.current : '/'}>
          <RiArrowGoBackFill /> Back
        </Link>
        <div className={css['main-data']}>
          <button className={css['trailer-button']} type="button" onClick={handleShowModal}>
            <img
              className={css['main-img']}
              src={setImgPath(movie.poster_path, 'w500', 'poster')}
              alt={movie.title}
            />
            <div className={css['overlay-play']}>
              <FaPlayCircle className={css['icon-play']} />
            </div>
          </button>
          <div className={css['main-info']}>
            <h1 className={css['movie-header']}>{movie.title}</h1>
            <div className={css['sprecific-info']}>
              {movie.release_date && <p>{format(movie.release_date, 'MM/dd/yyyy')}</p>}
              <p>{writeInfo(movie.genres)}</p>
            </div>

            <h2>Vote</h2>
            <p>{`avg: ${movie.vote_average} count: ${movie.vote_count}`}</p>
            <h2>Detail</h2>
            <p>{`Popularity: ${movie.popularity}`}</p>
            <p>{`Runtime: ${movie.runtime}`}</p>
            <p>{`Counties: ${writeInfo(movie.production_countries)}`}</p>
            <p>{movie.tagline}</p>
            <p>{movie.overview}</p>
            <div className={css.backdrop} style={setBackground(movie.backdrop_path)}>
              {' '}
            </div>
          </div>
        </div>
        <ul className={css['list-links-details']}>
          <li>
            <NavLink className={handleClassLink} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={handleClassLink} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
        <VideoModal isOpen={showModal} handleClose={handleShowModal} />
      </section>
    )
  );
};

export default MovieDetailsPage;
import { useParams, Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { callMoviesDetails } from '../../helpers/tmdbApi';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { FaPlayCircle } from 'react-icons/fa';
import VideoModal from '../../components/VideoModal/VideoModal';
import clsx from 'clsx';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const path = 'https://image.tmdb.org/t/p/original';
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    async function initPage() {
      try {
        const movieDetail = await callMoviesDetails(movieId);
        setMovie(movieDetail);
      } catch (error) {
        console.log(error);
      }
      // finally {
      //   console.log(movie);
      // }
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
        backgroundImage: `url(${path}${backdrop})`,
      }
    );
  }
  const handleClassLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  function handleShowModal() {
    setShowModal(prevValue => !prevValue);
  }

  return (
    movie && (
      <section className={clsx(css.movie, 'container')}>
        <Link className={css['button-back']} to={location.state ? location.state : '/'}>
          <RiArrowGoBackFill /> Back
        </Link>
        <div className={css['main-data']}>
          <button className={css['trailer-button']} type="button" onClick={handleShowModal}>
            <img className={css['main-img']} src={path + movie.poster_path} alt={movie.title} />
            <div className={css['overlay-play']}>
              <FaPlayCircle className={css['icon-play']} />
            </div>
          </button>
          <div className={css['main-info']}>
            <h1 className={css['movie-header']}>{movie.title}</h1>
            <div className={css['sprecific-info']}>
              <p>{format(movie.release_date, 'MM/dd/yyyy')}</p>
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

import { callTypeInfo } from '../../helpers/tmdbApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setImgPath } from '../../helpers/imgPath';
import ViewButton from '../ViewButton/ViewButton';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const [error, setError] = useState(false);
  const [casts, setCasts] = useState([]);
  const [viewAll, setSeeAll] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function initPage() {
      try {
        const castInit = await callTypeInfo(movieId, 'credits');
        setCasts(castInit.cast);
      } catch (errorMsg) {
        setError(true);
        console.log(errorMsg);
      }
    }
    initPage();
  }, [movieId]);

  function handleSeeAll() {
    setSeeAll(false);
  }

  function paintCast(casts) {
    if (viewAll && casts.length <= 14) {
      setSeeAll(false);
    }

    if (viewAll) {
      casts = casts.slice(0, 14);
    }

    return casts.map(cast => {
      return (
        <li className={css['list-item']} key={cast.id}>
          <img
            className={css.img}
            src={setImgPath(cast.profile_path, 'w500', 'avatar')}
            alt={cast.name}
          />
          <h3 className={css.actor}>{cast.name.trim()}</h3>
        </li>
      );
    });
  }

  return error ? (
    <ErrorMsg />
  ) : casts.length === 0 ? (
    <p>No cast has been added to this movie yet</p>
  ) : (
    <section className={css.casts}>
      <ul className={css['casts-list']}>{paintCast(casts)}</ul>
      {viewAll && <ViewButton handleSeeAll={handleSeeAll} />}
    </section>
  );
};

export default MovieCast;

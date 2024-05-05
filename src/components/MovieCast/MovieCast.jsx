import { callTypeInfo } from '../../helpers/tmdbApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setImgPath } from '../../helpers/imgPath';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const [viewAll, setSeeAll] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function initPage() {
      try {
        const castInit = await callTypeInfo(movieId, 'credits');
        // console.log(castInit);
        setCasts(castInit.cast);
      } catch (error) {
        console.log(error);
      }
    }
    initPage();
  }, [movieId]);



  function handleSeeAll() {
    setSeeAll(false);
  }

   function paintCast(casts) {
    if(viewAll && casts.length <= 14) {
      setSeeAll(false);
   }

    if(viewAll) {
      casts = casts.slice(0, 14)
    }

    return casts.map(cast => {
      return (
        <li className={css['list-item']} key={cast.id}>
          <img
            className={css.img}
            src={setImgPath(cast.profile_path, 'w500')}
            alt={cast.name}
          />
          <h3 className={css.actor}>{cast.name}</h3>
        </li>
      );
    })
  }

  return (
    casts.length > 0 && (
      <section className={css.casts}>
        <ul className={css['casts-list']}>
          {paintCast(casts)}
        </ul>
        { viewAll && (
        <button className={css['view-button']} type="button" onClick={handleSeeAll}>
          View All
        </button>
        ) }
      </section>
    )
  );
};

export default MovieCast;

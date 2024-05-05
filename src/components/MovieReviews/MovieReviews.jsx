import { callTypeInfo } from '../../helpers/tmdbApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setImgPath } from '../../helpers/imgPath';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [viewAll, setSeeAll] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function initPage() {
      try {
        const reviewsInit = await callTypeInfo(movieId, 'reviews');
        console.log(reviewsInit);
        setReviews(reviewsInit.results);
      } catch (error) {
        console.log(error);
      }
    }
    initPage();
  }, [movieId]);

  function handleSeeAll() {
    setSeeAll(false);
  }

  function paintCast(reviews) {
    if(viewAll && reviews.length <= 3) {
      setSeeAll(false);
   }

    if(viewAll) {
      reviews = reviews.slice(0, 3)
    }

    return reviews.map(review => {
      return (
        <li className={css.review} key={review.id}>
          <img className={css.avatar} src={setImgPath(review.author_details.avatar_path, 'w500')} alt={review.author} />
          <div>
            <h3 className={css.header}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
          </div>
        </li>
      );
    })
  }


  return (
    reviews.length > 0 && (
      <section className={css.reviews}>
        <ul className={css['reviews-list']}>
          {paintCast(reviews)}
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

export default MovieReviews;

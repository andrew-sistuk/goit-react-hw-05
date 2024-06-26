import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ViewButton, ErrorMsg } from 'components';

import { setImgPath, callTypeInfo } from 'helpers/';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [error, setError] = useState(false);
  const [viewAll, setSeeAll] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function initPage() {
      try {
        const reviewsInit = await callTypeInfo(movieId, 'reviews');
        setReviews(reviewsInit.results);
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

  function paintCast(reviews) {
    if (viewAll && reviews.length <= 3) {
      setSeeAll(false);
    }

    if (viewAll) {
      reviews = reviews.slice(0, 3);
    }

    return reviews.map(review => {
      return (
        <li className={css.review} key={review.id}>
          <img
            className={css.avatar}
            src={setImgPath(review.author_details.avatar_path, 'w500', 'avatar')}
            alt={review.author}
          />
          <div>
            <h3 className={css.header}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
          </div>
        </li>
      );
    });
  }

  return error ? (
    <ErrorMsg />
  ) : reviews.length === 0 ? (
    <p>There are currently no reviews for this movie</p>
  ) : (
    <section className={css.reviews}>
      <ul className={css['reviews-list']}>{paintCast(reviews)}</ul>
      {viewAll && <ViewButton handleSeeAll={handleSeeAll} />}
    </section>
  );
};

export default MovieReviews;

import { callTypeInfo } from '../../helpers/tmdbApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function initPage() {
      try {
        const reviewsInit = await callTypeInfo(movieId, 'reviews');
        setReviews(reviewsInit.results);
      } catch (error) {
        console.log(error);
      }
    }
    initPage();
  }, [movieId]);

  return (
    reviews.length > 0 && (
      <section className={css.reviews}>
        <ul>
          {reviews.map(review => {
            return <li key={review.id}>{review.author}</li>;
          })}
        </ul>
      </section>
    )
  );
};

export default MovieReviews;

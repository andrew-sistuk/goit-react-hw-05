import { callTypeInfo } from '../../helpers/tmdbApi';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setImgPath } from '../../helpers/imgPath';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
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

  return (
    reviews.length > 0 && (
      <section className={css.reviews}>
        <ul>
          {reviews.map(review => {
            return (
              <li className={css.review} key={review.id}>
                <img className={css.avatar} src={setImgPath(review.author_details.avatar_path, 'w500')} alt={review.author} />
                <div>
                  <h3 className={css.header}>{review.author}</h3>
                  <p className={css.content}>{review.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    )
  );
};

export default MovieReviews;

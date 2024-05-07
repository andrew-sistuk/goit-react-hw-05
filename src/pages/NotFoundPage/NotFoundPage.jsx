import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import css from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const { state } = useLocation();
  return (
    <section className={clsx(css.notfound, 'container')}>
      <img className={css['main-img']} src="/404.png" alt="404 not found" />
      <div className={css.links}>
        <Link to="/" className={clsx(css.button, css.red)}>
          Go Home page
        </Link>
        <Link to={state ? state : '/movies'} className={clsx(css.button, css.blue)}>
          Go Back
        </Link>
      </div>
    </section>
  );
};
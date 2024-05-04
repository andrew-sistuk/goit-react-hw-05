import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className={css.notfound}>
      <img className={css['main-img']} src="/src/assets/404.png" alt="404 not found" />
      <div className={css.links}>
        <Link to="/" className={clsx(css.button, css.red)}>
          Go Home page
        </Link>
        <Link to={location.state ? location.state : '/'} className={clsx(css.button, css.blue)}>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

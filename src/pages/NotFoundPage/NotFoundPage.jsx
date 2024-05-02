import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className={css.notfound}>
      <Link to="/" className={clsx(css.button, css.red)}>
        Go Home page
      </Link>
      <Link to={location.state} className={clsx(css.button, css.blue)}>
        Go Back
      </Link>
    </div>
  );
};

export default NotFoundPage;

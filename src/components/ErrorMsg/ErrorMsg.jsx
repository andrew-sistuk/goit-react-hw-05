import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import css from './ErrorMsg.module.css';

export const ErrorMsg = () => {
  const {pathname, state} = useLocation();
  return (
    <div className={clsx(css.notfound,'container')}>
      <img className={css['main-img']} src="/error.png" alt="404 not found" />
      <div className={css.links}>
        <Link to={state ? state : '/'} className={clsx(css.button, css.red)}>
          Go Back
        </Link>
        <Link to={pathname} className={clsx(css.button, css.blue)} onClick={() => window.location.reload()}>
          Reload
        </Link>
      </div>
    </div>
  );
};
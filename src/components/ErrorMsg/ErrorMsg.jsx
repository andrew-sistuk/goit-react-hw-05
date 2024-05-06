import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
// import { reload } from '../../utils/reload';

import css from './ErrorMsg.module.css';

const ErrorMsg = () => {
  const location = useLocation();
  return (
    <div className={clsx(css.notfound,'container')}>
      <img className={css['main-img']} src="/src/assets/error.png" alt="404 not found" />
      <div className={css.links}>
        <Link to={location.state ? location.state : '/'} className={clsx(css.button, css.red)}>
          Go Back
        </Link>
        <Link to={location} className={clsx(css.button, css.blue)}>
          Reload
        </Link>
      </div>
    </div>
  );
};

export default ErrorMsg;

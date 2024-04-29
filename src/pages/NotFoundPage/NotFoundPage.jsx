import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';
import clsx from 'clsx';

const NotFoundPage = () => {
  return (
    <>
      <div className={css.notfound}>
        <Link to='/' className={clsx(css.button, css.red)}>Go Home page</Link>
        <Link className={clsx(css.button, css.blue)}>Go Back</Link>
      </div>
    </>
  );
};

export default NotFoundPage;

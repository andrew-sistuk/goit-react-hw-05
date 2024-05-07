import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';

import css from './Navigation.module.css';

export const Navigation = () => {
  const handleClassLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={clsx(css.header, 'container')}>
      <nav className={css.navigation}>
        <Link className={css['main-logo']} to="./">
          <img src="/wolf.svg" alt="logo" width={72} height={72} />
          <p>Wolf Movies</p>
        </Link>
        <ul className={css['list-pages-links']}>
          <li className={css['list-item']}>
            <NavLink className={handleClassLink} to="./">
              Home
            </NavLink>
          </li>
          <li className={css['list-item']}>
            <NavLink className={handleClassLink} to="./movies">
              Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

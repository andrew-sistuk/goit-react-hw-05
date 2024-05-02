import { NavLink, Link } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  return (
    <header className={clsx(css.header, 'container')}>
      <nav className={css.navigation}>
        <Link className={css['main-logo']} to="./">
          <img src="../../../public/wolf.svg" alt="logo" width={48} height={48} />
        </Link>
        <ul className={css['list-pages-links']}>
          <li className={css['list-item']}>
            <NavLink className={css.link} to="./">
              Home
            </NavLink>
          </li>
          <li className={css['list-item']}>
            <NavLink className={css.link} to="./movie">
              Movie
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

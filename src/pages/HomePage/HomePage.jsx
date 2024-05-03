import { Link, useLocation } from 'react-router-dom';

import css from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();

  console.log(location);
  return (
    <section className={css.hero}>
      <h1 className={css.header}>Tranding list films</h1>
      <img className={css['hero-img']} src="/src/assets/hero.png" alt="hero" />
      <Link to="./somethink" state={location}>
        Click me
      </Link>
    </section>
  );
};

export default HomePage;

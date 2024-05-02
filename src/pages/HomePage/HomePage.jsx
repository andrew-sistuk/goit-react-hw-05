import { Link, useLocation } from 'react-router-dom';
// import css from './HomePage.module.css'

const HomePage = () => {
  const location = useLocation();

  console.log(location);
  return (
    <>
      <Link to="./somethink" state={location}>
        Click me
      </Link>
    </>
  );
};

export default HomePage;
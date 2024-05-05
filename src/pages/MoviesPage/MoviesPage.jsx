import { Formik, Form, Field } from 'formik';
import { FaSearch } from 'react-icons/fa';

import css from './MoviesPage.module.css';
import clsx from 'clsx';

const MoviesPage = () => {
  return (
    <section className={clsx(css.movies, 'container')}>
      <Formik>
        <Form className={css['form-search']}>
          <Field className={css['searchbar']} type="text" name="username" placeholder='Search you best movie'/>
          <button className={css['submit-button']} type="submit">
            <FaSearch />
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default MoviesPage;

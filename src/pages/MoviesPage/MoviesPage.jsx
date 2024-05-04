import { Formik, Form, Field } from 'formik';
import { FaSearch } from 'react-icons/fa';

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  return (
    <section className={css.movies}>
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

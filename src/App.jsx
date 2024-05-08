import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const MoviesPage= lazy(() => import('../src/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../src/pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../src/pages/NotFoundPage/NotFoundPage'));

const Navigation = lazy(() => import('../src/components/Navigation/Navigation'));
const MovieCast = lazy(() => import('../src/components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../src/components/MovieReviews/MovieReviews'));


import { Loader } from 'components';

// import { Navigation, MovieCast, MovieReviews } from 'components';

// import Navigation from './components/Navigation/Navigation';
// import MovieCast from './components/MovieCast/MovieCast';
// import MovieReviews from './components/MovieReviews/MovieReviews';

import './App.css';
import 'modern-normalize';

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

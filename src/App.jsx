import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const MoviesPage= lazy(() => import('pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const Navigation = lazy(() => import('components/Navigation/Navigation'));
const MovieCast = lazy(() => import('components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('components/MovieReviews/MovieReviews'));


import { Loader } from 'components';

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
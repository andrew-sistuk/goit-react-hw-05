import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// import Navigation from './components/Navigation/Navigation';

const NotFoundPage = React.lazy(() => import('pages'));

import { Navigation, Loader, MovieCast, MovieReviews } from 'components';
import {HomePage, MoviesPage, MovieDetailsPage } from 'pages';

// import HomePage from './pages/HomePage/HomePage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// import MovieCast from './components/MovieCast/MovieCast';
// import MovieReviews from './components/MovieReviews/MovieReviews';

// import { lazy, Suspense } from 'react';
// const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));

import './App.css';
import 'modern-normalize';

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
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

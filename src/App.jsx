// import { useState } from 'react';
// import callAxios from './helpers/tmdbApi';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';
import 'modern-normalize';

function App() {

  return (
    <>
     <Navigation />
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </>
  );
}

export default App;

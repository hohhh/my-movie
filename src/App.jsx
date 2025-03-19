import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // ✅ Layout 추가
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './components/Search';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Favorite from './components/Favorite';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<MovieList />} />
          <Route path="detail/:movieId" element={<MovieDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

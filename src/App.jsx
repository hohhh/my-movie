import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // ✅ Layout 추가
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';
import Member from './components/Member';
import Favorite from './components/Favorite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="list" element={<MovieList />} />
        <Route path="detail/:id" element={<MovieDetail />} />
        <Route path="search" element={<Search />} />
        <Route path="member" element={<Member />} />
        <Route path="favorite" element={<Favorite />} />
      </Route>
    </Routes>
  );
}

export default App;

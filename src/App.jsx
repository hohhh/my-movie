import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../supabase/auth/useAuth'; // ✅ 유저 인증 정보 가져오기
import Layout from './components/Layout'; // ✅ Layout 추가
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './components/Search';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Favorite from './components/Favorite';

const App = () => {
  const { getUserInfo } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo?.user || null);
    };
    fetchUser();
  }, []);

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
          <Route path="/favorite" element={<Favorite user={user} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';
import Member from './components/Member';
import Favorite from './components/Favorite';
import styled from 'styled-components'; // ✅ Styled-Components 추가

function App() {
  return (
    <>
      <NavBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<MovieList />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/member" element={<Member />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;

const MainContainer = styled.main`
  background: #222;
  width: 100%;
  max-width: 1280px; /* ✅ 최대 너비 1280px 설정 */
  margin: 0 auto; /* ✅ 가운데 정렬 */
  padding: 24px; /* ✅ 안쪽 여백 */
  background-color: #ffffff; /* ✅ 배경색 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* ✅ 가벼운 그림자 효과 */
  min-height: 100vh; /* ✅ 화면 높이 100% 채우기 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

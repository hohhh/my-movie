import React from 'react';
import MovieCard from './MovieCard';
import { useFetch } from '../hooks/useFetch';
// import movieListData from '../assets/data/movieListData.json';

const MovieList = () => {
  const { movies, loading, error } = useFetch('/movie/popular');
  //  useFetch('/movie/popular'); // 1. 함수 실행
  //  const { movies, loading, error } = 2. 변수선언 (구조분해할당: key값 일일히 받기 귀찮으니까)
  //  : '함수 실행 결과(=데이터) 여기에 저장해!' 라고 지시하는 것

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      {loading && <p>🎬 영화 데이터를 불러오는 중...</p>}
      {error && <p>❌ {error}</p>}
      {!loading &&
        !error &&
        movies.results
          .filter((el) => el.adult === false)
          .map((movie, index) => (
            <MovieCard key={movie.id || index} movie={movie} />
          ))}
    </div>
  );
};

export default MovieList;

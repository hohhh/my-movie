import React from 'react';
import MovieList from './MovieList';

const Home = () => {
  return (
    <div>
      <MovieList />
    </div>
  );
};

// result 안에 .map 돌리기
// card 컴포넌트 thumbnail : <img src={https://image.tmdb.org/t/p/w200${movie.poster_path}} />

export default Home;

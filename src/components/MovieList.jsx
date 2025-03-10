import React from 'react';
import MovieCard from './MovieCard';
import movieListData from '../assets/data/movieListData.json';
import { useState } from 'react';

const MovieList = () => {
  const moviesData = movieListData;
  // const movies = moviesData.results;
  // 즉각적인 업데이트 불가하므로 useState 대신 변수 사용.
  const [movies, setMovies] = useState(moviesData.results);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}
    >
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

import React, { useEffect, useState } from 'react';
import MovieListContainer from './MovieListContainer';
const MovieList = () => {
  const [movies, setMovies] = useState([]); // 기본값: 로컬 JSON 데이터 -> 빈 배열
  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch(
        `${import.meta.env.VITE_TMDB_API_URL}/movie/popular?language=ko`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      setMovies(data);
    }
    fetchMovieData();
  }, []);

  return <MovieListContainer movies={movies}></MovieListContainer>;
};

export default MovieList;

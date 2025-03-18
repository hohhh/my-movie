import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieListContainer from '../pages/MovieListContainer';
const BASE_URL = `${import.meta.env.VITE_TMDB_API_URL}`;

const Search = () => {
  const [searchKeywordParams] = useSearchParams();
  const searchKeyword = searchKeywordParams.get('query');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch(
        `${BASE_URL}/search/movie?language=ko?query=${searchKeyword}`,
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
  }, [searchKeyword]);

  return <MovieListContainer movies={movies}></MovieListContainer>;
};

export default Search;

import React, { useState } from 'react';
import Search from './Search';
import useFetchMovies from '../hooks/useFetchMovies'; // ✅ 커스텀 훅 사용

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const { movies, loading, error } = useFetchMovies(
    `/search/movie?query=${query}`,
    false,
  );

  return (
    <div>
      <Search onSearch={setQuery} /> {/* 검색어 변경 시 API 호출 */}
      {loading && <p>🎬 검색 결과를 불러오는 중...</p>}
      {error && <p>❌ {error}</p>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {!loading &&
          !error &&
          movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;

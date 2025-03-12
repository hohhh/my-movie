import React, { use, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import MovieListContainer from './MovieListContainer';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [searchKeywordParams] = useSearchParams();
  const searchKeyword = searchKeywordParams.get('query');
  const { movies, loading, error } = useFetch(`/search/movie`, {
    query: searchKeyword
  });


  useEffect(()=>{
  },[searchKeyword]);

  // 입력값 업데이트
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 엔터 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(search); // 부모 컴포넌트로 검색어 전달
    }
  };

  return (
    <MovieListContainer movies={movies}
      loading={loading}
      error={error}></MovieListContainer>
  );
};

export default Search;

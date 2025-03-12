import React from 'react';
import { useFetch } from '../hooks/useFetch';
import styled from 'styled-components';
import MovieListContainer from './MovieListContainer';

const MovieList = () => {
  const { movies, loading, error } = useFetch('/movie/popular');
  //  useFetch('/movie/popular'); // 1. 함수 실행
  //  const { movies, loading, error } = 2. 변수선언 (구조분해할당: key값 일일히 받기 귀찮으니까)
  //  : '함수 실행 결과(=데이터) 여기에 저장해!' 라고 지시하는 것

  return (<MovieListContainer movies={movies}
    loading={loading}
    error={error}></MovieListContainer>);
};

export default MovieList;


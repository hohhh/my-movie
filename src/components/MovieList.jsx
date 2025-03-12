import React from 'react';
import MovieCard from './MovieCard';
import { useFetch } from '../hooks/useFetch';
import styled from 'styled-components';

const MovieList = () => {
  const { movies, loading, error } = useFetch('/movie/popular');
  //  useFetch('/movie/popular'); // 1. 함수 실행
  //  const { movies, loading, error } = 2. 변수선언 (구조분해할당: key값 일일히 받기 귀찮으니까)
  //  : '함수 실행 결과(=데이터) 여기에 저장해!' 라고 지시하는 것

  return (
    <Container>
      {loading && <Message>🎬 영화 데이터를 불러오는 중...</Message>}
      {error && <Message>❌ {error}</Message>}
      {!loading && !error && (
        <GridContainer>
          {movies.results
            .filter((el) => el.adult === false) // ✅ 성인 영화 제외
            .map((movie, index) => (
              <MovieCard key={movie.id || index} movie={movie} />
            ))}
        </GridContainer>
      )}
    </Container>
  );
};

export default MovieList;

/* ✅ 전체 컨테이너 스타일 */
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ✅ 로딩 & 에러 메시지 */
const Message = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: #ff4a4a;
`;

/* ✅ 영화 카드 그리드 컨테이너 */
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* ✅ 자동 정렬 */
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;

  /* ✅ 반응형 스타일 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(150px, 1fr)
    ); /* ✅ 모바일에서는 작은 카드 */
  }
`;

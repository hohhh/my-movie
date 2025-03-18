import React from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

// eslint-disable-next-line react/prop-types
const MovieListContainer = ({ movies }) => {
  return (
    <Container>
      <GridContainer>
        {Array.isArray(movies) ? (
          <></>
        ) : (
          // eslint-disable-next-line react/prop-types
          movies.results
            // eslint-disable-next-line react/prop-types
            .filter((el) => el.adult === false) // ✅ 성인 영화 제외
            .map((movie, index) => (
              <MovieCard key={movie.id || index} movie={movie} />
            ))
        )}
      </GridContainer>
    </Container>
  );
};

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
// const Message = styled.p`
//   font-size: 18px;
//   text-align: center;
//   margin-top: 20px;
//   color: #ff4a4a;
// `;

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

export default MovieListContainer;

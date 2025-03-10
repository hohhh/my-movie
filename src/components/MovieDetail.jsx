import React, { useState } from 'react';
import styled from 'styled-components';
import MovieDetailData from '../assets/data/movieDetailData.json';

const MovieDetail = () => {
  const [movie] = useState(MovieDetailData);

  return (
    <Container backdrop={movie.backdrop_path}>
      <Content>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieInfo>
          <Title>{movie.title}</Title>
          <Tagline>{movie.tagline}</Tagline>
          <Details>
            <span>📅 {movie.release_date}</span>
            <span>⏳ {movie.runtime}분</span>
            <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
          </Details>
          <Genres>
            {movie.genres.map((genre) => (
              <GenreBadge key={genre.id}>{genre.name}</GenreBadge>
            ))}
          </Genres>
          <Overview>{movie.overview}</Overview>
        </MovieInfo>
      </Content>
    </Container>
  );
};

export default MovieDetail;

// ✅ 스타일드 컴포넌트 적용
const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.95)
    ),
    url(https://image.tmdb.org/t/p/original${(props) => props.backdrop});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const Content = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
`;

const Poster = styled.img`
  width: 40%;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const Tagline = styled.p`
  font-size: 18px;
  font-style: italic;
  color: #bbb;
  margin-top: 10px;
`;

const Details = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  font-size: 16px;
  color: #ddd;
`;

const Genres = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
`;

const GenreBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
`;

const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #ccc;
  margin-top: 10px;
  word-break: keep-all;
`;

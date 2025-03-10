import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// props 받아올 때 한 번에 가져와서, 필요한 것만 "key.value"로 지정
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    // 정적일 때는 Link , (데이터를 다루거나 하는) 동적인 상황에는 RouterHook 중에 useNavigate 사용
    <CardContainer onClick={() => navigate(`detail/${movie.id}`)}>
      <Poster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <Overview>
        <Title>{movie.title}</Title>
        <Desc>{movie.release_date}</Desc>
      </Overview>
    </CardContainer>
  );
};

export default MovieCard;

const CardContainer = styled.section`
  width: calc(100% / 4.4);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
  /* transition: transform 0.3s ease-in-out; */
  overflow: hidden;

  &:hover img {
    transform: scale(1.05);
  }

  &:hover > div {
    transition: transform 0.3s ease-in-out;
    background: #00000070;
    transform: translateY(0);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

const Overview = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: #00000000;
  transform: translateY(100%);
`;

const Title = styled.h2`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const Desc = styled.p`
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 20px;
`;

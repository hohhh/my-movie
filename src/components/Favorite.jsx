import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSupabase } from '../supabase';

const Favorite = () => {
  const { getUserInfo } = useSupabase();
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]); // ✅ 찜한 영화 목록 (임시 데이터)
  const navigate = useNavigate();

  // ✅ 페이지 진입 시 로그인 상태 확인
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      if (!userInfo?.user) {
        navigate('/login'); // ✅ 로그인 안 되어 있으면 로그인 페이지로 이동
      } else {
        setUser(userInfo.user);
        // ✅ 임시 찜한 영화 데이터 (실제 API 연동 필요)
        setFavoriteMovies([
          {
            id: 1,
            title: '인터스텔라',
            poster: 'https://via.placeholder.com/150',
          },
          { id: 2, title: '인셉션', poster: 'https://via.placeholder.com/150' },
          {
            id: 3,
            title: '다크 나이트',
            poster: 'https://via.placeholder.com/150',
          },
        ]);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <MessageContainer>
        <Message>🔒 로그인이 필요합니다.</Message>
        <LoginButton onClick={() => navigate('/login')}>
          로그인 하러 가기
        </LoginButton>
      </MessageContainer>
    );
  }

  return (
    <Container>
      <Title>🎬 {user.email}님의 찜한 영화</Title>

      {favoriteMovies.length > 0 ? (
        <MovieGrid>
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id}>
              <MoviePoster src={movie.poster} alt={movie.title} />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
        </MovieGrid>
      ) : (
        <MessageContainer>
          <Message>😢 아직 찜한 영화가 없습니다.</Message>
          <ExploreButton onClick={() => navigate('/')}>
            영화 보러 가기
          </ExploreButton>
        </MessageContainer>
      )}
    </Container>
  );
};

export default Favorite;

/* 🎨 스타일링 */
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #fff;
  margin-bottom: 50px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const MovieCard = styled.div`
  background: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const MovieTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const MessageContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
`;

const LoginButton = styled.button`
  padding: 12px 20px;
  background: #ff4500;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff6347;
  }
`;

const ExploreButton = styled(LoginButton)`
  background: #007bff;
  &:hover {
    background: #0056b3;
  }
`;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <NavContainer>
      <StyledLink to="/">홈</StyledLink>
      <StyledLink to="/search">검색</StyledLink>
      <StyledLink to="/member">로그인</StyledLink>
      <StyledLink to="/favorite">찜목록</StyledLink>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.nav`
  width: 100%;
  max-width: 1280px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  background: #222;
  color: #fff;
  padding: 10px 30px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #ffffff20;
  }
`;

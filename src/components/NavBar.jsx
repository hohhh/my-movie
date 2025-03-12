import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from '../hooks/useDebounce';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  useEffect(()=>{
    if(debouncedSearch.trim()!==''){
      navigate(`/search?query=${debouncedSearch}`);
    }
  },[debouncedSearch])

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setSearch('');
    }
  };

  return (
    <NavContainer>
      <TopNav>
        <NavLinks className="left">
          <StyledLink to="/">홈</StyledLink>
        </NavLinks>
        <NavLinks className="right">
          <StyledLink to="/favorite">찜목록</StyledLink>
          <StyledLink to="/member">로그인</StyledLink>
        </NavLinks>
      </TopNav>
      <SearchWrapper>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요."
          />
          <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
      </SearchWrapper>
    </NavContainer>
  );
};

export default NavBar;

/* 전체 네비게이션 컨테이너 */
const NavContainer = styled.nav`
  width: 100%;
  max-width: 1280px;
  background: #222;
  color: #fff;
  padding: 10px 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

/* PC에서는 홈(왼쪽), 찜목록/로그인(오른쪽) 배치 */
const TopNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: nowrap;
  }
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

/* 검색창 Wrapper (PC에서도 아래 배치) */
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* 검색 입력창 */
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: #222;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

/* 검색 버튼 */
const SearchButton = styled.button`
  background: #ff4500;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff6347;
  }
`;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSupabase } from '../supabase';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { getUserInfo, logout } = useSupabase();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ 로그인 상태 가져오기 (최적화)
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo?.user || null);
    };
    fetchUser();
  }, []);

  // ✅ 로그인 후 즉시 반영되도록 함
  useEffect(() => {
    if (user) {
      console.log('🔹 로그인됨:', user);
    }
  }, [user]);

  // ✅ 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logout();
      alert('로그아웃 되었습니다.');
      setUser(null); // ✅ UI 즉시 반영
      setMenuOpen(false); // ✅ 모바일 메뉴 닫기
      navigate('/');
    } catch (err) {
      console.error('❌ 로그아웃 오류:', err);
    }
  };

  // ✅ 로그인/로그아웃 버튼 핸들러
  const handleAuthClick = async () => {
    if (user) {
      await handleLogout();
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
  };

  // ✅ 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // ✅ 검색어 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search.trim()}`);
      setSearch('');
    }
  };

  return (
    <NavContainer>
      <TopNav>
        <NavLinks>
          <StyledLink to="/">
            <HomeIcon sx={{ fontSize: 30 }} />
          </StyledLink>
        </NavLinks>

        <SearchWrapper>
          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="검색어를 입력하세요."
            />
            <SearchButton type="submit">
              <SearchIcon sx={{ fontSize: 16 }} />
            </SearchButton>
          </SearchForm>
        </SearchWrapper>

        <NavLinks className="desktop">
          <StyledLink to="/favorite">
            <FavoriteIcon sx={{ fontSize: 30 }} />
          </StyledLink>
          <StyledButton onClick={handleAuthClick}>
            {user ? (
              <LockOpenIcon sx={{ fontSize: 30 }} />
            ) : (
              <LockIcon sx={{ fontSize: 30 }} />
            )}
          </StyledButton>
        </NavLinks>

        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon sx={{ fontSize: 30 }} />
        </HamburgerButton>
      </TopNav>

      {/* 모바일용 슬라이드 메뉴 */}
      <SlideMenu className={menuOpen ? 'open' : ''}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <CloseIcon sx={{ fontSize: 30 }} />
        </CloseButton>
        <MenuItems>
          <StyledLink to="/favorite" onClick={() => setMenuOpen(false)}>
            찜목록
          </StyledLink>
          <StyledButton onClick={handleAuthClick}>
            {user ? '로그아웃' : '로그인'}
          </StyledButton>
        </MenuItems>
      </SlideMenu>

      {menuOpen && <Overlay onClick={() => setMenuOpen(false)} />}
    </NavContainer>
  );
};

export default NavBar;

/* ✅ 스타일 */
const NavContainer = styled.nav`
  width: 100%;
  background: #222;
  border-bottom: #ffffff50 1px solid;
  color: #fff;
  padding: 10px 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const TopNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  &.desktop {
    @media (max-width: 768px) {
      display: none;
    }
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

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: #ffffff20;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 500px;
  width: 100%;
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
`;

const SearchButton = styled.button`
  background: #f55656;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f76c6c;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const SlideMenu = styled.div`
  width: 80%;
  height: 100%;
  background: #222;
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

/* ✅ `MenuItems` 추가 */
const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`;

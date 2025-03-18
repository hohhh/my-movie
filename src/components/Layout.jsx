import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../supabase/auth/useAuth';
import NavBar from './NavBar';

const Layout = () => {
  const { getUserInfo } = useAuth(); // ✅ 유저 정보 가져오는 함수
  const [user, setUser] = useState(null); // ✅ 유저 상태 관리

  // ✅ 현재 로그인된 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo?.user || null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBar user={user} /> {/* ✅ user 정보를 NavBar에 전달 */}
      <Outlet />
    </>
  );
};

export default Layout;

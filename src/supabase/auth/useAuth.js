import { useSupabase } from '..';
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from '../utilities';

export const useAuth = () => {
  const supabase = useSupabase();
  const {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemToLocalStorage,
  } = localStorageUtils();

  // ✅ 회원가입 (이메일, 비밀번호, 유저이름)
  const signUp = async ({ email, password, userName }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { userName } },
      });

      if (error) throw error;
      return { user: data.user };
    } catch (error) {
      return { error };
    }
  };

  // ✅ 로그인 (이메일, 비밀번호)
  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userInfo = changeFromDto({
        type: DTO_TYPE.user,
        dto: { user: data.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }

      return { user: data.user };
    } catch (error) {
      return { error };
    }
  };

  // ✅ 로그아웃
  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY.sbKey);
    removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    return await supabase.auth.signOut();
  };

  // ✅ user 정보 가져오기
  const getUserInfo = async () => {
    const data = getItemFromLocalStorage(USER_INFO_KEY.sbKey);
    if (data) {
      const userInfo = changeFromDto({
        type: data.user ? DTO_TYPE.user : DTO_TYPE.error,
        dto: data,
      });
      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }
      return userInfo;
    } else {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) return;
        const userInfo = changeFromDto({
          type: !error ? DTO_TYPE.user : DTO_TYPE.error,
          dto: { user: data.user, error },
        });
        if (userInfo.user) {
          setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        }
        return userInfo;
      } catch (error) {
        console.error('❌ 유저 정보를 가져오는 중 오류 발생:', error);
      }
    }
  };

  return { signUp, login, logout, getUserInfo };
};

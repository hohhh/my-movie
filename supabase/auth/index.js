import { useAuth } from './useAuth';
import { useEmailAuth } from './useEmailAuth';
import { useOAuth } from './useOauthAuth';

export const useSupabaseAuth = () => {
  const { getUserInfo, logout } = useAuth();
  const { login, signUp } = useEmailAuth();
  const { loginWithGoogle, loginWithKakao } = useOAuth();

  return {
    login,
    signUp,
    getUserInfo,
    logout,
    loginWithKakao,
    loginWithGoogle,
  };
};

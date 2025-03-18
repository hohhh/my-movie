import { useSupabase } from '../context';

export const useEmailAuth = () => {
  const supabase = useSupabase();

  // 회원가입 함수
  const signUp = async ({ email, password, ...userData }) => {
    try {
      console.log('📢 회원가입 요청 시작:', email, password, userData);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            avatar_url:
              'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png',
            ...userData,
          },
        },
      });

      console.log('📢 회원가입 응답:', data, error);

      if (error) {
        throw new Error(`❌ 회원가입 실패: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { signUp };
};

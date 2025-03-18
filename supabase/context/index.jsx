import { createContext, useContext } from 'react';
import { supabaseEnv } from '../utilities/config'; // ✅ config.js에서 직접 가져오기
import { createClient } from '@supabase/supabase-js';

// supabase 로그인 유지 세션 생성
export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.anonKey, // ✅ 올바른 키 이름 사용
);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    new Error('supabase가 초기화 되지 않았습니다.');
    return;
  }
  return supabase;
};

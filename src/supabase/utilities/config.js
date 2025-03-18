export const supabaseEnv = {
  projectURL: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

console.log('📢 Supabase 환경 변수:', supabaseEnv);
console.log('🔍 import.meta.env:', JSON.stringify(import.meta.env));

// localStorage Key
export const USER_INFO_KEY = {
  sbKey: `sb-${supabaseEnv.projectURL.split('//')[1].split('.')[0]}-auth-token`,
  customKey: 'userInfo',
};

// data transfer object type
export const DTO_TYPE = {
  user: 'user',
  error: 'error',
};

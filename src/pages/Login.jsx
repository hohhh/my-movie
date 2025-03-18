import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSupabase } from '../supabase';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithKakao } = useSupabase();

  // ✅ 상태 관리
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // ✅ 로그아웃 상태

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ 로그인 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userInfo = await login({
        email: form.email,
        password: form.password,
      });

      if (userInfo?.user) {
        navigate('/'); // ✅ 로그인 성공 시 홈으로 이동
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoggedOut) {
      alert('로그아웃 되었습니다.');
      navigate('/'); // ✅ 로그아웃 후 홈으로 이동
      setIsLoggedOut(false); // ✅ 다시 false로 리셋
    }
  }, [isLoggedOut]);

  // ✅ 소셜 로그인 핸들러
  const handleSocialLogin = async (provider) => {
    if (provider === 'kakao') {
      await loginWithKakao();
    } else if (provider === 'google') {
      await loginWithGoogle();
    }
  };

  return (
    <Container>
      <Title>로그인</Title>

      {/* ✅ 이메일 로그인 폼 */}
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요."
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요."
          required
        />

        <LoginButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </LoginButton>
      </Form>

      <Divider />

      {/* ✅ 소셜 로그인 버튼 */}
      <SocialButtons>
        <SocialButton onClick={() => handleSocialLogin('kakao')} kakao="true">
          카카오 로그인
        </SocialButton>
        <SocialButton onClick={() => handleSocialLogin('google')} google="true">
          구글 로그인
        </SocialButton>
      </SocialButtons>

      {/* ✅ 회원가입 링크 */}
      <SignupLink>
        아직 회원이 아니신가요?{' '}
        <SignupButton onClick={() => navigate('/signup')}>
          회원가입
        </SignupButton>
      </SignupLink>
    </Container>
  );
};

export default Login;

/* ✅ 스타일 */
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const LoginButton = styled.button`
  padding: 12px;
  background: #f55656;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f76c6c;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  margin: 20px 0;
  border-bottom: 0.5px solid #ddd;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialButton = styled.button`
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  ${({ kakao }) =>
    kakao &&
    `
    background: #ffd000;
    color: #000;
  `}

  ${({ google }) =>
    google &&
    `
    background: #5985ff;
    color: #fff;
  `}

  &:hover {
    opacity: 0.8;
  }
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const SignupButton = styled.button`
  border: none;
  background: none;
  color: #f55656;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../supabase/auth/useAuth'; // ✅ useAuth로 변경
import styled from 'styled-components';

const Join = () => {
  const { signUp } = useAuth(); // ✅ Supabase 인증 훅 가져오기
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(form.userName)) {
      newErrors.userName = '이름은 2~8자의 한글, 영어, 숫자만 가능합니다.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(form.password)) {
      newErrors.password =
        '비밀번호는 영문 대소문자 + 숫자를 포함한 8~16자여야 합니다.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { user, error } = await signUp({
        email: form.email,
        password: form.password,
        userName: form.userName,
      });

      if (user) {
        alert('🎉 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        navigate('/login');
      } else {
        setErrors({ form: error.message || '회원가입에 실패했습니다.' });
      }
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}

      <Form onSubmit={handleSignup}>
        <Input
          type="text"
          name="userName"
          placeholder="이름 (2~8자)"
          value={form.userName}
          onChange={handleChange}
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}

        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Input
          type="password"
          name="password"
          placeholder="비밀번호 (8~16자, 영문+숫자 포함)"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}

        <SignupButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </SignupButton>
      </Form>

      <LoginLink>
        이미 회원이신가요?{' '}
        <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
      </LoginLink>
    </Container>
  );
};

export default Join;

/* ✅ Styled Components */
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }
`;

const SignupButton = styled.button`
  padding: 12px;
  background: #ff4500;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #ff6347;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 15px;
`;

const LoginButton = styled.button`
  border: none;
  background: none;
  color: #ff4500;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

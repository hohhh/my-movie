import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const Input = ({ type = 'text', name, value, onChange, placeholder }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

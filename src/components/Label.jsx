import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const Label = ({ htmlFor, text }) => {
  return <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>;
};

export default Label;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

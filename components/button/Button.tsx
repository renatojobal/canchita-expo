import React from 'react';
import { ButtonContainer } from './ButtonContainer';
import { ButtonProps } from './ButtonConfig';

export const Button: React.FC<ButtonProps> = (props) => {
  return <ButtonContainer {...props} />;
};

export default Button;
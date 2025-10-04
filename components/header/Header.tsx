import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderProps } from './HeaderConfig';

export const Header: React.FC<HeaderProps> = (props) => {
  return <HeaderContainer {...props} />;
};

export default Header;
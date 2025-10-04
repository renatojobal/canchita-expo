import React from 'react';
import { BottomNavigationContainer } from './BottomNavigationContainer';
import { BottomNavigationProps } from './BottomNavigationConfig';

export const BottomNavigation: React.FC<BottomNavigationProps> = (props) => {
  return <BottomNavigationContainer {...props} />;
};

export default BottomNavigation;
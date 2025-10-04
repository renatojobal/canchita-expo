import React from 'react';
import { CardContainer } from './CardContainer';
import { CardProps } from './CardConfig';

export const Card: React.FC<CardProps> = (props) => {
  return <CardContainer {...props} />;
};

export default Card;
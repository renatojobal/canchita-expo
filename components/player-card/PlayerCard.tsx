import React from 'react';
import { PlayerCardContainer } from './PlayerCardContainer';
import { PlayerCardProps } from './PlayerCardConfig';

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  return <PlayerCardContainer {...props} />;
};

export default PlayerCard;
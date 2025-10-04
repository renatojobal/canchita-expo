import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PlayerCardProps, playerCardStyles } from './PlayerCardConfig';

export const PlayerCardContainer: React.FC<PlayerCardProps> = ({
  id,
  name,
  position,
  avatar,
  stats,
  selected = false,
  onPress,
  size = 'md',
  showStats = false,
  team = null
}) => {
  const containerClasses = [
    playerCardStyles.container.base,
    selected ? playerCardStyles.container.selected : playerCardStyles.container.unselected,
    team ? playerCardStyles.teamColors[team] : playerCardStyles.teamColors.null
  ].filter(Boolean).join(' ');

  const avatarClasses = [
    playerCardStyles.avatar.base,
    playerCardStyles.avatar.sizes[size],
    team ? playerCardStyles.avatar.borders[team] : playerCardStyles.avatar.borders.null
  ].filter(Boolean).join(' ');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderStats = () => {
    if (!showStats || !stats) return null;

    const statsItems = [
      { value: stats.goals, label: 'Goals' },
      { value: stats.assists, label: 'Assists' },
      { value: stats.matches, label: 'Matches' },
      { value: stats.wins, label: 'Wins' }
    ].filter(item => item.value !== undefined);

    if (statsItems.length === 0) return null;

    return (
      <View className={playerCardStyles.stats.container}>
        {statsItems.slice(0, 4).map((stat, index) => (
          <View key={index} className={playerCardStyles.stats.item}>
            <Text className={playerCardStyles.stats.number}>{stat.value}</Text>
            <Text className={playerCardStyles.stats.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity
      className={containerClasses}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className={playerCardStyles.content}>
        <View className={avatarClasses}>
          {avatar ? (
            <Text className="text-lg">👤</Text>
          ) : (
            <View className="w-full h-full bg-green-600 items-center justify-center">
              <Text className="text-white font-bold text-lg">
                {getInitials(name)}
              </Text>
            </View>
          )}
          
          {selected && (
            <View className={playerCardStyles.selectedOverlay}>
              <Text className="text-white text-lg">✓</Text>
            </View>
          )}
        </View>
        
        <View className="mt-2 items-center">
          <Text className={`${playerCardStyles.text.name} ${playerCardStyles.text.sizes[size]}`}>
            {name}
          </Text>
          <Text className={`${playerCardStyles.text.position} ${playerCardStyles.text.sizes[size]}`}>
            {position}
          </Text>
        </View>
        
        {renderStats()}
      </View>
      
      {team && (
        <View className={`${playerCardStyles.teamBadge.container} ${
          team === 'A' ? playerCardStyles.teamBadge.teamA : playerCardStyles.teamBadge.teamB
        }`}>
          <Text className={playerCardStyles.teamBadge.text}>{team}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';

export interface Player {
  id: string;
  name: string;
  position?: string;
  avatar?: string;
  stats?: {
    goals: number;
    assists: number;
    matches: number;
  };
}

interface PlayerCardProps {
  player: Player;
  showStats?: boolean;
}

export default function PlayerCard({ player, showStats = false }: PlayerCardProps) {
  return (
    <Card>
      <View className="flex-row items-center space-x-3">
        <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center">
          {player.avatar ? (
            <Image
              source={{ uri: player.avatar }}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-xl">👤</Text>
          )}
        </View>
        
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">{player.name}</Text>
          {player.position && (
            <Text className="text-sm text-gray-600">{player.position}</Text>
          )}
          
          {showStats && player.stats && (
            <View className="flex-row space-x-4 mt-2">
              <Text className="text-xs text-gray-500">
                Goals: {player.stats.goals}
              </Text>
              <Text className="text-xs text-gray-500">
                Assists: {player.stats.assists}
              </Text>
              <Text className="text-xs text-gray-500">
                Matches: {player.stats.matches}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
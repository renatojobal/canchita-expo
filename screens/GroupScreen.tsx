import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, PlayerCard } from '../components';
import { mockPlayers } from '../data/mockData';

export default function GroupScreen() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Card title="Friends Soccer Group" className="mb-4">
        <Text className="text-gray-600 mb-4">
          {mockPlayers.length} players • Active since January 2024
        </Text>
        <Button variant="primary" onPress={() => console.log('Manage group')}>
          Manage Group
        </Button>
      </Card>

      <Card title="Group Players" className="mb-4">
        <View className="flex-row flex-wrap gap-3 mb-4">
          {mockPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              name={player.name}
              position={player.position}
              avatar={player.avatar}
              stats={player.stats}
              selected={selectedPlayers.includes(player.id)}
              onPress={() => togglePlayerSelection(player.id)}
              showStats={true}
              size="md"
            />
          ))}
        </View>
        {selectedPlayers.length > 0 && (
          <Text className="text-sm text-green-600 mb-2">
            {selectedPlayers.length} player(s) selected
          </Text>
        )}
        <View className="space-y-2">
          <Button variant="outline" onPress={() => console.log('Add player')}>
            Add New Player
          </Button>
          {selectedPlayers.length >= 2 && (
            <Button variant="secondary" onPress={() => console.log('Create teams')}>
              Create Teams ({selectedPlayers.length} players)
            </Button>
          )}
        </View>
      </Card>

      <Card title="Quick Actions" className="mb-4">
        <View className="space-y-2">
          <Button variant="primary" onPress={() => console.log('Start match')}>
            Start Quick Match
          </Button>
          <Button variant="outline" onPress={() => console.log('View stats')}>
            View Group Statistics
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
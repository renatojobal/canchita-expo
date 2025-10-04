import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PlayerCard, { Player } from '../ui/PlayerCard';

export default function GroupContainer() {
  const [groups] = useState<any[]>([]);
  const [players] = useState<Player[]>([
    {
      id: '1',
      name: 'John Doe',
      position: 'Forward',
      stats: { goals: 5, assists: 3, matches: 10 }
    },
    {
      id: '2', 
      name: 'Jane Smith',
      position: 'Midfielder',
      stats: { goals: 2, assists: 7, matches: 10 }
    }
  ]);

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-900">Groups</Text>
        <Button title="Create Group" variant="primary" size="small" />
      </View>

      {groups.length === 0 ? (
        <Card>
          <Text className="text-center text-gray-600 mb-4">
            No groups created yet
          </Text>
          <Button title="Create Your First Group" variant="outline" />
        </Card>
      ) : (
        <View className="space-y-4">
          {groups.map((group) => (
            <Card key={group.id}>
              <Text className="text-lg font-semibold mb-2">{group.name}</Text>
              <Text className="text-sm text-gray-600">
                {group.players?.length || 0} players
              </Text>
            </Card>
          ))}
        </View>
      )}

      <View className="mt-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">All Players</Text>
        <View className="space-y-3">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} showStats />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
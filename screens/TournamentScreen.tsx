import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '../app/components';

export default function TournamentScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Card title="Tournament Cups 🏆" className="mb-4">
        <Text className="text-gray-600 mb-4">
          Create automatic cup-style tournaments with group phases and elimination rounds
        </Text>
        <Button variant="primary" onPress={() => console.log('Create tournament')}>
          Create New Tournament
        </Button>
      </Card>

      <Card title="Active Tournaments" className="mb-4">
        <Text className="text-gray-500">No active tournaments</Text>
      </Card>

      <Card title="Tournament History" className="mb-4">
        <Text className="text-gray-500 mb-2">No completed tournaments</Text>
        <View className="space-y-2">
          <Button variant="outline" size="sm" onPress={() => console.log('View brackets')}>
            View Past Brackets
          </Button>
          <Button variant="secondary" size="sm" onPress={() => console.log('Tournament stats')}>
            Tournament Statistics
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
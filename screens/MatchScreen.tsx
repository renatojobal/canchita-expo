import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '../app/components';

export default function MatchScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Card title="Create New Match ⚽" className="mb-4">
        <Text className="text-gray-600 mb-4">
          Set up a new match between players in your group
        </Text>
        <View className="space-y-2">
          <Button variant="primary" onPress={() => console.log('Quick match')}>
            Quick Match (Auto Teams)
          </Button>
          <Button variant="outline" onPress={() => console.log('Custom match')}>
            Custom Match Setup
          </Button>
        </View>
      </Card>

      <Card title="Active Matches" className="mb-4">
        <Text className="text-gray-500">No matches in progress</Text>
      </Card>

      <Card title="Match History" className="mb-4">
        <Text className="text-gray-500 mb-2">No completed matches</Text>
        <Button variant="secondary" size="sm" onPress={() => console.log('View history')}>
          View All History
        </Button>
      </Card>
    </ScrollView>
  );
}
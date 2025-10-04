import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '../components';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Card title="Welcome to Canchita! ⚽" className="mb-4">
        <Text className="text-gray-600 mb-4">
          Organize your amateur soccer tournaments with friends
        </Text>
        <Button variant="primary" onPress={() => console.log('Create group')}>
          Create New Group
        </Button>
      </Card>

      <Card title="Recent Activity" className="mb-4">
        <Text className="text-gray-500">No recent matches</Text>
      </Card>

      <Card title="Quick Actions" className="mb-4">
        <View className="space-y-2">
          <Button variant="outline" onPress={() => console.log('Quick match')}>
            Start Quick Match
          </Button>
          <Button variant="secondary" onPress={() => console.log('View rankings')}>
            View Rankings
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
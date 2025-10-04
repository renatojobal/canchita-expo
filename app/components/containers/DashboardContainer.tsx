import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function DashboardContainer() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Dashboard</Text>
      
      <View className="space-y-4">
        <Card>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <Button title="Create New Group" variant="primary" />
            <Button title="Start Tournament" variant="secondary" />
          </View>
        </Card>

        <Card>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Recent Activity
          </Text>
          <Text className="text-gray-600">No recent activity</Text>
        </Card>

        <Card>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Statistics
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">0</Text>
              <Text className="text-sm text-gray-600">Groups</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">0</Text>
              <Text className="text-sm text-gray-600">Matches</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-purple-600">0</Text>
              <Text className="text-sm text-gray-600">Tournaments</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
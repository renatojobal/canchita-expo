import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from '../components';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Card title="Player Profile 👤" className="mb-4">
        <View className="items-center mb-4">
          <View className="w-20 h-20 bg-green-600 rounded-full items-center justify-center mb-2">
            <Text className="text-white text-2xl font-bold">R</Text>
          </View>
          <Text className="text-lg font-semibold">Ren</Text>
          <Text className="text-gray-500">Amateur Player</Text>
        </View>
        <Button variant="outline" onPress={() => console.log('Edit profile')}>
          Edit Profile
        </Button>
      </Card>

      <Card title="Player Statistics" className="mb-4">
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Matches Played:</Text>
            <Text className="font-semibold">0</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Wins:</Text>
            <Text className="font-semibold text-green-600">0</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Goals Scored:</Text>
            <Text className="font-semibold">0</Text>
          </View>
        </View>
      </Card>

      <Card title="Settings" className="mb-4">
        <View className="space-y-2">
          <Button variant="secondary" onPress={() => console.log('Notifications')}>
            Notification Settings
          </Button>
          <Button variant="outline" onPress={() => console.log('Privacy')}>
            Privacy Settings
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}
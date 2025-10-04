import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import './global.css';
import { Button, Card, Header, BottomNavigation } from './components';

export default function App() {
  return (
    <View className="flex-1 bg-gray-100">
      <Header 
        title="Canchita" 
        rightAction={<Text className="text-green-600 font-medium">⚙️</Text>}
      />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Card title="Welcome to Canchita! ⚽" className="mb-4">
          <Text className="text-gray-600 mb-4">
            Your components have been successfully migrated to React Native with NativeWind!
          </Text>
          
          <View className="space-y-3">
            <Button variant="primary" onPress={() => console.log('Primary pressed')}>
              Primary Button
            </Button>
            
            <Button variant="secondary" onPress={() => console.log('Secondary pressed')}>
              Secondary Button
            </Button>
            
            <Button variant="outline" onPress={() => console.log('Outline pressed')}>
              Outline Button
            </Button>
            
            <Button variant="danger" size="sm" onPress={() => console.log('Danger pressed')}>
              Small Danger Button
            </Button>
          </View>
        </Card>

        <Card title="Component Structure" className="mb-4">
          <Text className="text-gray-600 mb-2">Each component follows the stateless pattern:</Text>
          <Text className="text-sm text-gray-500">• ComponentConfig.ts - Types and styles</Text>
          <Text className="text-sm text-gray-500">• ComponentContainer.tsx - Logic and rendering</Text>
          <Text className="text-sm text-gray-500">• Component.tsx - Main export</Text>
        </Card>

        <View className="h-20" />
      </ScrollView>

      <BottomNavigation 
        currentRoute="/dashboard"
        onNavigate={(route) => console.log('Navigate to:', route)}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

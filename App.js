import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-lg font-bold text-green-600">Welcome to Canchita! ⚽</Text>
      <Text className="text-gray-600 mt-2">NativeWind is working!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

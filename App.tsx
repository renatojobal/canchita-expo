import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './global.css';

import DashboardScreen from './screens/DashboardScreen';
import GroupScreen from './screens/GroupScreen';
import MatchScreen from './screens/MatchScreen';
import TournamentScreen from './screens/TournamentScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  children: string;
}

function TabIcon({ focused, children }: TabIconProps) {
  return (
    <Text style={{ fontSize: 20, color: focused ? '#16a34a' : '#6b7280' }}>
      {children}
    </Text>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              height: 64,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: 4,
            },
            tabBarActiveTintColor: '#16a34a',
            tabBarInactiveTintColor: '#6b7280',
            headerStyle: {
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: '#e5e7eb',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#1f2937',
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused}>🏠</TabIcon>,
            }}
          />
          <Tab.Screen
            name="Group"
            component={GroupScreen}
            options={{
              title: 'Groups',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused}>👥</TabIcon>,
            }}
          />
          <Tab.Screen
            name="Match"
            component={MatchScreen}
            options={{
              title: 'Matches',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused}>⚽</TabIcon>,
            }}
          />
          <Tab.Screen
            name="Tournament"
            component={TournamentScreen}
            options={{
              title: 'Cups',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused}>🏆</TabIcon>,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              tabBarIcon: ({ focused }) => <TabIcon focused={focused}>👤</TabIcon>,
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
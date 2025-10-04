import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomNavigationProps, navigationItems, bottomNavigationStyles } from './BottomNavigationConfig';

export const BottomNavigationContainer: React.FC<BottomNavigationProps> = ({
  currentRoute,
  onNavigate
}) => {
  const isActive = (route: string) => {
    return currentRoute === route;
  };

  return (
    <View className={bottomNavigationStyles.container}>
      {navigationItems.map((item, index) => {
        if (item.key === 'match') {
          return (
            <View key={item.key} className={bottomNavigationStyles.centerButton.container}>
              <TouchableOpacity
                className={bottomNavigationStyles.centerButton.button}
                onPress={() => onNavigate?.(item.route)}
                activeOpacity={0.8}
              >
                <Text className={bottomNavigationStyles.centerButton.icon}>
                  {item.icon}
                </Text>
              </TouchableOpacity>
              <Text className={bottomNavigationStyles.centerButton.label}>
                {item.label}
              </Text>
            </View>
          );
        }

        const isItemActive = isActive(item.route);
        const textColor = isItemActive ? bottomNavigationStyles.activeTab : bottomNavigationStyles.inactiveTab;

        return (
          <TouchableOpacity
            key={item.key}
            className={`${bottomNavigationStyles.tab} ${textColor}`}
            onPress={() => onNavigate?.(item.route)}
            activeOpacity={0.7}
          >
            <Text className={`${bottomNavigationStyles.icon} ${textColor}`}>
              {item.icon}
            </Text>
            <Text className={`${bottomNavigationStyles.label} ${textColor}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
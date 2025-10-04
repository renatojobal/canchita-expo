import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderProps, headerStyles } from './HeaderConfig';

export const HeaderContainer: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightAction,
  onBackPress
}) => {
  return (
    <View className={headerStyles.container}>
      <View className={headerStyles.content}>
        <View className={headerStyles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              className={headerStyles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 text-xl">‹</Text>
            </TouchableOpacity>
          )}
          <Text className={headerStyles.title}>{title}</Text>
        </View>
        {rightAction && (
          <View className={headerStyles.rightSection}>
            {rightAction}
          </View>
        )}
      </View>
    </View>
  );
};
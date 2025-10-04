import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardProps, cardStyles } from './CardConfig';

export const CardContainer: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  onPress,
  footer
}) => {
  const containerClasses = [
    cardStyles.base,
    onPress ? cardStyles.pressable : '',
    className
  ].filter(Boolean).join(' ');

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      className={containerClasses}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {title && (
        <View className={cardStyles.title.container}>
          <Text className={cardStyles.title.text}>{title}</Text>
        </View>
      )}
      <View className={cardStyles.content}>
        {children}
      </View>
      {footer && (
        <View className={cardStyles.footer.container}>
          {footer}
        </View>
      )}
    </CardComponent>
  );
};
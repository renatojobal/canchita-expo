import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ButtonProps, buttonStyles } from './ButtonConfig';

export const ButtonContainer: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onPress,
  disabled = false,
  icon,
  className = ''
}) => {
  const containerClasses = [
    buttonStyles.base,
    buttonStyles.variants[variant],
    buttonStyles.sizes[size],
    fullWidth ? buttonStyles.width.full : buttonStyles.width.auto,
    disabled ? buttonStyles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  const textClasses = [
    buttonStyles.variantText[variant],
    disabled ? buttonStyles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <TouchableOpacity
      className={containerClasses}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {icon && (
        <View className="mr-2">
          {icon}
        </View>
      )}
      <Text className={textClasses}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
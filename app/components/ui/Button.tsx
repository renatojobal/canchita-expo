import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large' | 'sm';
}

export default function Button({ 
  title, 
  children,
  variant = 'primary', 
  size = 'medium',
  style,
  ...props 
}: ButtonProps) {
  const buttonText = title || children;
  const baseClasses = 'items-center justify-center rounded-lg';
  
  const variantClasses = {
    primary: 'bg-green-600',
    secondary: 'bg-gray-600',
    outline: 'border-2 border-green-600 bg-transparent',
  };

  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4',
    sm: 'px-3 py-2', // alias for small
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-green-600',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    sm: 'text-sm', // alias for small
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      style={style}
      {...props}
    >
      <Text className={`font-semibold ${textVariantClasses[variant]} ${textSizeClasses[size]}`}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}
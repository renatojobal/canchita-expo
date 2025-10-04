import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Card({ children, title, className, style, ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className || ''}`}
      style={style}
      {...props}
    >
      {title && (
        <Text className="text-lg font-semibold text-gray-900 mb-3">{title}</Text>
      )}
      {children}
    </View>
  );
}
import React from 'react';
import { View, Text } from 'react-native';
import { Newspaper } from 'lucide-react-native';

interface IEmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: IEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Newspaper className="text-muted-foreground mb-4" size={48} />
      <Text className="text-base text-muted-foreground text-center">
        {message}
      </Text>
    </View>
  );
} 
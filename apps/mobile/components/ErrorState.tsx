import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

interface IErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: IErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <AlertCircle className="text-destructive mb-4" size={48} />
      <Text className="text-base text-destructive text-center mb-2">
        {error.message || '오류가 발생했습니다.'}
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-primary px-4 py-2 rounded-md"
      >
        <Text className="text-primary-foreground font-medium">다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
} 
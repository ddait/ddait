import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface MessageInputProps {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');
  const backgroundColor = useThemeColor({}, 'cardBackground') as ColorValue;
  const textColor = useThemeColor({}, 'text') as ColorValue;
  const iconColor = useThemeColor({}, 'text') as ColorValue;

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={text}
        onChangeText={setText}
        placeholder="메시지를 입력하세요"
        placeholderTextColor={textColor}
        multiline
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="send" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
}); 
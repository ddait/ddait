import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { X, Send } from 'lucide-react-native';
import { IComment, IPost } from './types';

interface ICommentModalProps {
  post: IPost;
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  comments: IComment[];
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function CommentModal({
  post,
  visible,
  onClose,
  onSubmit,
  comments,
  isLoading,
  onLoadMore,
}: ICommentModalProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
  };

  const renderComment = ({ item }: { item: IComment }) => (
    <View className="p-4 border-b border-border">
      <View className="flex-row items-center mb-2">
        <Text className="font-medium text-foreground">{item.user.username}</Text>
        <Text className="text-xs text-muted-foreground ml-2">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-foreground">{item.content}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-background">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">댓글</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} className="text-foreground" />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            className="flex-1"
          />

          {/* Comment Input */}
          <View className="p-4 border-t border-border flex-row items-center gap-2">
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="댓글을 입력하세요..."
              placeholderTextColor="#666"
              className="flex-1 bg-muted rounded-full px-4 py-2 text-foreground"
              multiline
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!content.trim()}
              className={`p-2 rounded-full ${
                content.trim() ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <Send
                size={20}
                className={content.trim() ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
} 
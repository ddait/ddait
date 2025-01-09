import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useFeed } from '@/hooks/useFeed';
import { FeedFilter, FeedSortType } from './types';

export default function FeedHeader() {
  const { filter, sortType, updateFilter, updateSort } = useFeed();

  const filters: { label: string; value: FeedFilter }[] = [
    { label: '전체', value: 'all' },
    { label: '팔로잉', value: 'following' },
  ];

  const sortTypes: { label: string; value: FeedSortType }[] = [
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'popular' },
  ];

  return (
    <View className="flex-row justify-between items-center p-4 bg-background border-b border-border">
      <View className="flex-row gap-2">
        {filters.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            onPress={() => updateFilter(value)}
            className={`px-3 py-1 rounded-full ${
              filter === value
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                filter === value
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row gap-2">
        {sortTypes.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            onPress={() => updateSort(value)}
            className={`px-3 py-1 rounded-full ${
              sortType === value
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                sortType === value
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 
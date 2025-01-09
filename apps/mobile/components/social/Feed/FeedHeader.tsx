import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { FeedFilter, FeedSortType } from './types';

interface FeedHeaderProps {
  currentFilter: FeedFilter;
  currentSort: FeedSortType;
  onFilterChange: (filter: FeedFilter) => void;
  onSortChange: (sort: FeedSortType) => void;
}

export default function FeedHeader({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: FeedHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            currentFilter === 'all' && styles.activeFilter,
            { borderColor: colors.text }
          ]}
          onPress={() => onFilterChange('all')}
        >
          <Text
            style={[
              styles.filterText,
              { color: colors.text },
              currentFilter === 'all' && styles.activeText
            ]}
          >
            전체
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            currentFilter === 'following' && styles.activeFilter,
            { borderColor: colors.text }
          ]}
          onPress={() => onFilterChange('following')}
        >
          <Text
            style={[
              styles.filterText,
              { color: colors.text },
              currentFilter === 'following' && styles.activeText
            ]}
          >
            팔로잉
          </Text>
        </Pressable>
      </View>
      <View style={styles.sortContainer}>
        <Pressable
          style={[
            styles.sortButton,
            currentSort === 'latest' && styles.activeSort,
            { borderColor: colors.text }
          ]}
          onPress={() => onSortChange('latest')}
        >
          <Text
            style={[
              styles.sortText,
              { color: colors.text },
              currentSort === 'latest' && styles.activeText
            ]}
          >
            최신순
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.sortButton,
            currentSort === 'popular' && styles.activeSort,
            { borderColor: colors.text }
          ]}
          onPress={() => onSortChange('popular')}
        >
          <Text
            style={[
              styles.sortText,
              { color: colors.text },
              currentSort === 'popular' && styles.activeText
            ]}
          >
            인기순
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E1E1E1',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  activeFilter: {
    backgroundColor: '#000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  activeSort: {
    backgroundColor: '#000',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '500',
  },
  activeText: {
    color: '#FFF',
  },
}); 
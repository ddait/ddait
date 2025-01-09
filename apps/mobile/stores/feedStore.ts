import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPost, FeedFilter, FeedSortType } from '@/components/social/Feed/types';

interface FeedState {
  posts: IPost[];
  filter: FeedFilter;
  sortType: FeedSortType;
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface FeedActions {
  setPosts: (posts: IPost[]) => void;
  addPosts: (posts: IPost[]) => void;
  updatePost: (postId: string, updates: Partial<IPost>) => void;
  removePost: (postId: string) => void;
  setFilter: (filter: FeedFilter) => void;
  setSortType: (sortType: FeedSortType) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

const initialState: FeedState = {
  posts: [],
  filter: 'all',
  sortType: 'latest',
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

export const useFeedStore = create<FeedState & FeedActions>()(
  persist(
    (set) => ({
      ...initialState,

      setPosts: (posts) => set({ posts }),
      
      addPosts: (newPosts) =>
        set((state) => ({
          posts: [...state.posts, ...newPosts],
        })),

      updatePost: (postId, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, ...updates } : post
          ),
        })),

      removePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),

      setFilter: (filter) =>
        set({
          filter,
          posts: [],
          currentPage: 1,
          hasMore: true,
        }),

      setSortType: (sortType) =>
        set({
          sortType,
          posts: [],
          currentPage: 1,
          hasMore: true,
        }),

      setCurrentPage: (currentPage) => set({ currentPage }),
      
      setHasMore: (hasMore) => set({ hasMore }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'feed-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        filter: state.filter,
        sortType: state.sortType,
      }),
    }
  )
); 
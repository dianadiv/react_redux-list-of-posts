/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const response = await getUserPosts(id);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;

/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  value: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SelectedPostState = {
  value: {} as Post,
  status: 'idle',
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export const selectPost = (state: RootState) => state.selectedPost.value;

export const { setPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;

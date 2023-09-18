/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  value: Comment[];
  loading: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  value: [],
  loading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (id: number) => {
    const response = await getPostComments(id);

    return response;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.value.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { addNewComment, removeComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;

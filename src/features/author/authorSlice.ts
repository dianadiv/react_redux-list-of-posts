/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface AuthorState {
  value: User;
}

const initialState: AuthorState = {
  value: {} as User,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.value;

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;

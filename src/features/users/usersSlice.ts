/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Error';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;

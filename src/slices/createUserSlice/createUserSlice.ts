import { createSlice } from '@reduxjs/toolkit';
import type { State } from './types';

const initialState: State = {
	user: null,
};

const createUserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		createNewUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { createNewUser } = createUserSlice.actions;

export default createUserSlice.reducer;

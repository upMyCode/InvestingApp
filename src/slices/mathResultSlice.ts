import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MathResult {
  mathResult: string;
}

const initialState: MathResult = {
  mathResult: '',
};

export const mathResultSlice = createSlice({
  name: 'mathResult',
  initialState,
  reducers: {
    changeMathResult(state, action: PayloadAction<string>) {
      state.mathResult = action.payload;
    },
    removeMathResult(state) {
      state.mathResult = '';
    },
  },
});

export default mathResultSlice.reducer;
export const { changeMathResult, removeMathResult } = mathResultSlice.actions;

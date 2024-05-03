import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MathExpression {
  mathExpression: string;
}

const initialState: MathExpression = {
  mathExpression: '',
};

export const mathExpressionSlice = createSlice({
  name: 'mathExpression',
  initialState,
  reducers: {
    changeMathExpression(state, action: PayloadAction<string>) {
      state.mathExpression = action.payload;
    },
    removeMathExpression(state) {
      state.mathExpression = '';
    },
  },
});

export default mathExpressionSlice.reducer;
export const { changeMathExpression, removeMathExpression } =
  mathExpressionSlice.actions;

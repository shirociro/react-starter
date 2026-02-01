import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  [key: string]: number; // key = pagination identifier
}

const initialState: PaginationState = {};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ key: string; page: number }>) => {
      state[action.payload.key] = action.payload.page;
    },
  },
});

export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;

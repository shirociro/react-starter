import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Blog } from "../types/blog.types";

interface BlogState {
  selectedBlog?: Blog;
}

const initialState: BlogState = {};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSelectedBlog(state, action: PayloadAction<Blog>) {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog(state) {
      state.selectedBlog = undefined;
    },
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;

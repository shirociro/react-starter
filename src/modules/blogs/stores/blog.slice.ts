import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Blog } from "@/modules/blogs/types/blog.types";

interface BlogState {
  selectedBlog?: Blog;
  deletingIds: number[];
}

const initialState: BlogState = {
  selectedBlog: undefined,
  deletingIds: [],
};

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
    startDeleting(state, action: PayloadAction<number>) {
      if (!state.deletingIds.includes(action.payload)) {
        state.deletingIds.push(action.payload);
      }
    },
    finishDeleting(state, action: PayloadAction<number>) {
      state.deletingIds = state.deletingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const {
  setSelectedBlog,
  clearSelectedBlog,
  startDeleting,
  finishDeleting,
} = blogSlice.actions;
export default blogSlice.reducer;

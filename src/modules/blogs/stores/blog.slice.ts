import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BlogPost } from "../types/blog.types";

interface BlogState {
  selectedBlog?: BlogPost;
}

const initialState: BlogState = {
  selectedBlog: undefined,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Set the currently selected blog
    setSelectedBlog(state, action: PayloadAction<BlogPost>) {
      state.selectedBlog = action.payload;
    },

    // Clear the selected blog
    clearSelectedBlog(state) {
      state.selectedBlog = undefined;
    },
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;

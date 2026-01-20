// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/stores/auth.slice";
import blogReducer from "../modules/blogs/stores/blog.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../modules/auth/stores/auth.slice";
import blogReducer from "../modules/blogs/stores/blog.slice";

// 1. Configure persist for slices you want to persist
const persistConfig = {
  key: "root",          // storage key
  storage,               // storage engine
  whitelist: ["auth"],   // only persist the auth slice
};

// 2. Combine reducers
const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

// 5. Create persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/modules/auth/stores/auth.slice";
import blogReducer from "@/modules/blogs/stores/blog.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth survives refresh
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

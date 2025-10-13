import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editorSlice";
import { documentsApi } from "./documentApi";
import { UserApi } from "./UserApi";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    [documentsApi.reducerPath]: documentsApi.reducer, 
    [UserApi.reducerPath]: UserApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(documentsApi.middleware, UserApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

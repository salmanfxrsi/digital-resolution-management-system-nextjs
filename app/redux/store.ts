import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { taskApi } from "./features/tasks/taskapi";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

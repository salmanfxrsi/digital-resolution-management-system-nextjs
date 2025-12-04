import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";

import { taskApi } from "./features/tasks/taskapi";
import { employeesApi } from "./features/Employees/employeesApi";
import { overviewApi } from "./features/tasks/EmployeeTaskoverviewApi";

export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      taskApi.middleware,
      employeesApi.middleware,
      overviewApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

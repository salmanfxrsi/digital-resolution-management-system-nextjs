import userReducer from "./features/Auth/userSlice";
import taskReducer from "./features/tasks/taskSlice";
import employeesReducer from "./features/Employees/employeesSlice";

import { taskApi } from "./features/tasks/taskapi";
import { employeesApi } from "./features/Employees/employeesApi";
import { overviewApi } from "./features/tasks/EmployeeTaskoverviewApi";

export const reducer = {
  user: userReducer,
  task: taskReducer,
  employees: employeesReducer,


  [taskApi.reducerPath]: taskApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
};

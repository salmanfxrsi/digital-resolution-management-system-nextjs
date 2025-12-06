import userReducer from "./features/Auth/userSlice";
import taskReducer from "./features/tasks/taskSlice";
import employeesReducer from "./features/Employees/employeesSlice";
import clientsReducer from "./features/clients/clientsSlice";
import { taskApi } from "./features/tasks/taskapi";
import { employeesApi } from "./features/Employees/employeesApi";
import { overviewApi } from "./features/tasks/EmployeeTaskoverviewApi";
import { clientsApi } from "./features/clients/clientsApi";
import { leaveApi } from "./features/leave/leaveApi";
export const reducer = {
  user: userReducer,
  task: taskReducer,
  employees: employeesReducer,
  clients: clientsReducer,

  [taskApi.reducerPath]: taskApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [leaveApi.reducerPath]: leaveApi.reducer,
};

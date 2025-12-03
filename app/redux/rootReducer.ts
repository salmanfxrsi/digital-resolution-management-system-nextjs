import userReducer from "./features/Auth/userSlice";
import taskReducer from "./features/tasks/taskSlice";
import { taskApi } from "./features/tasks/taskapi";

export const reducer = {
  user: userReducer,
  task: taskReducer,
  [taskApi.reducerPath]: taskApi.reducer, 
};

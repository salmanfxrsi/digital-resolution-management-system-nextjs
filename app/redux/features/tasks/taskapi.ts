import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: "taskApi",

    tagTypes: ["tasks"],

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => ({
        // GET Employee Tasks
        getTasksByEmployee: builder.query({
            query: (id: string) => `/tasks/employee/${id}`,
            providesTags: ["tasks"],
        }),

        // CREATE Task
        createTask: builder.mutation({
            query: (payload) => ({
                url: "/tasks/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["tasks"],
        }),

        updateTask: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/tasks/update/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["tasks"],
        }),

    }),
});

export const {
    useGetTasksByEmployeeQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation
} = taskApi;

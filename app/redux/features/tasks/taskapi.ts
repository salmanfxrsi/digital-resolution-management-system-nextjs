import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: "taskApi",

    tagTypes: ["Tasks"],

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => ({
        // GET Employee Tasks
        getTasksByEmployee: builder.query({
            query: (id: string) => `/tasks/employee/${id}`,
            providesTags: ["Tasks"],
        }),

        // CREATE Task
        createTask: builder.mutation({
            query: (payload) => ({
                url: "/tasks/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Tasks"],
        }),

        updateTask: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/tasks/update/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["Tasks"],
        }),

    }),
});

export const {
    useGetTasksByEmployeeQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation
} = taskApi;

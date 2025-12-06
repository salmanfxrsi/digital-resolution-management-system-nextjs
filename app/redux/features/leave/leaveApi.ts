import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leaveApi = createApi({
  reducerPath: "leaveApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  tagTypes: ["Leave"],

  endpoints: (builder) => ({
    // CREATE Leave
    createLeave: builder.mutation({
      query: (body) => ({
        url: "/leave/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leave"],
    }),

    // GET Leaves by Employee
    getLeaveByEmployee: builder.query({
      query: (employeeId) => `/leave/employee/${employeeId}`,
      providesTags: ["Leave"],
    }),

    // UPDATE Leave
    updateLeave: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/leave/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Leave"],
    }),

    // DELETE Leave
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useCreateLeaveMutation,
  useGetLeaveByEmployeeQuery,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
} = leaveApi;

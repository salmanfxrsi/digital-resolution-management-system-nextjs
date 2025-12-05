import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",

  tagTypes: ["Employees"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: (builder) => ({
    // GET all employees
    getEmployees: builder.query({
      query: () => `/employees`,
      providesTags: ["Employees"],
    }),

    // GET single employee by ID
    getEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employees", id }],
    }),

    // CREATE employee
    createEmployee: builder.mutation({
      query: (payload) => ({
        url: "/employees/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),

    // UPDATE employee
    updateEmployee: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/employees/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),

    // DELETE employee
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentOverviewApi = createApi({
  reducerPath: "departmentOverviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["DepartmentOverview"],

  endpoints: (builder) => ({
    getDepartmentOverview: builder.query({
      // departmentId is actually the role string (e.g. "web_developer")
      query: ({ departmentId }) => `/departments/overview/${departmentId}`,
      providesTags: ["DepartmentOverview"],
    }),
    getDepartmentEmployees: builder.query({
      query: ({ departmentId }) => `/departments/employees/${departmentId}`,
      providesTags: ["DepartmentOverview"],
    }),
  }),
});

export const { useGetDepartmentOverviewQuery, useGetDepartmentEmployeesQuery } =
  departmentOverviewApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  tagTypes: ["Attendance"],

  endpoints: (builder) => ({
    getFullAttendance: builder.query({
      query: (employeeId: string) => `/tasks/attendance/full/${employeeId}`,
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useGetFullAttendanceQuery } = attendanceApi;

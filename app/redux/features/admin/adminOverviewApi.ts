import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminOverviewApi = createApi({
  reducerPath: "adminOverviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["AdminOverview"],

  endpoints: (builder) => ({
    // 🔹 Get overall admin dashboard metrics
    getAdminOverview: builder.query({
      query: () => `/admin/overview`,
      providesTags: ["AdminOverview"],
    }),
  }),
});

export const { useGetAdminOverviewQuery } = adminOverviewApi;

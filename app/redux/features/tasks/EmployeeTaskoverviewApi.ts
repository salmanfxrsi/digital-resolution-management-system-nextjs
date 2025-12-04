import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Overview"],

  endpoints: (builder) => ({
    getOverview: builder.query({
      query: ({ employeeId, days, from, to }) => {
        let query = "";

        if (days) query = `?days=${days}`;
        if (from && to) query = `?from=${from}&to=${to}`;

        return `/tasks/overview/${employeeId}${query}`;
      },
      providesTags: ["Overview"],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;

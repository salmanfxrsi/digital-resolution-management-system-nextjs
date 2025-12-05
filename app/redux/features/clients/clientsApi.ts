import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientsApi = createApi({
  reducerPath: "clientsApi",

  tagTypes: ["Clients"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: (builder) => ({
    // GET all employees
    getClients: builder.query({
      query: () => `/clients`,
      providesTags: ["Clients"],
    }),

    // GET single employee by ID
    getClientById: builder.query({
      query: (id) => `/clients/${id}`,
      providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),

    // CREATE client
    createClient: builder.mutation({
      query: (payload) => ({
        url: "/clients/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Clients"],
    }),

    // UPDATE client
    updateClient: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/clients/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Clients"],
    }),

    // DELETE client
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;

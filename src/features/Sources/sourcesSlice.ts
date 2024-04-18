import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Sources {
  _id?: string;
  name: string;
}

export const sourcesSlice = createApi({
  reducerPath: "sources",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/source",
  }),
  tagTypes: ["Sources"],
  endpoints(builder) {
    return {
      getAllSources: builder.query<Sources[], number | void>({
        query() {
          return "/getAllSources";
        },
        providesTags: ["Sources"],
      }),
      addNewSource: builder.mutation<void, Sources>({
        query(payload) {
          return {
            url: "/newSource",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Sources"],
      }),
      deleteSource: builder.mutation<void, Sources>({
        query: (_id) => ({
          url: `/deleteSource/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Sources"],
      }),
    };
  },
});

export const {
  useAddNewSourceMutation,
  useDeleteSourceMutation,
  useGetAllSourcesQuery,
} = sourcesSlice;

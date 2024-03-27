import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ForceSingle {
  _id?: string;
  car: string;
  percentage: string;
  hours_wait: string;
  miles: string;
}

export const forceSingleSlice = createApi({
  reducerPath: "forceSingle",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/forceSingle",
  }),
  tagTypes: ["ForceSingle"],
  endpoints(builder) {
    return {
      getAllForceSingles: builder.query<ForceSingle[], number | void>({
        query() {
          return "/getAllForceSingles";
        },
        providesTags: ["ForceSingle"],
      }),
      addNewForceSingle: builder.mutation<void, ForceSingle>({
        query(payload) {
          return {
            url: "/newForceSingle",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["ForceSingle"],
      }),
      deleteForceSingle: builder.mutation<void, ForceSingle>({
        query: (_id) => ({
            url: `/deleteForceSingle/${_id}`,
            method: "Delete",
        }),
        invalidatesTags: ["ForceSingle"],
    }),
    };
  },
});

export const {
useAddNewForceSingleMutation,
useDeleteForceSingleMutation,
useGetAllForceSinglesQuery
} = forceSingleSlice;
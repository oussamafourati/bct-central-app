import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Visitor {
  _id?: string;
  estimated_start_time: string;
  estimated_return_start_time: string;
  destination_point: object;
  start_point: object;
  email: string;
  phone: string;
  name: string;
  enquiryDate: string;
}

export const visitorSlice = createApi({
  reducerPath: "visitor",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/visitor",
  }),
  tagTypes: ["Visitor"],
  endpoints(builder) {
    return {
      getAllVisitors: builder.query<Visitor[], number | void>({
        query() {
          return "/getAllVisitors";
        },
        providesTags: ["Visitor"],
      }),
      addNewVisitor: builder.mutation<void, Visitor>({
        query(payload) {
          return {
            url: "/newVisitor",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Visitor"],
      }),
      deleteVisitor: builder.mutation<void, Visitor>({
        query: (_id) => ({
            url: `/deleteVisitor/${_id}`,
            method: "Delete",
        }),
        invalidatesTags: ["Visitor"],
    }),
    };
  },
});

export const {
  useAddNewVisitorMutation,
  useGetAllVisitorsQuery,
  useDeleteVisitorMutation
} = visitorSlice;
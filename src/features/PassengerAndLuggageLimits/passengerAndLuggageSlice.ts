import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PassengerAndLuggage {
  _id?: string;
  vehicle_type: string;
  max_passengers: string;
  max_luggage: string;
}

export const passengerAndLuggageSlice = createApi({
  reducerPath: "passengerAndLuggage",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/passengerLuggageLimit",
  }),
  tagTypes: ["PassengerAndLuggage"],
  endpoints(builder) {
    return {
      getAllPassengerAndLuggages: builder.query<PassengerAndLuggage[], number | void>({
        query() {
          return "/getAllPassengerLuggageLimits";
        },
        providesTags: ["PassengerAndLuggage"],
      }),
      addNewPassengerAndLuggage: builder.mutation<void, PassengerAndLuggage>({
        query(payload) {
          return {
            url: "/newPassengerLuggageLimit",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["PassengerAndLuggage"],
      }),
      deletePassengerAndLuggage: builder.mutation<void, PassengerAndLuggage>({
        query: (_id) => ({
            url: `/deletePassengerLuggageLimit/${_id}`,
            method: "Delete",
        }),
        invalidatesTags: ["PassengerAndLuggage"],
    }),
    };
  },
});

export const {
useAddNewPassengerAndLuggageMutation,
useDeletePassengerAndLuggageMutation,
useGetAllPassengerAndLuggagesQuery
} = passengerAndLuggageSlice;
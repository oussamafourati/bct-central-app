import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface HourBand {
    vehicle_type: string;
    hours_limit:string;
    price:string;
}

export const hourlyBandSlice = createApi({
  reducerPath: "hourBand",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/hourlyBand",
  }),
  tagTypes: ["HourBand"],
  endpoints(builder) {
    return {
      getAllHourBand: builder.query<HourBand[], number | void>({
        query() {
          return "/getAllHourlyBands";
        },
        providesTags: ["HourBand"],
      }),
      addNewHourBand: builder.mutation<void, HourBand>({
        query(payload) {
          return {
            url: "/newHourlyBand",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["HourBand"],
      }),
      deleteHourBand: builder.mutation<void, HourBand>({
        query: (_id) => ({
          url: `/deleteHourlyBand/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["HourBand"],
      }),
    };
  },
});

export const {
useGetAllHourBandQuery,
useAddNewHourBandMutation,
useDeleteHourBandMutation
} = hourlyBandSlice;
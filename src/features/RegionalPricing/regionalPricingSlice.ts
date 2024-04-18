import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RegionalPricing {
  _id?: string;
  type_vehicle: string;
  location: string;
  miles: string;
  uplift: string;
  title: string;
}

export const regionalPricingSlice = createApi({
  reducerPath: "regionalPricing",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/regionalPricing/",
  }),
  tagTypes: ["RegionalPricing"],
  endpoints(builder) {
    return {
      getAllRegionalPricings: builder.query<RegionalPricing[], number | void>({
        query() {
          return "/getAllRegionalPricings";
        },
        providesTags: ["RegionalPricing"],
      }),
      addNewRegionalPricing: builder.mutation<void, RegionalPricing>({
        query(payload) {
          return {
            url: "/newRegionalPricing",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["RegionalPricing"],
      }),
      deleteRegionalPricing: builder.mutation<void, RegionalPricing>({
        query: (_id) => ({
          url: `/deleteRegionalPricing/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["RegionalPricing"],
      }),
    };
  },
});

export const {
  useAddNewRegionalPricingMutation,
  useDeleteRegionalPricingMutation,
  useGetAllRegionalPricingsQuery,
} = regionalPricingSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Quote {
  _id?: string;
  passengers_number: number;
  journey_type: string;
  estimated_start_time: string;
  estimated_return_start_time: string;
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  start_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  vehicle_type: string;
  id_visitor: string;
  school_id?: string;
  company_id?: string;
  notes: string;
  createdAt: Date;
  luggage_details: string;
  manual_cost: string;
  status: string;
  progress: string;
  balance: string;
  deposit: string;
  id_driver: string;
  id_vehicle: string;
  total_price: string;
  deposit_percentage: string;
  automatic_cost: string;
  deposit_amount: string;
  category?: string;
  date?: string;
  return_time?: string;
  pickup_time?: string;
  mid_stations: {
    id: string;
    address: string;
    time: string;
  }[];
}

export interface BookEmail {
  quote_id: string;
  id_visitor: string;
  price: number;
  automatic_cost: string;
  deposit_amount: string;
  deposit_percentage: string;
  total_price: string;
}

export interface AssignDriver {
  quote_id: string;
  id_visitor: string;
  manual_cost: string;
  id_vehicle: string;
  id_driver: string;
}

export interface AssignDriverAndVehicleToQuoteInterface {
  quote_ID: string;
  vehicle_ID: string;
  driver_ID: string;
}

export interface AssignDriverToQuote {
  quote_id: string;
  id_driver: string;
}

export interface AssignVehicleToQuote {
  quote_id: string;
  id_vehicle: string;
}

export interface CancelQuote {
  quoteId: string;
  status: string;
}

export const quoteSlice = createApi({
  reducerPath: "quote",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/quote",
  }),
  tagTypes: [
    "Quote",
    "BookEmail",
    "AssignDriver",
    "AssignVehicleToQuote",
    "AssignDriverToQuote",
    "CancelQuote",
    "ConvertTo",
    "AssignDriverAndVehicleToQuoteInterface",
  ],
  endpoints(builder) {
    return {
      getAllQuote: builder.query<Quote[], number | void>({
        query() {
          return "/getAllQuotes";
        },
        providesTags: ["Quote"],
      }),
      getQuoteById: builder.query<Quote, number | void>({
        query: (_id) => ({
          url: `/getQuoteById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Quote"],
      }),
      getQuoteByIdSchedule: builder.query<Quote[], { id_schedule: string }>({
        query: ({ id_schedule }) => ({
          url: `/getQuoteByIdSchedule`,
          method: "POST",
          body: { id_schedule: id_schedule },
        }),
        providesTags: ["Quote"],
      }),
      addSendBookEmail: builder.mutation<void, BookEmail>({
        query({
          id_visitor,
          price,
          quote_id,
          automatic_cost,
          deposit_amount,
          deposit_percentage,
          total_price,
        }) {
          return {
            url: "/sendBookingEmail",
            method: "POST",
            body: {
              id_visitor,
              price,
              quote_id,
              automatic_cost,
              deposit_amount,
              deposit_percentage,
              total_price,
            },
          };
        },
        invalidatesTags: ["BookEmail"],
      }),
      addAssignDriver: builder.mutation<void, AssignDriver>({
        query({ quote_id, manual_cost, id_visitor, id_vehicle, id_driver }) {
          return {
            url: "/assignDriver",
            method: "POST",
            body: { quote_id, manual_cost, id_visitor, id_vehicle, id_driver },
          };
        },
        invalidatesTags: ["Quote", "AssignDriver"],
      }),
      addDriverToQuote: builder.mutation<void, AssignDriverToQuote>({
        query({ quote_id, id_driver }) {
          return {
            url: "/assignDriverToQuote",
            method: "POST",
            body: { quote_id, id_driver },
          };
        },
        invalidatesTags: ["Quote", "AssignDriverToQuote"],
      }),
      updateStatusQuoteToCancel: builder.mutation<void, CancelQuote>({
        query({ quoteId, status }) {
          return {
            url: "/cancelQuote",
            method: "POST",
            body: { quoteId, status },
          };
        },
        invalidatesTags: ["Quote", "CancelQuote"],
      }),
      addVehicleToQuote: builder.mutation<void, AssignVehicleToQuote>({
        query({ quote_id, id_vehicle }) {
          return {
            url: "/assignVehicleToDriver",
            method: "POST",
            body: { quote_id, id_vehicle },
          };
        },
        invalidatesTags: ["Quote", "AssignVehicleToQuote"],
      }),
      deleteQuote: builder.mutation<void, Quote>({
        query: (_id) => ({
          url: `/deleteQuote/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Quote"],
      }),
      assignDriverAndVehicleToQuote: builder.mutation<
        void,
        AssignDriverAndVehicleToQuoteInterface
      >({
        query({ quote_ID, vehicle_ID, driver_ID }) {
          return {
            url: "/assignDriverAndVehicleToQuote",
            method: "POST",
            body: { quote_ID, vehicle_ID, driver_ID },
          };
        },
        invalidatesTags: ["Quote", "AssignDriverAndVehicleToQuoteInterface"],
      }),
    };
  },
});

export const {
  useGetAllQuoteQuery,
  useAddSendBookEmailMutation,
  useAddAssignDriverMutation,
  useGetQuoteByIdQuery,
  useAddDriverToQuoteMutation,
  useAddVehicleToQuoteMutation,
  useUpdateStatusQuoteToCancelMutation,
  useGetQuoteByIdScheduleQuery,
  useDeleteQuoteMutation,
  useAssignDriverAndVehicleToQuoteMutation
} = quoteSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Programm {
  _id?: string;
  programName: string;
  origin_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stops: {
    id: string;
    address: string;
    time: string;
  }[];
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  pickUp_date: string;
  droppOff_date: string;
  freeDays_date: string[];
  exceptDays: string[];
  recommanded_capacity: string;
  extra: string[];
  notes: string;
  dropOff_time: string;
  pickUp_Time: string;
  clientID?: string;
}

export interface SendResponse {
  id: string;
  notes_for_client: string;
  unit_price: string;
  total_price: string;
  program_status: string;
}

export const programmSlice = createApi({
  reducerPath: "programm",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/programm/",
  }),
  tagTypes: ["Programm", "SendResponse"],
  endpoints(builder) {
    return {
      fetchProgramms: builder.query<Programm[], number | void>({
        query() {
          return `/getAllProgramms`;
        },
        providesTags: ["Programm"],
      }),
      fetchProgrammById: builder.query<Programm, string | void>({
        query: (_id) => ({
          url: `/getProgrammById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Programm"],
      }),
      addProgramm: builder.mutation<void, Programm>({
        query(payload) {
          return {
            url: "/newProgramm",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Programm"],
      }),
      sendResponse: builder.mutation<void, SendResponse>({
        query({
          id,
          notes_for_client,
          unit_price,
          total_price,
          program_status,
        }) {
          return {
            url: "/sendResponse",
            method: "POST",
            body: {
              id,
              notes_for_client,
              unit_price,
              total_price,
              program_status,
            },
          };
        },
        invalidatesTags: ["Programm", "SendResponse"],
      }),
    };
  },
});

export const {
  useAddProgrammMutation,
  useFetchProgrammsQuery,
  useFetchProgrammByIdQuery,
  useSendResponseMutation,
} = programmSlice;

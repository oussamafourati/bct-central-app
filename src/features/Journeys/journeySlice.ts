import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Journey {
  _id?: string;
  type: string;
}

export const journeySlice = createApi({
  reducerPath: "journey",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/journey",
  }),
  tagTypes: ["Journey"],
  endpoints(builder) {
    return {
      getAllJourney: builder.query<Journey[], number | void>({
        query() {
          return "/getAllJourneys";
        },
        providesTags: ["Journey"],
      }),
      fetchJourneyById: builder.query<Journey, string | void>({
        query: (_id) => ({
          url: `/getJourneyById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Journey"],
      }),
      addNewJourney: builder.mutation<void, Journey>({
        query(payload) {
          return {
            url: "/newJourney",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Journey"],
      }),
      deleteJourney: builder.mutation<void, Journey>({
        query: (_id) => ({
          url: `/deleteJouney/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Journey"],
      }),
    };
  },
});

export const {
  useGetAllJourneyQuery,
  useAddNewJourneyMutation,
  useDeleteJourneyMutation,
  useFetchJourneyByIdQuery
} = journeySlice;

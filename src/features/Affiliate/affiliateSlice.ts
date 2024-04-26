import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Affiliate {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  fleetNumber: string;
  notes: string;
  address: string;
  statusAffiliate: string;
  enquiryDate: string;
  vehicles: string[];
  region: string[];
}

export interface SendEmailAcceptence {
  id?: string;
  login: string;
  password: string;
  service_date: string;
}

export interface SendEmailRefuse {
  id_aff?: string;
}

export const affiliateSlice = createApi({
  reducerPath: "affiliate",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/affiliate",
  }),
  tagTypes: ["Affiliate", "SendEmailAcceptence", "SendEmailRefuse"],
  endpoints(builder) {
    return {
      getAllAffiliates: builder.query<Affiliate[], number | void>({
        query() {
          return "/getAllAffiliates";
        },
        providesTags: ["Affiliate"],
      }),
      fetchAffiliateById: builder.query<Affiliate, string | void>({
        query: (_id) => ({
          url: `/getAffiliate/${_id}`,
          method: "GET",
        }),
        providesTags: ["Affiliate"],
      }),
      updateAffiliateStatus: builder.mutation<void, SendEmailAcceptence>({
        query: ({ id, login, password, service_date }) => ({
          url: `/acceptenceEmail`,
          method: "Post",
          body: {
            id,
            login,
            password,
            service_date,
          },
        }),
        invalidatesTags: ["Affiliate", "SendEmailAcceptence"],
      }),
      refuseAffiliate: builder.mutation<void, SendEmailRefuse>({
        query: ({ id_aff }) => ({
          url: `/refuseEmail`,
          method: "Post",
          body: {
            id_aff,
          },
        }),
        invalidatesTags: ["Affiliate", "SendEmailRefuse"],
      }),
      deleteAffiliate: builder.mutation<void, Affiliate>({
        query: (_id) => ({
          url: `/deleteAffiliate/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Affiliate"],
      }),
    };
  },
});

export const {
  useDeleteAffiliateMutation,
  useGetAllAffiliatesQuery,
  useUpdateAffiliateStatusMutation,
  useRefuseAffiliateMutation,
  useFetchAffiliateByIdQuery,
} = affiliateSlice;

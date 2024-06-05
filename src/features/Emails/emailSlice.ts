import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Email {
  _id?: string;
  name: string;
  body: string;
  for_who?: string;
}

export interface NewEmail {
  newEmail: string;
  subject: string;
  body: string;
  file?: string
  sender?: string
  name?: string
}

export const emailSlice = createApi({
  reducerPath: "email",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/emailTemplate",
  }),
  tagTypes: ["Email", "NewEmail"],
  endpoints(builder) {
    return {
      getAllEmail: builder.query<Email[], number | void>({
        query() {
          return "/getAllEmailTemplates";
        },
        providesTags: ["Email"],
      }),
      fetchEmailById: builder.query<Email, string | void>({
        query: (_id) => ({
          url: `/getEmailTemplate/${_id}`,
          method: "GET",
        }),
        providesTags: ["Email"],
      }),
      addNewEmail: builder.mutation<void, Email>({
        query(payload) {
          return {
            url: "/newEmailTemplate",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Email"],
      }),
      updateEmailTemplate: builder.mutation<void, Email>({
        query: ({ _id, ...rest }) => ({
          url: `/updateEmailTemplate/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Email"],
      }),
      deleteEmail: builder.mutation<void, Email>({
        query: (_id) => ({
          url: `/deleteEmailTemplate/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Email"],
      }),
      sendNewEmail: builder.mutation<void, NewEmail>({
        query({
          newEmail,
          subject,
          body,
          file,
          sender,
          name
        }) {
          return {
            url: "/sendNewEmail",
            method: "POST",
            body: {
              newEmail,
              subject,
              body,
              file,
              sender,
              name
          },
          };
        },
        invalidatesTags: ["NewEmail"],
      }),
    };
  },
});

export const {
  useAddNewEmailMutation,
  useDeleteEmailMutation,
  useFetchEmailByIdQuery,
  useUpdateEmailTemplateMutation,
  useGetAllEmailQuery,
  useSendNewEmailMutation
} = emailSlice;

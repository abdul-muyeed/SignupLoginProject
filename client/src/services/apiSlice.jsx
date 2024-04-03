import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "authApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    mode: "cors",
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/profile",
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    verifyMail: builder.mutation({
      query: (body) => ({
        url: "/auth/verifymail",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: "/auth/verification",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgotpassword",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/resetpassword",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      InvalidatesTags: ["auth"],
    }),
    logout: builder.query({
      query: () => "/auth/logout",
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useVerifyMailMutation,
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useLogoutQuery
} = apiSlice;

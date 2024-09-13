import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { IUser, InputUser } from "./types"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
  tagTypes: ["Users", "editUser"],
  endpoints: builder => ({
    getUsers: builder.query<IUser[], null>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUserById: builder.query<IUser, string>({
      query: id => `/users/${id}`,
      providesTags: ["editUser"],
    }),
    addUser: builder.mutation<IUser, InputUser>({
      query: param => ({
        url: "/users",
        method: "POST",
        body: param,
      }),
      invalidatesTags: ["Users"],
    }),
    editUser: builder.mutation<IUser, IUser>({
      query: param => ({
        url: `/users/${param.id}`,
        method: "PATCH",
        body: param,
      }),
      invalidatesTags: ["Users", "editUser"],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useEditUserMutation,
} = usersApi

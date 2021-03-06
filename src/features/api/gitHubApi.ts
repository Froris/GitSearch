import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRepo, UserSearchResult } from "./types";

export const gitHubApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    getUser: builder.query<UserSearchResult, string>({
      query: (name) => ({
        url: "search/users",
        params: {
          q: name,
          sort: "followers",
          order: "desc",
          per_page: 20,
        },
      }),
    }),
    getUserRepos: builder.query<UserRepo[], string>({
      query: (name) => ({
        url: `users/${name}/repos`,
        params: {
          sort: "created",
          direction: "asc",
          per_page: 100,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserReposQuery } = gitHubApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_KEY_NEW } from "../../api/api";

export const searchApi = createApi({
  reducerPath: "search",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/search",
  }),
  endpoints: (builder) => ({
    getSearchVideos: builder.query({
      query: (queryParams) =>
        `?part=snippet&maxResults=25&q=${queryParams}&regionCode=ID&key=${VITE_API_KEY_NEW}`,
    }),
  }),
});

export const { useGetSearchVideosQuery } = searchApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_KEY_NEW } from "../../api/api";

export const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/commentThreads",
  }),
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: (id) =>
        `?part=snippet%2Creplies&maxResults=25&videoId=${id}&key=${VITE_API_KEY_NEW}`,
      transformResponse: (response) => {
        const data = response.items;
        return data;
      },
    }),
  }),
});

export const { useGetAllCommentsQuery } = commentApi;

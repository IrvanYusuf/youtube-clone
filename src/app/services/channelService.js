import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_KEY_NEW } from "../../api/api";

export const channelApi = createApi({
  reducerPath: "channel",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/channels",
  }),
  endpoints: (builder) => ({
    getChannelDetail: builder.query({
      query: (channelId) =>
        `?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${VITE_API_KEY_NEW}`,
      transformResponse: (response) => {
        const [data] = response.items;
        return data;
      },
    }),
  }),
});

export const { useGetChannelDetailQuery } = channelApi;

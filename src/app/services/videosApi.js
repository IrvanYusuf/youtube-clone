import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_KEY_NEW } from "../../api/api";
import moment from "moment";

export const videosApi = createApi({
  reducerPath: "videos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/videos",
  }),
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: (category) =>
        `?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ID&videoDuration=long&videoCategoryId=${category}&key=${VITE_API_KEY_NEW}`,
      transformResponse: (response) => {
        const data = response.items.map((item) => {
          const duration = moment.duration(item.contentDetails.duration);
          const formattedDuration =
            duration.hours() > 0
              ? moment.utc(duration.asMilliseconds()).format("hh:mm:ss")
              : moment.utc(duration.asMilliseconds()).format("mm:ss");

          return {
            ...item,
            duration: formattedDuration,
          };
        });
        return data;
      },
    }),
    getVideoDetail: builder.query({
      query: (videoId) =>
        `?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${VITE_API_KEY_NEW}`,
      transformResponse: (response) => {
        const [data] = response.items;
        return data;
      },
    }),
    getAllVideoDetailSearch: builder.query({
      query: (queryParam) =>
        `?part=snippet%2CcontentDetails%2Cstatistics&id=${queryParam}&key=${VITE_API_KEY_NEW}`,
    }),
  }),
});

export const {
  useGetAllVideosQuery,
  useGetVideoDetailQuery,
  useGetAllVideoDetailSearchQuery,
} = videosApi;

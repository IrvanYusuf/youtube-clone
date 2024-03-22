import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import CardVideo from "../components/CardVideo";
import { useGetAllVideosQuery } from "../app/services/videosApi";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";

const PageVideos = ({ category }) => {
  const [panjang, setPanjang] = useState(20);
  // Memanggil hook data video
  const {
    data: videos,
    isLoading: loading,
    isError: error,
  } = useGetAllVideosQuery(category);

  if (loading) {
    // Jika masih loading, tampilkan skeleton
    return (
      <Stack width={"100%"}>
        <Grid container>
          {Array.from({ length: panjang }, (v, i) => (
            <Grid
              item
              key={i}
              sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}
              padding={"10px"}
            >
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }

  return (
    <Box>
      <Grid container>
        {videos?.map((video, i) => (
          <Grid
            item
            padding={"10px"}
            sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}
            key={i}
          >
            <CardVideo
              id={video.id}
              videoTitle={video?.snippet?.title}
              channelTitle={video?.snippet?.channelTitle}
              videoThumbnail={video?.snippet?.thumbnails?.high.url}
              view={video?.statistics?.viewCount}
              published={video?.snippet?.publishedAt}
              duration={video?.duration}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PageVideos;

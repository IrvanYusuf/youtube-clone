import { Box, Grid, Stack } from "@mui/material";
import CardVideoRecomended from "../components/CardVideoRecomended";
import { useGetAllVideosQuery } from "../app/services/videosApi";
import SkeletonCardRecomended from "../components/SkeletonCardRecomended";

const RecomendedVideos = ({ categoryId }) => {
  const {
    data: recomendedVideos,
    isLoading,
    isError,
  } = useGetAllVideosQuery(categoryId);

  if (isLoading) {
    return (
      <Stack width={"100%"}>
        <Grid container>
          {Array.from({ length: 20 }, (v, i) => (
            <Grid item key={i} sx={{ width: "100%" }} padding={"10px"}>
              <SkeletonCardRecomended />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }
  return (
    <Box>
      {recomendedVideos?.map((video, i) => (
        <CardVideoRecomended
          key={i}
          img={video.snippet.thumbnails.high.url}
          title={video.snippet.title}
          channelTitle={video.snippet.channelTitle}
          url={video.id}
          duration={video.duration}
          publish={video.snippet.publishedAt}
          views={video.statistics.viewCount}
        />
      ))}
    </Box>
  );
};

export default RecomendedVideos;

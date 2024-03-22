import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useGetSearchVideosQuery } from "../app/services/searchService";
import { useGetAllVideoDetailSearchQuery } from "../app/services/videosApi";
import {
  handleFormatDate,
  handleFormatDuration,
  handleFormatView,
} from "../utils/utils";
import BadgeStatusLive from "../components/BadgeStatusLive";
import { useSelector } from "react-redux";

const SearchVideos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  const isMobile = useMediaQuery("(max-width:431px)");
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const {
    data: dataSearch,
    isLoading,
    isError,
  } = useGetSearchVideosQuery(query);

  const multipleVideoId = dataSearch?.items?.map((video) => video?.id?.videoId);

  const {
    data: dataVideo,
    isLoading: loading,
    isError: error,
  } = useGetAllVideoDetailSearchQuery(multipleVideoId);

  const mergedData = dataSearch?.items.map((searchItem) => {
    const videoDetail = dataVideo?.items.filter(
      (video) => video.id == searchItem.id.videoId
    );
    return {
      id: searchItem.id.videoId,
      img: searchItem.snippet.thumbnails.high.url,
      channelTitle: searchItem.snippet.channelTitle,
      desc: searchItem.snippet.description,
      title: searchItem.snippet.title,
      duration: videoDetail[0]?.contentDetails.duration,
      viewCount: videoDetail[0]?.statistics.viewCount,
      publish: searchItem.snippet.publishedAt,
      isLive: searchItem.snippet.liveBroadcastContent,
    };
  });

  const Image = styled("img")({
    objectFit: "cover",
    borderRadius: "20px",
    width: "100%",
    height: "300px",
    "@media (max-width: 600px)": {
      borderRadius: "0",
    },
  });

  return (
    <Container
      sx={{ marginTop: { xs: "60px", sm: "60px", md: "80px" }, padding: 0 }}
    >
      {mergedData?.map((video, i) => (
        <Link
          style={{ textDecoration: "none" }}
          to={video.id ? `/watch/${video.id}` : ""}
          key={i}
        >
          <Card sx={{ marginBottom: "10px" }} elevation={0}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <Box sx={{ position: "relative" }}>
                  <Image src={video.img} alt="video-img" />
                  {video.isLive == "none" ? (
                    <Paper
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "0px 2px",
                        display: "inline-block",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: 20,
                        right: 10,
                      }}
                    >
                      <Typography fontSize={"14px"}>
                        {handleFormatDuration(video.duration)}
                      </Typography>
                    </Paper>
                  ) : (
                    <Paper
                      sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        padding: "0px 2px",
                        display: "inline-block",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: 20,
                        right: 10,
                      }}
                    >
                      <BadgeStatusLive />
                    </Paper>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={7} sx={{ paddingLeft: { md: 2 } }}>
                <Box
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "block" },
                    flexDirection: { xs: "row-reverse", sm: "row-reverse" },
                    justifyContent: "start",
                    columnGap: 1,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight={400}
                      fontSize={"18px"}
                      color={darkMode ? "white" : "black"}
                    >
                      {isMobile
                        ? `${video.title.substring(0, 50)}....`
                        : video.title}
                    </Typography>
                    {video.id && (
                      <Typography fontSize={"14px"}>
                        {isMobile && video.channelTitle}{" "}
                        {isMobile && <>&bull;</>}{" "}
                        {handleFormatView(video.viewCount)} x ditonton{" "}
                        <Typography component={"span"} fontSize={"14px"}>
                          {isMobile && <>&bull;</>}{" "}
                          {handleFormatDate(video.publish)}
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    columnGap={1}
                    marginY={1.5}
                  >
                    <Avatar></Avatar>
                    <Typography
                      fontSize={"14px"}
                      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    >
                      {video.channelTitle}
                    </Typography>
                  </Stack>
                </Box>
                <Typography
                  fontSize={"12px"}
                  sx={{ display: { xs: "none", sm: "none" } }}
                >
                  {video.desc}
                </Typography>
                {!isMobile && video.isLive == "live" && <BadgeStatusLive />}
              </Grid>
            </Grid>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default SearchVideos;

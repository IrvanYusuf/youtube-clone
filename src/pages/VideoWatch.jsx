import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CardSponsor from "../components/CardSponsor";
import { Bookmark, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import DialogShare from "../components/DialogShare";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  handleFormatDate,
  handleFormatView,
  scrollToTop,
} from "../utils/utils";
import RecomendedVideos from "./RecomendedVideos";
import Komentar from "../components/Komentar";
import { useGetVideoDetailQuery } from "../app/services/videosApi";
import { useGetChannelDetailQuery } from "../app/services/channelService";
import { useDispatch, useSelector } from "react-redux";
import { savedVideo } from "../app/features/videoSavedSlice";

const VideoWatch = () => {
  const [open, setOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [isSubscribe, setIsSubcribe] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();
  const [collapseText, setCollapseText] = useState(false);
  const descriptionRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:431px)");
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const getVideos = useSelector((state) => state.videoSaved.videoSaved);

  const handleSavedVideo = (video, channel) => {
    const newSavedVideo = {
      id: id,
      title: video.snippet.title,
      avatarChannel: channel.snippet.thumbnails.default.url,
      videoThubmnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      subscriberCount: channel.statistics.subscriberCount,
      viewsCount: video.statistics.viewCount,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      isSaved: !isSaved,
    };
    setIsSaved(!isSaved);
    dispatch(savedVideo(newSavedVideo));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCollapseText = () => {
    setCollapseText(!collapseText);
  };

  const {
    data: videoDetail,
    isLoading,
    isError,
    isSuccess,
  } = useGetVideoDetailQuery(id);
  const {
    data: channelDetail,
    isLoading: loadingChannel,
    isError: errorChannel,
  } = useGetChannelDetailQuery(videoDetail?.snippet?.channelId);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.offsetHeight;
      // Lakukan pengecekan berdasarkan tinggi
      if (height > 72) {
        setCollapseText(true);
      }
    }
  }, [videoDetail]);

  useEffect(() => {
    const checkIdVideo = getVideos.some((video) => video.id == id);
    setIsSaved(checkIdVideo);
  }, [id, dispatch]);

  // if (isSuccess) {
  //   scrollToTop();
  // }

  return (
    <Container sx={{ marginTop: "80px" }}>
      {/* <Container> */}
      <Grid container>
        <Grid item xs={12} md={7.5}>
          <Card
            sx={{
              maxWidth: "100%",
              display: "block",
            }}
            elevation={0}
          >
            <CardMedia sx={{ position: "relative" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                width={"100%"}
                height={"400px"}
                controls={true}
                playing
              />
            </CardMedia>
            <CardContent sx={{ padding: 0 }}>
              <Typography
                sx={{ fontSize: { xs: "18px", sm: "18px", md: "20px" } }}
                color={darkMode ? "white" : "black"}
                marginTop={"10px"}
                fontWeight={"700"}
              >
                {videoDetail?.snippet?.title}
              </Typography>
              <Stack direction={{ xs: "column-reverse", md: "column" }}>
                <Box>
                  <Stack
                    direction={{ sm: "column", md: "row" }}
                    alignItems={{ sm: "start", md: "center" }}
                    width={"100%"}
                    marginTop={"10px"}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={{
                        xs: "space-between",
                        sm: "space-between",
                      }}
                      spacing={2}
                      flex={1.4}
                    >
                      <Stack direction={"row"} spacing={1}>
                        <Avatar
                          src={channelDetail?.snippet?.thumbnails?.default?.url}
                        ></Avatar>
                        <Box>
                          <Typography
                            fontSize={"16px"}
                            color={darkMode ? "white" : "black"}
                            fontWeight={500}
                          >
                            {videoDetail?.snippet?.channelTitle}
                          </Typography>
                          <Typography fontSize={"14px"} color={"grey"}>
                            {handleFormatView(
                              Number(channelDetail?.statistics?.subscriberCount)
                            )}{" "}
                            subscriber
                          </Typography>
                        </Box>
                      </Stack>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: darkMode ? "white" : "black",
                          "&:hover": {
                            backgroundColor: "#2e2e2e",
                          },
                        }}
                        onClick={() => setIsSubcribe(!isSubscribe)}
                      >
                        {isSubscribe ? "Unsubscribe" : "Subscribe"}
                      </Button>
                    </Stack>
                    <Stack
                      direction={"row"}
                      marginLeft={"30px"}
                      justifyContent={"end"}
                      flex={1.5}
                      spacing={3}
                      marginTop={"10px"}
                    >
                      <Box
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleSavedVideo(videoDetail, channelDetail)
                          }
                        >
                          <Bookmark sx={{ color: isSaved && "yellow" }} />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          color: "text.secondary",
                          "& svg": {
                            m: 1,
                          },
                        }}
                      >
                        <IconButton
                          direction={"row"}
                          alignItems={"center"}
                          sx={{ cursor: "pointer", padding: 0 }}
                          onClick={() => setIsLike(!isLike)}
                        >
                          <ThumbUp color={isLike ? "primary" : ""} />
                          <Typography>
                            {handleFormatView(
                              videoDetail?.statistics?.likeCount
                            )}
                          </Typography>
                        </IconButton>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                          sx={{ marginX: "4px" }}
                        />
                        <IconButton
                          sx={{ cursor: "pointer", padding: 0 }}
                          onClick={() => setIsDislike(!isDislike)}
                        >
                          <ThumbDown color={isDislike ? "error" : ""} />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          color: "text.secondary",
                          "& svg": {
                            m: 1,
                          },
                        }}
                      >
                        <IconButton
                          sx={{ cursor: "pointer", padding: 0 }}
                          onClick={() => setOpen(true)}
                        >
                          <Share />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    marginTop: "10px",
                    padding: "14px",
                    borderRadius: "4px",
                  }}
                  bgcolor={darkMode ? "#272829" : "#eceff1"}
                >
                  <Typography
                    fontSize={"14px"}
                    color={darkMode ? "rgba(255,255,255,0.8)" : "black"}
                    fontWeight={500}
                  >
                    {handleFormatView(
                      Number(videoDetail?.statistics?.viewCount)
                    )}{" "}
                    x ditonton{" "}
                    {handleFormatDate(videoDetail?.snippet?.publishedAt)}
                  </Typography>
                  <Box ref={descriptionRef}>
                    <Typography
                      sx={{ whiteSpace: "pre-wrap" }}
                      fontSize={"14px"}
                      color={darkMode && "rgba(255,255,255,0.7)"}
                    >
                      {collapseText && isMobile
                        ? `${videoDetail?.snippet?.localized.description.substring(
                            0,
                            50
                          )}...`
                        : collapseText
                        ? `${videoDetail?.snippet?.localized.description.substring(
                            0,
                            100
                          )}...`
                        : videoDetail?.snippet?.localized.description}
                    </Typography>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={500}
                      sx={{ cursor: "pointer" }}
                      onClick={handleCollapseText}
                    >
                      {collapseText ? "Lainnya" : "Lihat Lebih Sedikit"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Komentar />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4.5}
          sx={{ paddingLeft: { md: "30px", sm: "0", xs: "0" } }}
        >
          <Box marginBottom={"20px"}>
            <CardSponsor />
          </Box>
          <RecomendedVideos categoryId={videoDetail?.snippet?.categoryId} />
        </Grid>
      </Grid>
      {/* </Container> */}
      <DialogShare handleClose={handleClose} open={open} />
    </Container>
  );
};

export default VideoWatch;

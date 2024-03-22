import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { handleFormatDate, handleFormatView } from "../utils/utils";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

const StyledImage = styled("img")({
  objectFit: "cover",
  width: "100%",
  borderRadius: "10px",
  height: "130px",
  marginBottom: "10px",
  "@media (max-width: 600px)": {
    // Contoh media query untuk lebar layar minimal 600px
    height: "300px",
  },
});

const CardVideo = ({
  id,
  videoTitle = "lll",
  channelTitle = "0",
  videoThumbnail = "p",
  view = "p",
  published = "m",
  duration,
}) => {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 431px)" });
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  return (
    <Link style={{ textDecoration: "none" }} to={`/watch/${id}`}>
      <Card
        sx={{
          maxWidth: "100%",
          display: "block",
        }}
        elevation={0}
      >
        <CardMedia sx={{ position: "relative" }}>
          <StyledImage src={videoThumbnail} alt="image video" loading="lazy" />
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
            <Typography fontSize={"14px"}>{duration}</Typography>
          </Paper>
        </CardMedia>
        <CardContent
          sx={{
            padding: {
              xs: "0px 0px 0px 0px",
              sm: "0px 0px 0px 0px",
            },
          }}
        >
          <Stack direction={"row"}>
            <Avatar
              sx={{ marginRight: "4px", display: { xs: "flex", md: "none" } }}
            ></Avatar>
            <Box>
              <Tooltip title={videoTitle}>
                <Typography
                  fontSize={"18px"}
                  color={darkMode ? "white" : "black"}
                >
                  {videoTitle.length > 30
                    ? `${videoTitle.substring(0, 30)}...`
                    : videoTitle}
                </Typography>
              </Tooltip>
              <Typography fontSize={"14px"} color={"grey"} fontWeight={"400"}>
                {channelTitle && channelTitle}
                {isMobileScreen ? " - " : <br />}
                <Typography component={"span"} fontSize={"14px"} color={"grey"}>
                  {handleFormatView(Number(view))} x ditonton
                </Typography>
                {isMobileScreen ? " - " : <br />}
                <Typography component={"span"} fontSize={"14px"} color={"grey"}>
                  {handleFormatDate(published)}
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardVideo;

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
import { handleFormatDate, handleFormatView, scrollToTop } from "../utils/utils";
import { useSelector } from "react-redux";

const StyledImage = styled("img")({
  objectFit: "cover",
  width: "200px",
  borderRadius: "10px",
  height: "130px",
  marginBottom: "10px",
  "@media (max-width: 600px)": {
    // Contoh media query untuk lebar layar minimal 600px
    width: "100%",
    height: "300px",
  },
});



const CardVideoRecomended = ({
  url,
  img,
  title,
  channelTitle,
  duration,
  publish,
  views,
}) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/watch/${url}`}
      onClick={scrollToTop}
    >
      <Card
        sx={{
          maxWidth: "100%",
          display: { xs: "block", sm: "block", md: "flex" },
        }}
        elevation={0}
      >
        <CardMedia sx={{ position: "relative" }}>
          <StyledImage src={img} alt="" />
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
              md: "0px 0px 0px 10px",
            },
            flexGrow: 1,
          }}
        >
          <Stack direction={"row"}>
            <Avatar
              sx={{
                marginRight: "4px",
                display: { md: "none" },
              }}
            ></Avatar>
            <Box>
              <Tooltip title={title}>
                <Typography
                  fontSize={"15px"}
                  color={darkMode ? "white" : "black"}
                >
                  {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                </Typography>
              </Tooltip>
              <Stack
                direction={{ xs: "row", sm: "row", md: "column" }}
                columnGap={"6px"}
                alignItems={"start"}
                fontSize={"10px"}
              >
                <Typography fontSize={"14px"} color={"grey"}>
                  {channelTitle.length > 30
                    ? `${channelTitle.substring(0, 30)}...`
                    : channelTitle}
                </Typography>
                <Box
                  sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                >
                  -
                </Box>
                <Typography fontSize={"14px"} color={"grey"}>
                  {handleFormatView(Number(views))} x ditonton
                </Typography>
                <Box
                  sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                >
                  -
                </Box>
                <Typography fontSize={"14px"} color={"grey"}>
                  {handleFormatDate(publish)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardVideoRecomended;

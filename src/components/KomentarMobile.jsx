import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  OutlinedInput,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CardComment from "./CardComment";
import { useSelector } from "react-redux";

const KomentarMobile = ({ dataComments }) => {
  const [open, setOpen] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const comment =
    dataComments &&
    dataComments[0]?.snippet?.topLevelComment?.snippet?.textDisplay;
  return (
    <div>
      <Box
        bgcolor={darkMode ? "#272829" : "#eceff1"}
        sx={{ padding: "14px", borderRadius: "4px" }}
        onClick={() => setOpen(true)}
      >
        <Typography>Komentar {dataComments?.length}</Typography>
        <Stack
          marginTop={1}
          direction={"row"}
          alignItems={"center"}
          columnGap={1}
        >
          <Avatar
            sx={{ fontSize: "16px" }}
            src={
              dataComments &&
              dataComments[0].snippet.topLevelComment.snippet
                .authorProfileImageUrl
            }
          ></Avatar>
          <Typography>
            {dataComments && `${comment.substring(0, 40)}...`}
          </Typography>
        </Stack>
      </Box>
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="bottom"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          height={"450px"}
          width={"100%"}
          //   p={2}
          sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        >
          <Stack
            paddingX={2}
            // direction={"row"}
            position={"fixed"}
            bgcolor={darkMode ? "#272829" : "#eceff1"}
            left={0}
            right={0}
            zIndex={3}
          >
            <Box
              textAlign={"center"}
              display={"flex"}
              justifyContent={"center"}
              marginY={2}
            >
              <Box
                height={"6px"}
                width={"70px"}
                bgcolor={"#D0D4CA"}
                borderRadius={"8px"}
              ></Box>
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              left={0}
              right={0}
              bgcolor={darkMode ? "#272829" : "#eceff1"}
            >
              <Typography>Komentar 447</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <Close sx={{ fontSize: "30px" }} />
              </IconButton>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: "50px" }} />
          <Box padding={2}>
            <Stack
              direction={"row"}
              marginTop={3}
              alignItems={"center"}
              columnGap={1}
            >
              <Avatar></Avatar>
              <OutlinedInput
                fullWidth
                placeholder="Buat Komentar...."
                onFocus={() => setCommentFocus(true)}
              />
            </Stack>
            {commentFocus && (
              <Stack
                direction={"row"}
                justifyContent={"end"}
                columnGap={2}
                marginY={2}
              >
                <Button
                  sx={{
                    borderRadius: "4px",
                    padding: "2px",
                    height: "40px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.1)",
                    },
                  }}
                  variant="text"
                >
                  Batal
                </Button>
                <Button
                  sx={{
                    borderRadius: "4px",
                    padding: "10px",
                    height: "40px",
                    color: "white",
                  }}
                  variant="contained"
                >
                  Komentar
                </Button>
              </Stack>
            )}
            <Divider sx={{ marginY: 2 }} />
            {dataComments?.map((comment, i) => (
              <CardComment
                key={i}
                message={comment.snippet.topLevelComment.snippet.textDisplay}
                authorName={
                  comment.snippet.topLevelComment.snippet.authorDisplayName
                }
                profileUser={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                likeCount={comment.snippet.topLevelComment.snippet.likeCount}
                publishedAt={
                  comment.snippet.topLevelComment.snippet.publishedAt
                }
              />
            ))}
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default KomentarMobile;

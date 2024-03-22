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
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import BuatKomentar from "./BuatKomentar";
import CardComment from "./CardComment";
import { useGetAllCommentsQuery } from "../app/services/commentService";
import { useParams } from "react-router-dom";
import KomentarMobile from "./KomentarMobile";

const Komentar = () => {
  const { id } = useParams();
  const { data: dataComments, isLoading, isError } = useGetAllCommentsQuery(id);
  const isMobile = useMediaQuery("(max-width:431px)");

  return (
    <Box marginTop={"10px"}>
      {!isMobile ? (
        <Stack>
          <Box>
            <Typography fontWeight={700} fontSize={"18px"}>
              {dataComments?.length} Komentar
            </Typography>
          </Box>
          <BuatKomentar />
          <Stack marginTop={"30px"} rowGap={2.4}>
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
          </Stack>
        </Stack>
      ) : (
        <KomentarMobile dataComments={dataComments} />
      )}
    </Box>
  );
};

export default Komentar;

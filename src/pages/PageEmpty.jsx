import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import EmptyGif from "../assets/empty-gif.gif";

const PageEmpty = () => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} minHeight={"80vh"}>
      <img src={EmptyGif} alt="empty gif" />
      <Typography>Belum ada video tersimpan</Typography>
    </Stack>
  );
};

export default PageEmpty;

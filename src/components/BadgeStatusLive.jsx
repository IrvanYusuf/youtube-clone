import { Sensors } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const BadgeStatusLive = () => {
  return (
    <Box
      bgcolor={"#cc0000e6"}
      display={"inline-flex"}
      padding={"2px 4px"}
      marginTop={1}
      direction={"row"}
      columnGap={"4px"}
      borderRadius={"4px"}
      alignItems={"center"}
    >
      <Sensors sx={{ color: "white", fontSize: "16px" }} />
      <Typography color={"white"} fontSize={"14px"}>
        Live
      </Typography>
    </Box>
  );
};

export default BadgeStatusLive;

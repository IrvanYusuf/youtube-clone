import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <Box>
      <Skeleton variant="rounded" width="100%" height={"130px"} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" height={"20px"} />
      <Skeleton variant="text" width="70%" height={"20px"} />
      <Skeleton variant="text" width="50%" height={"20px"} />
    </Box>
  );
};

export default SkeletonCard;

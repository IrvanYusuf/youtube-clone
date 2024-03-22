import { Box, Card, Skeleton, Stack } from "@mui/material";
import React from "react";

const SkeletonCardRecomended = () => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        display: { xs: "block", sm: "block", md: "flex" },
        columnGap: 1,
      }}
      elevation={0}
    >
      <Skeleton
        variant="rounded"
        sx={{ width: { xs: "100%", sm: "100%", md: "350px" } }}
        height={"130px"}
      />
      <Box width={"100%"}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" height={"20px"} />
        <Skeleton variant="text" width="70%" height={"20px"} />
        <Skeleton variant="text" width="50%" height={"20px"} />
      </Box>
    </Card>
  );
};

export default SkeletonCardRecomended;

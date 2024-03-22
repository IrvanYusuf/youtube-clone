import React, { useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import {
  Code,
  DirectionsCar,
  LiveTv,
  MusicNote,
  Newspaper,
  SportsBaseball,
  SportsEsports,
} from "@mui/icons-material";
import PageVideos from "../pages/PageVideos";

const LayoutRoot = () => {
  const categories = [
    {
      id: "10",
      name: "Musik",
      icon: <MusicNote />,
    },
    {
      id: "20",
      name: "Game",
      icon: <SportsEsports />,
    },
    { id: "28", name: "Teknologi", icon: <Code /> },
    { id: "2", name: "Kendaraan", icon: <DirectionsCar /> },
    { id: "17", name: "Olahraga", icon: <SportsBaseball /> },
    { id: "25", name: "Berita", icon: <Newspaper /> },
    { id: "24", name: "Hiburan", icon: <LiveTv /> },
  ];

  const [category, setCategory] = useState("10");

  const handleSetCategory = (newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: { sm: "column", md: "row" },
          marginTop: { xs: "60px", sm: "60px", md: "80px" },
        }}
      >
        <Stack
          sx={{
            position: { xs: "static", sm: "static", md: "fixed" },
            // top: 0,
            left: 10,
            // bgcolor: "white",
            minheight: "100vh",
            maxWidth: "100%",
          }}
          // justifyContent={"center"}
          // alignItems={"center"}
        >
          <Stack
            // justifyContent={"center"}
            // alignItems={"center"}
            sx={{
              flexDirection: { xs: "row", sm: "row", md: "column" },
              overflowX: "auto",
              // maxWidth: { xs: "70%", sm: "100%" },
            }}
            columnGap={1}
            rowGap={1}
          >
            {categories.map((cat, i) => (
              <Button
                onClick={() => handleSetCategory(cat.id)}
                sx={{
                  textDecoration: "none",
                  color: cat.id == category ? "#B80000" : "grey",
                }}
                key={i}
              >
                <Stack alignItems={"center"} spacing={"4px"}>
                  {cat.icon}
                  <Typography
                    fontSize={"10px"}
                    fontWeight={cat.name == category ? "bold" : ""}
                  >
                    {cat.name}
                  </Typography>
                </Stack>
              </Button>
            ))}
          </Stack>
        </Stack>
        <Divider sx={{ display: { xs: "block", sm: "block", md: "none" } }} />
        <Box
          display={"flex"}
          flex={9}
          sx={{ marginLeft: { sm: "0px", md: "90px" } }}
        >
          <PageVideos category={category} />
        </Box>
      </Stack>
    </Box>
  );
};

export default LayoutRoot;

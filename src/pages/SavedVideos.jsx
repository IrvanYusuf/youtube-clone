import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardVideo from "../components/CardVideo";
import { handleFormatDuration } from "../utils/utils";

const SavedVideos = () => {
  const video = useSelector((state) => state.videoSaved.videoSaved);
  const [videos, setVideos] = useState(video);
  useEffect(() => {
    setVideos(video);
  }, [video.length]);
  return (
    <Container sx={{ marginTop: "80px" }}>
      <Grid container>
        {videos?.map((video, i) => (
          <Grid
            item
            padding={"10px"}
            sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}
            key={i}
          >
            <CardVideo
              id={video.id}
              videoTitle={video?.title}
              channelTitle={video?.channelTitle}
              videoThumbnail={video?.videoThubmnail}
              view={video.viewsCount}
              published={video.publishedAt}
              duration={handleFormatDuration(video.duration)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SavedVideos;

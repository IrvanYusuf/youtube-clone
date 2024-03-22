import {
  FlagOutlined,
  MoreVert,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { handleFormatDate, regexComment } from "../utils/utils";

const CardComment = ({
  authorName,
  message,
  profileUser,
  likeCount,
  publishedAt,
}) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showMenuReport, setShowMenuReport] = useState(null);
  const open = Boolean(showMenuReport);

  const handleClick = (event) => {
    setShowMenuReport(event.currentTarget);
  };
  const handleClose = () => {
    setShowMenuReport(null);
  };

  const handleMouseEnter = () => {
    setShowIcon(true);
  };

  const handleMouseLeave = () => {
    setShowIcon(false);
  };

  return (
    <Stack
      direction={"row"}
      columnGap={2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
    >
      <Avatar src={profileUser}></Avatar>
      <Box sx={{ maxWidth: { xs: "70%", sm: "70%", md: "85%" } }}>
        <Typography fontSize={"14px"} fontWeight={500}>
          {authorName}{" "}
          <Typography component={"span"} fontSize={"13px"}>
            {handleFormatDate(publishedAt)}
          </Typography>
        </Typography>
        <Typography
          marginTop={"4px"}
          sx={{ whiteSpace: "pre-wrap" }}
          fontSize={"15px"}
        >
          {regexComment(message)}
        </Typography>
        <Stack direction={"row"} columnGap={"10px"}>
          <Stack direction={"row"} alignItems={"center"}>
            <div>
              <IconButton>
                <ThumbUpAltOutlined />
              </IconButton>
            </div>
            <Typography fontSize={"13px"}>{likeCount}</Typography>
          </Stack>
          <div>
            <IconButton>
              <ThumbDownAltOutlined />
            </IconButton>
          </div>
        </Stack>
      </Box>
      <Stack component={"div"} flexGrow={1} alignItems={"end"}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            display: showIcon ? "flex" : "none",
            textAlign: "end",
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          elevation={1}
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={showMenuReport}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <FlagOutlined />
            Laporkan
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default CardComment;

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TagFaces } from "@mui/icons-material";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function EmojiComment() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TagFaces />
      </IconButton>
      <Menu
        elevation={0}
        sx={{ backgroundColor: "transparent" }}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <EmojiPicker
            data={data}
            onEmojiSelect={console.log}
            // onClickOutside={() => anchorEl && setAnchorEl(false)}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}

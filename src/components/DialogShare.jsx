import { Close, Code, Facebook, WhatsApp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const DialogShare = ({ handleClose, open }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography>Bagikan</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"row"} spacing={5}>
          <Stack alignItems={"center"} spacing={1} sx={{ cursor: "pointer" }}>
            <Avatar sx={{ width: "56px", height: "56px" }}>
              <Code sx={{ width: "40px", height: "40px" }} />
            </Avatar>
            <Typography>Sematkan</Typography>
          </Stack>
          <Stack alignItems={"center"} spacing={1} sx={{ cursor: "pointer" }}>
            <Avatar
              sx={{
                width: "56px",
                height: "56px",
                backgroundColor: "#25d366",
              }}
            >
              <WhatsApp sx={{ width: "40px", height: "40px" }} />
            </Avatar>
            <Typography>Whatsapp</Typography>
          </Stack>
          <Stack alignItems={"center"} spacing={1} sx={{ cursor: "pointer" }}>
            <Avatar
              sx={{
                width: "56px",
                height: "56px",
                backgroundColor: "#1877f2",
              }}
            >
              <Facebook sx={{ width: "40px", height: "40px" }} />
            </Avatar>
            <Typography>Facebook</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShare;

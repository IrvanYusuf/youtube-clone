import { Avatar, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import EmojiComment from "./EmojiComment";
import { useSelector } from "react-redux";

const BuatKomentar = () => {
  const [texftFieldCommentFocus, setTexftFieldCommentFocus] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handleFocus = () => {
    setTexftFieldCommentFocus(true);
  };
  return (
    <Stack
      direction={"row"}
      columnGap={"10px"}
      marginTop={"10px"}
      alignItems={"center"}
    >
      <Avatar />
      <Stack flexGrow={1}>
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth
          onFocus={handleFocus}
          placeholder="Buat komentar...."
          onChange={(e) => setCommentValue(e.target.value)}
        />
        {texftFieldCommentFocus && (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginTop={"10px"}
          >
            <EmojiComment />
            <Stack direction={"row"} columnGap={"10px"}>
              <Button
                sx={{
                  borderRadius: "4px",
                  padding: "2px",
                  height: "40px",
                  color: darkMode ? "white" : "black",
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.1)",
                  },
                }}
                variant="text"
                //   size="small"
              >
                Batal
              </Button>
              <Button
                sx={{
                  borderRadius: "4px",
                  padding: "10px",
                  height: "40px",
                  color: "white",
                }}
                variant="contained"
                disabled={!commentValue.trim() ? true : false}
                //   size="small"
              >
                Komentar
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default BuatKomentar;

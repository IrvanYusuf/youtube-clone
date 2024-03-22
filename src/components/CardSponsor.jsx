import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";

const ButtonCustom = styled(Button)({
  padding: "6px 10px",
  borderRadius: "40px",
  // fontSize: "18px",
  "@media (max-width:600px)": {
    fontSize: "10px",
    padding: "10px 12px",
  },
});

const CardSponsor = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia>
        <img
          src="https://source.unsplash.com/blue-and-white-checkered-pattern-KfFmwa7m5VQ"
          alt=""
          height={"100px"}
          style={{ objectFit: "cover", width: "100%" }}
        />
      </CardMedia>
      <CardContent sx={{ padding: "8px 10px" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} columnGap={"10px"}>
            <Avatar
              sx={{
                backgroundColor: "#1b5e20",
                display: { xs: "none", sm: "none", md: "inline-flex" },
              }}
            >
              C
            </Avatar>
            <Box>
              <Typography fontSize={"13px"}>
                Build Job-Ready Data Skills
              </Typography>
              <Typography fontSize={"12px"} position={"relative"}>
                <span
                  style={{
                    color: darkMode ? "white" : "black",
                    fontWeight: "bold",
                    marginRight: "4px",
                  }}
                >
                  Bersponsor
                </span>
                coursera.org/IBM/Data
              </Typography>
            </Box>
          </Stack>
          <Box>
            <ButtonCustom variant="contained" disableElevation>
              Apply Now
            </ButtonCustom>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardSponsor;

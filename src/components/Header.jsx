import {
  AccountCircle,
  Bookmark,
  Close,
  DarkMode,
  LightMode,
  Logout,
  Menu as MenuIcon,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setDarkMode } from "../app/features/darkModeSlice";
import Logo from "../assets/logo.png";

const Header = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(true);
  const [logoOpen, setLogoOpen] = useState(true);
  const [iconSearch, setIconSearch] = useState(true);
  const [iconClose, setIconClose] = useState(false);
  const [ancholEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const open = Boolean(ancholEl);
  const isMobile = useMediaQuery("(max-width:431px)");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`result?search_query=${searchValue}`);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setLogoOpen(false);
    setIconSearch(false);
    setIconClose(true);
  };

  const handleIconClose = () => {
    setSearchOpen(false);
    setLogoOpen(true);
    setIconSearch(true);
    setIconClose(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDarkMode = () => {
    dispatch(setDarkMode(true));
    setIsDarkMode(true);
  };
  const handleLightMode = () => {
    dispatch(setDarkMode(false));
    setIsDarkMode(false);
  };
  useEffect(() => {
    if (isMobile) {
      setSearchOpen(false);
    }
  }, []);

  return (
    <AppBar elevation={0} sx={{ backgroundColor: !darkMode && "white" }}>
      <Toolbar>
        <Stack sx={{ flexGrow: 2 }} direction={"row"} alignItems={"center"}>
          <div>
            <IconButton
              sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          </div>
          {logoOpen && (
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Logo} alt="logo" width={"38px"} />
              <Typography
                color={isDarkMode ? "white" : "black"}
                variant="h6"
                fontWeight={"bold"}
              >
                OurTube
              </Typography>
            </Link>
          )}
          {iconClose && (
            <Close
              sx={{ color: "grey", fontSize: "32px" }}
              onClick={handleIconClose}
            />
          )}
        </Stack>
        {searchOpen && (
          <Box sx={{ flexGrow: 3 }}>
            <form onSubmit={handleSubmit}>
              <OutlinedInput
                size="small"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  paddingLeft: "10px",
                  paddingRight: 0,
                }}
                placeholder="Telusuri"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{
                      backgroundColor: !isDarkMode && "#F6F5F5",
                      paddingY: "20px",
                      paddingX: "10px",
                      borderLeft: "1px solid #B6C4B6",
                      borderRadius: "0px 50px 50px 0px",
                    }}
                  >
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </form>
          </Box>
        )}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"end"}
          sx={{ flexGrow: { xs: 0, sm: 0, md: 2 } }}
        >
          {iconSearch && (
            <Search
              sx={{ color: "grey", fontSize: "32px", display: { md: "none" } }}
              onClick={handleSearchOpen}
            />
          )}
          <IconButton onClick={handleClick}>
            <AccountCircle sx={{ fontSize: "36px" }} />
          </IconButton>
          <Menu anchorEl={ancholEl} open={open} onClose={handleClose}>
            <MenuItem>
              <Avatar sx={{ width: 26, height: 26 }} />
              &nbsp; Profile
            </MenuItem>
            <Link
              to={"/saved"}
              style={{
                textDecoration: "none",
                color: darkMode ? "white" : "black",
              }}
            >
              <MenuItem>
                <Bookmark sx={{ fontSize: "20px", color: "grey" }} />
                &nbsp; Saved
              </MenuItem>
            </Link>
            <Divider />
            {isDarkMode ? (
              <MenuItem onClick={handleLightMode}>
                <LightMode sx={{ fontSize: "20px", color: "grey" }} />
                <>&nbsp;</>Light
              </MenuItem>
            ) : (
              <MenuItem onClick={handleDarkMode}>
                <DarkMode sx={{ fontSize: "20px", color: "grey" }} />
                <>&nbsp;</>Dark
              </MenuItem>
            )}
            <MenuItem>
              <Settings sx={{ fontSize: "20px", color: "grey" }} />
              &nbsp; Settings
            </MenuItem>
            <MenuItem>
              <Logout sx={{ fontSize: "20px", color: "grey" }} />
              &nbsp; Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

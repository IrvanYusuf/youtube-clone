import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutRoot from "./layout/LayoutRoot";
import VideoWatch from "./pages/VideoWatch";
import Header from "./components/Header";
import SearchVideos from "./pages/SearchVideos";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import SavedVideos from "./pages/SavedVideos";

function App() {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LayoutRoot />} />
          <Route path="/watch/:id" element={<VideoWatch />} />
          <Route path="/result" element={<SearchVideos />} />
          <Route path="/saved" element={<SavedVideos />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

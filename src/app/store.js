import { configureStore } from "@reduxjs/toolkit";
import { videosApi } from "./services/videosApi.js";
import { channelApi } from "./services/channelService.js";
import { commentApi } from "./services/commentService.js";
import { searchApi } from "./services/searchService.js";
import darkModeSlice from "./features/darkModeSlice.js";
import videoSavedSlice from "./features/videoSavedSlice.js";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistVideoSavedConfig = {
  key: "savedVideo",
  storage,
};

const persistedVideoSaved = persistReducer(
  persistVideoSavedConfig,
  videoSavedSlice
);

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    videoSaved: persistedVideoSaved,
    // videoSaved: videoSavedSlice,
    [videosApi.reducerPath]: videosApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videosApi.middleware,
      channelApi.middleware,
      commentApi.middleware,
      searchApi.middleware
    ),
});

export const persisStore = persistStore(store);

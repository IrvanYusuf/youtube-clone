import { createSlice } from "@reduxjs/toolkit";

export const videoSavedSlice = createSlice({
  name: "videoSaved",
  initialState: { videoSaved: [] },
  reducers: {
    savedVideo: (state, action) => {
      const existingIndex = state.videoSaved.findIndex(
        (video) => video.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.videoSaved.push(action.payload);
      } else {
        state.videoSaved.splice(existingIndex, 1);
      }
    },
  },
});

export const { savedVideo } = videoSavedSlice.actions;
export default videoSavedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: "Irvan" },
});

export default userSlice.reducer;

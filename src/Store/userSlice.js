// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    userData: (state, action) => {
      const payload = action.payload;
      state.user = { ...payload };
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;

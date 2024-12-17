import { createSlice } from "@reduxjs/toolkit";

const localUserInfo =
  !localStorage.getItem("user") || undefined
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const userID = localStorage.getItem("uid")
  ? JSON.parse(localStorage.getItem("uid"))
  : null;

const initialState = {
  user: {
    userInfo: localUserInfo,
    uid: userID,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user.userInfo));
    },
    logOut: (state) => {
      state.user.userInfo = null;
      localStorage.removeItem("uid");
      localStorage.removeItem("user");
    },
    setUID: (state, action) => {
      state.user.uid = action.payload;
      localStorage.setItem("uid", JSON.stringify(state.user.uid));
    },
  },
});

export const { setCredentials, logOut, setUID } = authSlice.actions;
export default authSlice.reducer;

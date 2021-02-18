import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

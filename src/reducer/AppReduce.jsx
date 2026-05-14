import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

export const fetchUser = createAsyncThunk(
  "fetchUser",

  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const data = response.data;

    return data;
  }
);

export const postUser = createAsyncThunk(
  "postUser",

  async (newUser) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newUser
    );

    const data = response.data;

    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //post user

    builder.addCase(postUser.fulfilled, (state, action) => {
      state?.users.unshift(action?.payload);
    });
  }
});

export default userSlice.reducer;

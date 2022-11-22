import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin, getUserDetails, userLogout } from './userActions'

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = payload?.data
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // logout user
    [userLogout.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogout.fulfilled]: (state) => {
      state.loading = false
      state.success = true
      state.userInfo = null
    },
    [userLogout.rejected]: (state) => {
      state.loading = false
      state.success = false
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = payload?.data
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false
    },
  },

})

export const { logout } = userSlice.actions

export default userSlice.reducer

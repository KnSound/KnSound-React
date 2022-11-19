import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../app/interceptors/axios'


export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { headers, data } = await axios.post(
        'auth/users/sign_in',
        { email, password }, { withCredentials: true }
      )

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogout = createAsyncThunk(
  'user/logout',
  async (arg, { rejectWithValue }) => {
    try {
      const { headers, data } = await axios.delete('auth/users/sign_out', { withCredentials: true })
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { headers, data } = await axios.post(
        '/auth/users/sign_up',
        { username, email, password }
      )

      return { refreshToken: headers['refresh-token'], accessToken: headers['access-token'],  data }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { rejectWithValue }) => {
    try {
      const data = await axios.get(`/user-info`, { withCredentials: true });
      return data?.data?.data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

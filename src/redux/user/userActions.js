import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../features/interceptors/axios'

let message;

const someThunk = createAsyncThunk(

async (arg, thunkAPI) => {
    try {
        const value = await promiseFunc()
        return value
    } catch(e) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'auth/users/sign_in',
        { email, password }, { withCredentials: true }
      )

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message === message)
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
      const { data } = await axios.delete('auth/users/sign_out', { withCredentials: true })

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
      const data = await axios.post(
        '/auth/users/sign_up',
        { username, email, password }
      )
debugger;
        return data?.data;
    } catch (error) {

      if (error.response  && error.response.data.message) {
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

      return data?.data?.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export default message
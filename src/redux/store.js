import { configureStore } from '@reduxjs/toolkit'
import { knSoundApi } from "./knSoundApi";
import userReducer from './user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    [knSoundApi.reducerPath]: knSoundApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(knSoundApi.middleware)
})

export default store

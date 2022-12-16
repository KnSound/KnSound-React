import { configureStore } from '@reduxjs/toolkit'
import { knSoundApi } from "./knSoundApi";
import userReducer from './user/userSlice';
import playerReducer from './player/playerSlice';
import playlistReducer from "./player/playlistSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    playlist: playlistReducer,
    [knSoundApi.reducerPath]: knSoundApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(knSoundApi.middleware)
})

export default store;

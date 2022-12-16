import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    title: null,
    image_url: null,
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylist(state, action) {
          state.id = action?.payload?.id;
          state.title = action?.payload?.title;
          state.image_url = action?.payload?.image_url;
          state.tracks = action?.payload?.tracks
        },
    },
})

export const { setPlaylist } = playlistSlice.actions
export default playlistSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isPlaying: false,
    volume: 0.5,
    currentTrackIndex: 0,
}

const palyerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsPlaying(state, action) {
          state.isPlaying = action?.payload;
        },
        setVolume(state, action) {
            state.volume = action?.payload;  
        },

    },
})

export const { setIsPlaying, setVolume} = palyerSlice.actions
export default palyerSlice.reducer


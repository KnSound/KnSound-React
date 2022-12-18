import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    trackIndex: 0,
    trackProgress: 0,
    isPlaylist: false,
    isPlaying: false,
    isPlaylistShown: false,
    volume: localStorage.getItem('volume') || 0.5,
    track: {},
    trackList: [],
    duration: 0,
}

const palyerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsPlaying(state, action) {
          state.isPlaying = action?.payload;
        },
        setDuration(state, action) {
            state.duration = action?.payload;
        },
        setTrackProgress(state, action) {
            state.trackProgress = action?.payload;
        },
        setVolume(state, action) {
            state.volume = action?.payload;  
            localStorage.setItem('volume', action?.payload);
        },
        setTrackIndex(state, action) {
            state.trackIndex = action?.payload;
        },
        setIsPlaylist(state, action) {
            state.isPlaylist = action?.payload;
        },
        setTrack(state, action) {
            state.track = action?.payload;
        },
        setIsPlaylistShown(state, action) {
            state.isPlaylistShown = action?.payload;
        },
        setTrackList(state, action) {
            state.trackList = action?.payload;
        },
        setTrackWithIndex(state, action) {
            state.trackList.splice(action?.payload?.index, 0, action?.payload?.track)
        },
        removeTrackByIndex(state, action) {
            state.trackList = state.trackList.filter((track, index) => index !== action?.payload)
        },
    },
})

export const {
    setIsPlaying,
    setVolume,
    setDuration,
    setTrackProgress,
    setTrackIndex,
    setPlaylist,
    setTrack,
    setIsPlaylistShown,
    setTrackList,
    setTrackWithIndex,
    removeTrackByIndex,
} = palyerSlice.actions
export default palyerSlice.reducer


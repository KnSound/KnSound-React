import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const KnSoundApiUrl = process.env.REACT_APP_API_URL

export const knSoundApi = createApi({
    reducerPath: 'knSoundApi',
    baseQuery: fetchBaseQuery({baseUrl: KnSoundApiUrl}),
    endpoints: (build) => ({
        getMyPlaylists: build.query({
            query: () => `playlists`,
        }),
        showPlaylist: build.query({
            query: (q) => `playlist/${q}`,
        })
    })
});

export const { useGetMyPlaylistsQuery, useShowPlaylistQuery } = knSoundApi;

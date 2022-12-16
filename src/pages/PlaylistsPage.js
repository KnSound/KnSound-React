import styled from "styled-components";
import {PageSection, PageLineSeparator, PageSectionName, StyledPlaylistsWrapper} from "../styled/styles";
import Playlist from "../components/Playlist";
import {useGetMyPlaylistsQuery} from "../redux/knSoundApi";
import { useEffect } from "react";

function PlaylistsPage() {
    const { data, error, isLoading } = useGetMyPlaylistsQuery();
 
    if (isLoading) return <h1>Loading...</h1>

    if (error) return <h1>Error</h1>

    return (
        <PageSection>
            <PageSectionName>My playlists</PageSectionName>
            <PageLineSeparator/>
            <StyledPlaylistsWrapper>
                {data.map(playlist => (
                    <Playlist key={playlist?.id} playlist={playlist}/>
                ))}
            </StyledPlaylistsWrapper>
        </PageSection>
    )
}

export default PlaylistsPage

import styled from "styled-components";
import { PageSection, PageLineSeparator, PageSectionName, StyledPlaylistsWrapper } from "../styled/styles";
import Playlist from "../components/Playlist";



const StyledPlaylistName = styled.h2`
  
`;

const StyledPlaylistCard = styled.div`
  
`;

function PlaylistsPage() {
  return (
    <PageSection>
      <PageSectionName>My playlists</PageSectionName>
      <PageLineSeparator/>
      <StyledPlaylistsWrapper>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>

      </StyledPlaylistsWrapper>
    </PageSection>
  )
}

export default PlaylistsPage

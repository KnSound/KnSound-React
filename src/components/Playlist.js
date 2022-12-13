import styled from "styled-components";
import { BsPlayCircle } from "react-icons/bs";

import BgImage from "../shared/playlist_cover.png"
import SecondBgImage from "../shared/song-cover-2.png"

const PlaylistImage = styled.img`
  height: 100%;
  width: 100%;
  transition: transform .2s; /* Animation */
`;

const PlaylistWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  transition: transform .2s; /* Animation */
  animation: sl;

  ${PlaylistImage}:hover {
    transform: scale(1.1);
  } 
`;

const PlaylistBar = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  border-radius: 5px;
  bottom: 0;
  background-color: rgba(93, 93, 93, 0.15);
  backdrop-filter: blur(2px);
`;

const PlaylistName = styled.h3`
  position: absolute;
  color: #ffffff;
  display: block;
  margin: auto;
  padding: 0;
`;

const PlayButton = styled(BsPlayCircle)`
  pointer-events: none;
  position: absolute;
  font-size: 32pt;
  fill: none;
  stroke: #ececec;
  stroke-width: 1px;
`;

function Playlist({playlist}) {
  return (
    <PlaylistWrapper>
      <PlaylistImage src={playlist?.image_url}/>
      <PlayButton/>
      <PlaylistBar>
        <PlaylistName>{playlist?.title}</PlaylistName>
      </PlaylistBar>

    </PlaylistWrapper>
  )
}

export default Playlist

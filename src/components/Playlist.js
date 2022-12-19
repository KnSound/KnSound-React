import styled from "styled-components";
import { BsPlayCircle } from "react-icons/bs";
import { BsPauseCircle } from "react-icons/bs";
import { setPlaylist } from "../redux/player/playlistSlice";
import { useDispatch, useSelector } from 'react-redux'
import { setIsPlaying, setTrackIndex, setTrackList } from "../redux/player/playerSlice";

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

const PauseButton = styled(BsPauseCircle)`
  pointer-events: none;
  position: absolute;
  font-size: 32pt;
  fill: none;
  stroke: #ececec;
  stroke-width: 1px;
`;

function Playlist({ playlist }) {
  const activePlayList = useSelector((state) => state.playlist)
  const { isPlaying } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  function isPlaylistActive() {
    return activePlayList?.id === playlist?.id;
  }

  function toggleActivePlaylist() {
    if (isPlaylistActive()) {
      return dispatch(setIsPlaying(!isPlaying))
    }

    dispatch(setTrackList(playlist?.tracks));
    dispatch(setPlaylist(playlist));
    dispatch(setTrackIndex(0));
    dispatch(setIsPlaying(true));
  }

  return (
    <PlaylistWrapper onClick={() => toggleActivePlaylist()}>
      <PlaylistImage src={playlist?.image_url} />
      {isPlaylistActive() ? <PauseButton /> : <PlayButton />}
      <PlaylistBar>
        <PlaylistName>{playlist?.title}</PlaylistName>
      </PlaylistBar>
    </PlaylistWrapper>
  )
}

export default Playlist

import styled, { css } from "styled-components";
import { BsPlayCircle } from "react-icons/bs";
import { BsPauseCircle } from "react-icons/bs";
import { setPlaylist } from "../redux/player/playlistSlice";
import { useDispatch, useSelector } from 'react-redux'
import { TbPlayerPlay } from "react-icons/tb";
import { TbPlayerPause } from "react-icons/tb";
import { setIsPlaying, setTrackIndex, setTrackList } from "../redux/player/playerSlice";

const StyledControlButton = css`
  display: block;
  color: white;
  font-size: 20pt;
`;

const Play = styled(TbPlayerPlay)`
  ${StyledControlButton};
`;

const Pause = styled(TbPlayerPause)`
  ${StyledControlButton};
`;

const PlaylistImage = styled.img`
  border-radius: 5px;
  border: 1px solid white;
  height: 170px;
  aspect-ratio: 1/1;
  transition: transform .2s; /* Animation */
`;

const PlaylistWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  transition: transform .2s; /* Animation */
  animation: sl;
  backdrop-filter: blur(2px);
`;

const PlaylistBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  border-radius: 5px;
`;

const PlaylistName = styled.h3`
  color: #ffffff;
  display: block;
  margin: 0;
  padding: 0;
`;

const PlayButton = styled(BsPlayCircle)`
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

  const truncateText = (title) => {
    const truncateBy = 15;
    if (title?.length > truncateBy) {
        return title.slice(0, truncateBy) + '...';
    }
    return title;
}

  return (
    <PlaylistWrapper onClick={() => toggleActivePlaylist()}>
      <PlaylistImage src={playlist?.image_url} />
      <PlaylistBar>
        <PlaylistName>{truncateText(playlist?.title)}</PlaylistName>
        {isPlaylistActive() ?
          isPlaying ?
            <Pause /> :
            <Play /> :  <Play />}
      </PlaylistBar>
    </PlaylistWrapper>
  )
}

export default Playlist

{/* <PlaylistWrapper onClick={() => toggleActivePlaylist()}>
      <PlaylistImage src={playlist?.image_url} />
      {isPlaylistActive() ? <PauseButton /> : <PlayButton />}
      <PlaylistBar>
        <PlaylistName>{playlist?.title}</PlaylistName>
      </PlaylistBar>
    </PlaylistWrapper> */}
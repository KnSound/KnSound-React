import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from "styled-components";
import { useShowPlaylistQuery } from "../../redux/knSoundApi";
import { TbPlayerPlay } from "react-icons/tb";
import { TbPlayerPause } from "react-icons/tb";
import { TbPlayerSkipForward } from "react-icons/tb";
import { TbPlayerSkipBack } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { setPlaylist } from '../../redux/player/playlistSlice';
import { setIsPlaying, setVolume } from '../../redux/player/playerSlice';
import VolumeRange from './VolumeRange';

const AudioPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60px;
  padding: 0 50px;
  background-color: #000000;
`;
const ControlsWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const StyledControlButton = css`
  color: white;
  font-size: 20pt;
`;
const Play = styled(TbPlayerPlay)`
  ${StyledControlButton};
`;
const Prev = styled(TbPlayerSkipBack)`
  ${StyledControlButton};
`;
const PrevInactive = styled(Prev)`
  ${StyledControlButton};
  color: gray;
`;
const Next = styled(TbPlayerSkipForward)`
  ${StyledControlButton};
`;

const NextInactive = styled(Next)`
  ${StyledControlButton};
  color: gray;
`;

const Pause = styled(TbPlayerPause)`
  ${StyledControlButton};
`;

const Range = styled.input.attrs({ type: 'range' })`
  width: 50%;
  height: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 5px;
  margin: 0;
  padding: 0;
`;

const TrackTitle = styled.h2`
  color: white;
`;

export default function AudioPlayer() {
  const { id: playlsit_id, title: playlist_title, image_url: playlist_image, tracks } = useSelector((state) => state.playlist)
  // const {data: fetchedPlaylist, error, isLoading} = useShowPlaylistQuery(id)

  const dispatch = useDispatch()

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const { volume: currentVolume } = useSelector((state) => state.player)
  const { isPlaying } = useSelector((state) => state.player)

  const isReady = useRef(false)

  const { id: track_id, title: track_title, image_url: track_imgae, track_url } = tracks[currentTrackIndex];
  
  const playerRef = useRef()
  const intervalRef = useRef()

  // const { duration } = playerRef.current;
  const [duration, setDuration] = useState(0)

  const onScrub = (value) => {
    setTrackProgress(value);
    playerRef.current.currentTime = value;
  };

  useEffect(() => {
    setCurrentTrackIndex(0)
    playerRef.current = new Audio(track_url);
    setDuration(playerRef.current.duration)
  }, [playlsit_id])

  useEffect(() => {
    console.log("progress changed")
  }, [playerRef?.current?.currentTime])

  useEffect(() => {
    setCurrentTrackIndex(0)
    dispatch(setIsPlaying(true))

    return function cleanup() {
      playerRef.current.pause()
    }
  }, [])

  useEffect(() => {
    playerRef.current.pause()
    setTrackProgress(0)
    
    playerRef.current = new Audio(track_url);
    setDuration(playerRef.current.duration)
    setTrackProgress(playerRef.current.currentTime);
    playerRef.current.volume = currentVolume;
    playerRef.current.addEventListener('canplay', () => {
      playerRef.current.play()
    })
    playerRef.current.addEventListener('timeupdate', () => {
      setTrackProgress(playerRef.current.currentTime);
    });

    return function cleanup() {
      playerRef.current.removeEventListener('timeupdate', () => {
        setTrackProgress(playerRef.current.currentTime);
      });
    }
  }, [track_id, playlsit_id]);

  useEffect(() => {
    playerRef.current.volume = currentVolume;
  }, [currentVolume]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track_title,
        artist: 'artist',
        album: playlist_title,
      });

      navigator.mediaSession.setActionHandler('play', () => {
        PlayAudio();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        PauseAudio();
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        PlayPrevTrack();
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        PlayNextTrack();
      });

      playerRef.current.addEventListener('ended', () => {
        PlayNextTrack();
      });

      return function cleanup() {
        playerRef.current.removeEventListener('ended', () => {
          PlayNextTrack();
        });
      }
    }
  }, [track_id, playlsit_id]);

  useEffect(() => {
    if (isPlaying) {    
      // check if the audio is ready to play using audioRef.current.readyState
      if (playerRef.current.readyState === 4) {
        playerRef.current.play()
      }
    } else {
      playerRef.current.pause();
    }
    return function cleanup() {
      playerRef.current.removeEventListener('canplay', () => {
        playerRef.current.pause();
      });
    }
  }, [isPlaying, track_id, playlsit_id]);

  function PauseAudio() {
    dispatch(setIsPlaying(false))
  }

  function PlayAudio() {
    dispatch(setIsPlaying(true))
  }

  function PlayNextTrack() {
    if (isNextTrackPresent()) { setCurrentTrackIndex(currentTrackIndex + 1); }
  }

  function PlayPrevTrack() {
    if (isPrevTrackPresent()) { setCurrentTrackIndex(currentTrackIndex - 1); }
  }

  function isNextTrackPresent() {
    return currentTrackIndex + 1 <= tracks?.length - 1;
  }

  function isPrevTrackPresent() {
    return currentTrackIndex - 1 >= 0
  }

  function isPlayerPlaying() {
    return isPlaying;
  }

  function onVolumeChange(value) {
    dispatch(setVolume(value))
  }

  // if(isLoading || error) return;

  return (
    <AudioPlayerWrapper>
      <ControlsWrapper>
        {isPrevTrackPresent() ? <Prev onClick={() => PlayPrevTrack()}/> : <PrevInactive/>}
        {isPlayerPlaying() ? <Pause onClick={() => PauseAudio()}/> : <Play onClick={() => PlayAudio()}/>}
        {isNextTrackPresent() ? <Next onClick={() => PlayNextTrack()}/> : <NextInactive/>}
      </ControlsWrapper>
      <Range
        value={trackProgress}
        step="0.1"
        min="0"
        max={duration ? duration : `${duration}`}
        onChange={(e) => onScrub(e.target.value)}
      />
      <VolumeRange/>
      <TrackTitle>{track_title}</TrackTitle>
    </AudioPlayerWrapper>
  )
}

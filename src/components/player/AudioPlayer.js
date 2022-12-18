import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from "styled-components";
import { useShowPlaylistQuery } from "../../redux/knSoundApi";
import { TbPlayerPlay } from "react-icons/tb";
import { TbPlayerPause } from "react-icons/tb";
import { TbPlayerSkipForward } from "react-icons/tb";
import { TbPlayerSkipBack } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { setPlaylist } from '../../redux/player/playlistSlice';
import {
  setIsPlaying,
  setDuration,
  setTrackProgress,
  setTrackIndex,
  setTrack
} from '../../redux/player/playerSlice';
import VolumeRange from './VolumeRange';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import TrackCard from './TrackCard.js';

const AudioPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: #000000;
`;

const AudioPlayerContentWrapper = styled.div`
  width: 100vw; 
  max-width: 1200px; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  accent-color: white;
`;

const PlayerProgress = styled.audio`
  width: 100%;
`;


export default function AudioPlayer() {
  const {
    isPlaying: currentIsPlaying,
    volume: currentVolume,
    duration: currentDuration,
    trackProgress: currentTrackProgress,
    trackIndex: currentTrackIndex,
    trackList: playlist_tracks,
    track: {
      id: track_id,
      title: track_title,
      image_url: track_image,
      track_url: track_url,
      author: { id: author_id } = {
        id: 0,
        username: "Unknown",
      },
    }
  } = useSelector((state) => state.player)

  const {
    id: playlsit_id,
    title: playlist_title,
  } = useSelector((state) => state.playlist)

  const dispatch = useDispatch()

  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef(0);   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    dispatch(setTrack(playlist_tracks[currentTrackIndex]));
    dispatch(setIsPlaying(true))
  }, [])

  useEffect(() => {
    dispatch(setTrackIndex(0));
    dispatch(setTrack(playlist_tracks[currentTrackIndex]));
  }, [playlsit_id])

  useEffect(() => {
    if (currentIsPlaying) {
      setTimeout(() => {
        audioPlayer.current.play();
      }, 100);
    } else {
      setTimeout(() => {
        audioPlayer.current.pause();
      }, 100);
    }

    return function cleanup() {
      audioPlayer.current.removeEventListener('canplay', () => {
        audioPlayer.current.pause();
      });
    }
  }, [currentIsPlaying, track_id, playlsit_id]);

  // set duration
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current?.duration);
    dispatch(setDuration(seconds));
    // progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // update volume
  useEffect(() => {
    audioPlayer.current.volume = currentVolume;
  }, [currentVolume]);

  //add media session
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

      audioPlayer.current.addEventListener('ended', () => {
        PlayNextTrack();
      });

      audioPlayer.current.addEventListener('timeupdate', () => {
        dispatch(setTrackProgress(audioPlayer.current?.currentTime + 0.2))
      });

      return function cleanup() {
        audioPlayer.current.removeEventListener('ended', () => {
          PlayNextTrack();
        });
        audioPlayer.current.removeEventListener('timeupdate', () => { });
      }
    }
  }, [track_id, playlsit_id]);

  const changeRange = (value) => {
    dispatch(setTrackProgress(value));
    audioPlayer.current.currentTime = value;
  }

  function PauseAudio() {
    dispatch(setIsPlaying(false))
  }

  function PlayAudio() {
    dispatch(setIsPlaying(true))
  }

  function PlayNextTrack() {
    if (isNextTrackPresent()) {
      dispatch(setTrack(playlist_tracks[currentTrackIndex + 1]));
      dispatch(setTrackIndex(currentTrackIndex + 1));
    }
  }

  function PlayPrevTrack() {
    if (isPrevTrackPresent()) {
      dispatch(setTrack(playlist_tracks[currentTrackIndex - 1]));
      dispatch(setTrackIndex(currentTrackIndex - 1));
    }
  }

  function isNextTrackPresent() {
    return currentTrackIndex + 1 <= playlist_tracks?.length - 1;
  }

  function isPrevTrackPresent() {
    return currentTrackIndex - 1 >= 0
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  return (
    <AudioPlayerWrapper>
      <AudioPlayerContentWrapper>
        <ControlsWrapper>
          {isPrevTrackPresent() ? <Prev onClick={() => PlayPrevTrack()} /> : <PrevInactive />}
          {currentIsPlaying ? <Pause onClick={() => PauseAudio()} /> : <Play onClick={() => PlayAudio()} />}
          {isNextTrackPresent() ? <Next onClick={() => PlayNextTrack()} /> : <NextInactive />}
        </ControlsWrapper>
        <PlayerProgress
          ref={audioPlayer}
          src={track_url}
          p
        />
        <Range
          value={currentTrackProgress}
          step="0.1"
          min="0"
          max={currentDuration > 0 ? currentDuration : 100}
          onChange={(e) => changeRange(e.target.value)}
        />
        <VolumeRange />
        <TrackCard />
      </AudioPlayerContentWrapper>
    </AudioPlayerWrapper>
  )
}

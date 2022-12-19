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
  border-top: 1px solid white;
`;

const AudioPlayerContentWrapper = styled.div`
gap: 5px;
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
  width: 100%;
  max-width: 60vh;
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
  margin: 5px;
`;

const DuratonItem = styled.h5`
display: block;
width: 50px;
  margin: 5px;
  color: white;
  font-size: 15pt;
`;


export default function AudioPlayer() {
  const {
    isPlaying: currentIsPlaying,
    volume: currentVolume,
    duration: currentDuration,
    trackIndex: currentTrackIndex,
    trackList: playlist_tracks,
    track: {
      id: track_id,
      title: track_title,
      track_url: track_url
    }
  } = useSelector((state) => state.player)

  const {
    id: playlsit_id,
    title: playlist_title,
  } = useSelector((state) => state.playlist)

  const dispatch = useDispatch()

  const audioPlayer = useRef();
  const progressBar = useRef();
  const timeLeft = useRef({});

  useEffect(() => {
    dispatch(setTrack(playlist_tracks[currentTrackIndex]));
    dispatch(setIsPlaying(true))
  }, [])

  useEffect(() => {
    dispatch(setTrackIndex(0));
    dispatch(setTrack(playlist_tracks[0]));
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

    syncMaxDuration()
  }, [currentIsPlaying, track_id, playlsit_id]);

  // set duration
  useEffect(() => {
    syncMaxDuration()
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // update volume
  useEffect(() => {
    audioPlayer.current.volume = currentVolume;
  }, [currentVolume]);

  //add media session
  useEffect(() => {
    syncMaxDuration()

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
        progressBar.current.value = audioPlayer.current?.currentTime;
        timeLeft.current.value = calculateTime(Number(progressBar.current?.max) - Number(audioPlayer.current?.currentTime))
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
    progressBar.current.value = value;
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

  function syncMaxDuration() {
    setTimeout(() => {
      const seconds = Math.floor(audioPlayer.current?.duration);
      dispatch(setDuration(seconds));
      progressBar.current.max = seconds ? seconds : 0;
    }, 300);

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
          ref={progressBar}
          max={currentDuration}
          defaultValue="0"
          step={0.1}
          onChange={(e) => changeRange(e.target.value)}
        />
        <DuratonItem>{calculateTime(progressBar.current?.max || 0)}</DuratonItem>
        <VolumeRange />
        <TrackCard />
      </AudioPlayerContentWrapper>
    </AudioPlayerWrapper>
  )
}

import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
    setIsPlaying,
    setDuration,
    setTrackProgress,
    setTrackIndex,
    setTrack,
    setIsPlaylistShown,
    setTrackList,
    removeTrackByIndex,
    setTrackWithIndex
} from '../../redux/player/playerSlice';
import { TbPlayerPause } from "react-icons/tb";
import { TbPlayerPlay } from "react-icons/tb";


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TrackCardWrapperPlaylist = styled.div`
    position: absolute;
    max-height: 70vh;
    width: 300px;
    height: 400px;
    background: transparent;
    border: solid white;
    border-radius: 5px;
    bottom: 70px;
    right: 0;
    box-shadow: 0px 2px 7px 6px rgb(0 0 0 / 20%);
    backdrop-filter: blur(3px);
`;

const PlaylistWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 1);
    border-bottom: 1px solid white;
`;

const PlaylistTitle = styled.h3`
    position: absolute;
    top: 5px;
    left: 65px;
    color: white;
`;

const PlaylistImage = styled.img`
    z-index: 10;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 5px 0 0 0;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
`;

const PlaylistAuthor = styled.h4`
    position: absolute;
    bottom: 5px;
    left: 65px;
    color: gray;
`;

const PlaylistTracksWrapper = styled.div`
    position: relative;
    width: 100%;
    max-height: 84%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
`;

const PlaylistItemWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    padding: 5px;
    margin: 2px;
    cursor: pointer;

`;

const PlaylistItemImage = styled.img`
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 5px;
    aspect-ratio: 1 / 1;
    height: 100%;
    object-fit: cover;
`;

const PlaylistItemTitle = styled.h3`
    position: absolute;
  font-size: 14pt;
    top: 5px;
    left: 65px;
    color: white;
`;

const PlaylistItemAuthor = styled.h4`
    position: absolute;
    bottom: 5px;
    left: 65px;
    color: gray;
`;

const DroppableField = styled.div`
    width: 100%;
`;

const StyledControlButton = css`
    color: white;
    font-size: 20pt;
    left: 18px;
    z-index: 100;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

const Pause = styled(TbPlayerPause)`
    ${StyledControlButton};
`;

const Play = styled(TbPlayerPlay)`
  ${StyledControlButton};
`;

export default function TrackCardPlaylist() {
    const {
        isPlaying: currentIsPlaying,
        volume: currentVolume,
        duration: currentDuration,
        trackIndex: currentTrackIndex,
        isPlaylistShown,
        trackList: currentTrackList,
        track: {
            id: track_id,
            title: track_title,
            image_url: track_image,
            track_url: track_url,
            author: {
                id: author_id,
                username: author_name
            } = {
                id: 0,
                username: "Unknown",
            },
        }
    } = useSelector((state) => {
        return state.player
    })

    const {
        id: playlsit_id,
        title: playlist_title,
        image_url: playlist_image,
        tracks: playlist_tracks,
        author: {
            username: playlist_author_name
        } = {
            username: "Unknown"
        }
    } = useSelector((state) => state.playlist)

    const dispatch = useDispatch()

    // create a function to truncate the title by 20 characters with dots
    const truncateText = (title) => {
        const truncateBy = 17;
        if (title?.length > truncateBy) {
            return title.slice(0, truncateBy) + '...';
        }
        return title;
    }

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;

        var updatedList = [...currentTrackList];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        dispatch(setTrackList(updatedList))
        const currentTrackIndex = updatedList.findIndex((track) => track.id === track_id)
        dispatch(setTrackIndex(currentTrackIndex))
    };

    const setTrackOnClick = (value) => {
        if (track_id == value) {
            return dispatch(setIsPlaying(!currentIsPlaying))
        }

        const index = currentTrackList.findIndex((track) => track.id === value)

        dispatch(setTrackIndex(index));
        dispatch(setTrack(currentTrackList[index]))
    }

    function toggleActiveTrack() {
        if (isPlaylistActive()) {
          return dispatch(setIsPlaying(!isPlaying))
        }
    
        dispatch(setTrackList(playlist?.tracks));
        dispatch(setPlaylist(playlist));
        dispatch(setTrackIndex(0));
        dispatch(setIsPlaying(true));
      }

    const isCurrentTrackIsPlaying = (value) => {
        value == track_id
    }
    return (
        <TrackCardWrapperPlaylist>
            <PlaylistWrapper onClick={() => dispatch(setIsPlaylistShown(false))}>
                <PlaylistTitle>{truncateText(playlist_title)}</PlaylistTitle>
                <PlaylistImage src={playlist_image} />
                <PlaylistAuthor>{truncateText(playlist_author_name)}</PlaylistAuthor>
            </PlaylistWrapper>

            <PlaylistTracksWrapper>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="tracks">
                        {(provided) => (
                            <DroppableField
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {currentTrackList.map((track, index) => (
                                    <Draggable
                                        key={track.id}
                                        draggableId={track.id.toString()}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {

                                            if (snapshot.isDragging) {
                                                provided.draggableProps.style.left = undefined;
                                                provided.draggableProps.style.top = undefined;
                                            }
                                            return (
                                                <PlaylistItemWrapper
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={(e) => setTrackOnClick(track.id)} 
                                                >
                                                    { (track_id == track.id)
                                                        ? 
                                                            (currentIsPlaying) 
                                                                ? 
                                                                    <Pause />
                                                                :
                                                                    <Play/>
                                                        :
                                                            <></>

                                                    }
                                                    <PlaylistItemImage src={track.image_url} />
                                                    <PlaylistItemTitle>{truncateText(track.title)}</PlaylistItemTitle>
                                                    <PlaylistItemAuthor>{truncateText(track.author.username)}</PlaylistItemAuthor>
                                                </PlaylistItemWrapper>
                                            )
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </DroppableField>
                        )}
                    </Droppable>
                </DragDropContext>
            </PlaylistTracksWrapper>
        </TrackCardWrapperPlaylist>
    )
}
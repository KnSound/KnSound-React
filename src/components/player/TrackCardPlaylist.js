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

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TrackCardWrapperPlaylist = styled.div`
    position: absolute;
    max-height: 70vh;
    width: 300px;
    height: 400px;
    background: transparent;
    border: solid black;
    border-radius: 5px;
    bottom: 70px;
    right: 0;
    box-shadow: 0px 2px 7px 6px rgb(0 0 0 / 20%);
    backdrop-filter: blur(3px);
`;

const PlaylistWrapper = styled.div`
    position: relative;
    width: 100%;
    border-width:0 !important;
    height: 60px;
    background: rgba(0, 0, 0, 1);
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
    top: -1px;
    left: -1px;
    border-radius: 5px 0 0 0;
    height: 102%;
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
`;

const PlaylistItemImage = styled.img`
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 5px;
    aspect-ratio: 1 / 1;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const PlaylistItemTitle = styled.h3`
    position: absolute;
    top: 5px;
    left: 65px;
    color: black;
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
        const truncateBy = 20;
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
        const index  = currentTrackList.findIndex((track) => track.id === value)

        dispatch(setTrackIndex(index));
        dispatch(setTrack(currentTrackList[index]))
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
                                                >
                                                    <PlaylistItemImage src={track.image_url} onClick={(e) => setTrackOnClick(track.id)}/>
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
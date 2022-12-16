import styled, { css } from "styled-components";
import { TbVolume, TbVolumeOff, TbVolume2, TbVolume3 } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "../../redux/player/playerSlice";
import { useState, useEffect } from "react";

const StyledControlButton = css`
  color: white;
  font-size: 20pt;
`;

const LoudVolumeButton = styled(TbVolume)`
    ${StyledControlButton};
`;

const MutedVolumeButton = styled(TbVolumeOff)`
    ${StyledControlButton};
`;

const NormalVolumeButton = styled(TbVolume2)`
    ${StyledControlButton};
`;

const SilentVolumeButton = styled(TbVolume3)`
    ${StyledControlButton};
`;

const Range = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
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

const VolumeRange = styled(Range)`
    appearance: slider-vertical;
    width: 100%;
    height: 100%;
    background: #d3d3d3;
`;

const VolumeButtonWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    color: white;
`;

const VolumeRangeWrapper = styled.div`
    position: absolute;
    z-index: 1;
    top: -118px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 30px;
    height: 130px;
    padding: 20px;
    background-color: black;
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: 0px 2px 7px 6px rgb(0 0 0 / 20%);
    transition: .1s ease-in-out;
    padding: 12px 12px;
`;


export default function volumeRange() {
    const { volume } = useSelector(state => state.player);
    const [previousVolume, setPreviousVolume] = useState(volume);
    const [isMuted, setIsMuted] = useState(false);
    const [isShowing, setIsShowing] = useState(false);

    const dispatch = useDispatch();

    const handleVolumeButtonClick = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (value) => {
        if(value == 0) {
            setIsMuted(true);
        } else if (value > 0) {
            setIsMuted(false);
        }

        dispatch(setVolume(value));
    };

    useEffect(() => {
        if (isMuted) {
            setPreviousVolume(volume);
            handleVolumeChange(0);
        } else {
            handleVolumeChange(previousVolume);
        }
    }, [isMuted]);

    const handleHoover = (value) => {
        setIsShowing(value);
    };

    return (
        <VolumeButtonWrapper>
            {
                isMuted
                    ?
                    <MutedVolumeButton onClick={() => handleVolumeButtonClick()} onMouseEnter={() => handleHoover(true)} onMouseLeave={() => handleHoover(false)} />
                    :
                    volume > 0.5
                        ?
                        <LoudVolumeButton onClick={() => handleVolumeButtonClick()} onMouseEnter={() => handleHoover(true)} onMouseLeave={() => handleHoover(false)} />
                        :
                        volume > 0
                            ?
                            <NormalVolumeButton onClick={() => handleVolumeButtonClick()} onMouseEnter={() => handleHoover(true)} onMouseLeave={() => handleHoover(false)} />
                            :
                            <MutedVolumeButton onClick={() => handleVolumeButtonClick()} onMouseEnter={() => handleHoover(true)} onMouseLeave={() => handleHoover(false)} />

            }
            {
                isShowing
                &&
                <VolumeRangeWrapper onMouseEnter={() => handleHoover(true)} onMouseLeave={() => handleHoover(false)}>
                    <VolumeRange
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => handleVolumeChange(e.target.value)}
                    />
                </VolumeRangeWrapper>
            }

        </VolumeButtonWrapper>
    );
}
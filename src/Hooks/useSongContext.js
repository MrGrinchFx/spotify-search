import { useContext } from "react";
import { SongContext } from "../Contexts/SongContext";

function useSongContext(){
    const { moreInfo, play, resetMoreInfo, resetPlaying, pressPause, pressPlay, toggleInfo } = useContext(SongContext);

    return {
        moreInfo,
        play,
        resetMoreInfo,
        resetPlaying,
        pressPause,
        pressPlay,
        toggleInfo
    };
}

export default useSongContext;
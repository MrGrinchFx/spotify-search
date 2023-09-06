import { createContext, useState} from "react";

const SongContext = createContext();

function SongContextProvider(props){
    const [moreInfo, setMoreInfo] = useState([]);
    const [play, setPlay] = useState([])
    
    function resetMoreInfo() {
        const newMoreInfo = Array(moreInfo.length).fill(false);
        setMoreInfo(newMoreInfo);
      }
      
      function pressPause(index){
        const newStates = Array(play.length).fill(false)
        setPlay(newStates)
      }
      
      function pressPlay(index){//
          
        const newStates = Array(play.length).fill(false)
        newStates[index] = true
        setPlay(newStates)
      
      }  
      function toggleInfo(index){//
        setMoreInfo((prevStates) =>{
          const newStates = [...prevStates]
          newStates[index] = !newStates[index]
          return newStates
        })
      } 
      function resetPlaying(){
        const newStates = Array(play.length).fill(false)
        setPlay(newStates)
      }
      return(
        <SongContext.Provider value = {{moreInfo, play, resetPlaying, toggleInfo, pressPlay, pressPause, resetMoreInfo}}>
            {props.children}
        </SongContext.Provider>
      )
}

export {SongContext, SongContextProvider}
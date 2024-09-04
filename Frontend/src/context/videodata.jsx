import { createContext,useContext, useState } from "react";

const VideoContext = createContext(null);

export const VideoProvider = ({children})=>{
    const [videoData,setVideoData] = useState(null);
    return (
        <VideoContext.Provider value={{videoData,setVideoData}}>
            {children}
        </VideoContext.Provider>
    )
}
export const useVideoData = ()=>useContext(VideoContext);
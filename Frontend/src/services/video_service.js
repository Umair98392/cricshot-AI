import { privateAxios} from "./helper";
// create video function
export const createVideo = (videoData) => {
    return privateAxios
      .post(`/save-video-data`, videoData) // Fixed interpolation here
      .then((response) => response.data) // Fixed accessing response data
      .catch((error) => Promise.reject(error)); // Fix error handling
  };

//get total matches
export const  getTotalMatches=async(userId)=>{
  return await privateAxios.get(`/videos/totalEntries/${userId}`).then(response=>response.data)
  }

//get total pull
export const getTotalPull=async(userId)=>{
  return await privateAxios.get(`/videos/totalPull/${userId}`).then(response=>response.data)
}

//get total reverse sweep
export const getTotalReverseSweep=async(userId)=>{
  return await privateAxios.get(`/videos/totalReverseSweep/${userId}`).then(response=>response.data)
}

//get total defence
export const getTotalDefence=(userId)=>{
  return privateAxios.get(`/videos/totalDefence/${userId}`).then(response=>response.data)
}

//get total cover drive
export const getTotalCoverDrive=async(userId)=>{
  return await privateAxios.get(`/videos/totalCoverDrive/${userId}`).then(response=>response.data)
}

//get total cover bowled
export const getTotalBowled=async(userId)=>{
  return await privateAxios.get(`/videos/totalBowled/${userId}`).then(response=>response.data)
}

//get current match data
export const getCurrentMatchData=(userId)=>{
return privateAxios.get(`/videos/currentmatchentry/${userId}`).then(response=>response.data)
}

//get last match data
export const getLastMatchData=async(userId)=>{
  return await privateAxios.get(`/videos/secondlastentry/${userId}`).then(response=>response.data)
}

//get latest 4 match video data
export const getLast4MatchVideoData=async(userId)=>{
return await privateAxios.get(`/videos/latest4Videos/${userId}`).then(response=>response.data)
}
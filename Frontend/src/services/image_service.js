import { privateAxios} from "./helper";
// create image function
export const createImage = (imageData) => {
    return privateAxios
      .post(`/save-image-data`, imageData) // Fixed interpolation here
      .then((response) => response.data) // Fixed accessing response data
      .catch((error) => Promise.reject(error)); // Fix error handling
  };

//get latest 4 match data
export const getLast4MatchData= async(userId)=>{
  return await privateAxios.get(`/images/latest4Images/${userId}`).then(response=>response.data)
}

import React, { useState, useEffect } from 'react';
import { FaDownload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { getCurrentUserDetail } from '../../auth';
import { getLast4MatchVideoData } from '../../services/video_service';

const ActivityVid = () => {
  const [videoActivities, setVideoActivities] = useState([]);
  const [user, setUser] = useState(undefined);
  const [last4MatchData, setLast4MatchData] = useState({});
  
  //Backend start
  useEffect(() => {
    async function fun() {
      const currentUserDetail = await getCurrentUserDetail();
      if (currentUserDetail != undefined)
        setUser(currentUserDetail)
      }
      fun();
  }, [])
  //Backend end

  useEffect(() => {
    async function fun(){
      if (user !== undefined) {
        //load last 4 match data
        await getLast4MatchVideoData(user.id)
          .then((data) => {
            setLast4MatchData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    fun();
  }, [user]);

  useEffect(() => {
    // last 3 video data
    if (last4MatchData.length > 0) {
      const dummyData = last4MatchData.slice(0, 3).map((match, index) => ({
        id: index + 1,
        date:match?.date,
        numberOfShots: match?.shots_played,
        betterShot: match?.better_shot,
        weakShot: match?.weak_shot,
        predictedVideo: `data:video/mp4;base64,${match?.predicted_video}`
      }));

      setVideoActivities(dummyData);
    }
  }, [last4MatchData]);

  const handleViewVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const handleDownloadVideo = (videoUrl) => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8  mr-10">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white ">Uploaded Video History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {videoActivities.length === 0 ? (
          <div className="text-2xl font-semibold text-center text-gray-500">Your recent 3 video searches will be shown here</div>
        ) : (
          videoActivities.map((video, index) => (
            <div key={video.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-lg font-semibold ">Sr no.  {index + 1}</p>
                <p className="font-semibold text-center">Date: {video.date} </p>
                <p className="text-gray-600 text-center">Number of Shots: {video.numberOfShots}</p>
                <p className="text-gray-600 text-center">Better Shot: {video.betterShot}</p>
                <p className="text-gray-600 text-center">Weak Shot: {video.weakShot}</p>
              </div>
              <div className="p-4 bg-gray-100">
                <p className="text-gray-700 mb-2">Predicted Video:</p>
                <div className="flex items-center justify-between">
                  <video controls className="w-full rounded-lg">
                    <source src={video.predictedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  </div>
                  <div className="flex  items-center ">
                    
                    <button onClick={() => handleDownloadVideo(video.predictedVideo)} className="bg-green-500 text-white px-2 py-1 rounded-lg mt-2 "><FaDownload /></button>
                  </div>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityVid;

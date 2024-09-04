import React, { useState, useEffect } from 'react';
import { FaDownload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { getCurrentUserDetail } from '../../auth';
import { getLast4MatchData } from '../../services/image_service';

const ActivityImg = () => {
  const [activities, setActivities] = useState([]);
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
        await getLast4MatchData(user.id)
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
    // Getting last 4 match Data
    if (last4MatchData.length > 0) {
      const dummyData = last4MatchData.map((match, index) => ({
        id: index + 1,
        date:match?.date,
        confidence: match?.confidence,
        shotType: match?.predicted_shot,
        predictedImages: [
          { url: `data:image/png;base64,${match?.result_image_1}` },
          { url: `data:image/png;base64,${match?.result_image_2}` },
          { url: `data:image/png;base64,${match?.result_image_3}` },
        ]
      }));

      setActivities(dummyData);
    }
  }, [last4MatchData]);

  const handleDownloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', imageUrl.split('/').pop());
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 mr-10">
      <h1 className="text-2xl font-semibold dark:text-white mb-6 mt-20">Uploaded Image History</h1>
      {activities.length === 0 ? (
        <div className=" text-2xl font-semibold text-center text-gray-500">Your recent 4 image searches will be shown here</div>
      ) : (
        activities.map((activity) => (
          activity.date && activity.confidence && activity.shotType ? (
            <div key={activity.id} className="mb-4 border rounded-lg p-2 md:flex md:items-center md:justify-between bg-white">
              <div className="mb-4 md:mb-0 md:mr-4 md:w-1/6 text-center">
                <p className="text-md font-semibold">Sr No. {activity.id}</p> 
              </div>
              <div className="md:w-2/6">
                <p className="text-md font-semibold">Date: {activity.date} </p>
                <p className="text-lg text-gray-500">Confidence: {activity.confidence}</p>
                <p className="text-lg text-gray-500">Predicted Shot: {activity.shotType}</p>
              </div>
              <div className="flex flex-wrap justify-between">
                {activity.predictedImages.map((image, idx) => (
                  <div key={idx} className="flex flex-col items-center mb-2 md:mb-0">
                    <img src={image.url} alt={`Prediction ${activity.id}`} className="w-24 h-auto object-contain rounded-sm mb-2 mr-2 hover:scale-125 transition-transform duration-300 ease-in-out" />
                    <div className="flex">
                      <button onClick={() => handleDownloadImage(image.url)} className="bg-green-500 text-white px-2 py-1 rounded-lg"><FaDownload /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ))
      )}
    </div>
  );
};

export default ActivityImg;

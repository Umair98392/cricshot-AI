import React, { useState, useEffect } from 'react';
import { FaDownload } from "react-icons/fa6";
import Img1 from '../../assets/pics/img_with_bboxes.jpg';
import Img2 from '../../assets/pics/img_with_keypoints.jpg';
import Img3 from '../../assets/pics/img_with_predictions.jpg';
const ActivityImgDemo = () => {
  const [activities, setActivities] = useState([]);

  // Mock data to simulate the last 4 match data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        date: "23-08-2024 06:25:00 PM",
        confidence: '95%',
        shotType: 'Pull Shot',
        predictedImages: [
          { url: Img1 },
          { url: Img2 },
          { url: Img3 },
        ]
      },
      
      {
        id: 2,
        date:"15-08-2024 12:45:00 PM",
        confidence: '95%',
        shotType: 'Pull Shot',
        predictedImages: [
          { url: Img1 },
          { url: Img2 },
          { url: Img3 },
        ]
      }
    ];
    setActivities(mockData);
  }, []);


  return (
    <div className="container mx-auto px-4 py-8 mr-10">
      <h1 className="text-2xl font-semibold dark:text-white mb-6 mt-20">Uploaded Image History</h1>
      {activities.length === 0 ? (
        <div className="text-2xl font-semibold text-center text-gray-500">Your recent 4 image searches will be shown here</div>
      ) : (
        activities.map((activity) => (
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
                    <button onClick={null} className="bg-green-500 text-white px-2 py-1 rounded-lg"><FaDownload /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityImgDemo;

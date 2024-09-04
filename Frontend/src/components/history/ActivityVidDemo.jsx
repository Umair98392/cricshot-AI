import React, { useState, useEffect } from 'react';
import { FaDownload } from "react-icons/fa6";
// import { FaEye } from "react-icons/fa";  // Remove if not used
import Vid1 from '../../assets/video/predicted_video.mp4'

const ActivityVidDemo = () => {
  const [videoActivities, setVideoActivities] = useState([]);

  useEffect(() => {
    // Static data to mimic the last 3 video activities
    const dummyData = [
      {
        id: 1,
        date: "20-08-2024 02:02:00 PM",
        numberOfShots: 4,
        betterShot: "pull",
        weakShot: "reverse_sweep",
        predictedVideo: Vid1,
      },
      {
        id: 2,
        date: "18-08-2024 12:02:00 PM",
        numberOfShots: 4,
        betterShot: "pull",
        weakShot: "reverse_sweep",
        predictedVideo: Vid1,
      },
      {
        id: 3,
        date: "16-08-2024 09:42:00 PM",
        numberOfShots: 4,
        betterShot: "pull",
        weakShot: "reverse_sweep",
        predictedVideo: Vid1,
      },
    ];

    setVideoActivities(dummyData);
  }, []);

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
                    <source src={Vid1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  </div>
                  <div className="flex  items-center ">
                    <button onClick={null} className="bg-green-500 text-white px-2 py-1 rounded-lg mt-2 "><FaDownload /></button>
                  </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityVidDemo;

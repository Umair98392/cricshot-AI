import React, { useState, useEffect } from "react";
import Welcome from "../../components/dashboard/Welcome";
import VerticalCDemo from "../../components/dashboard/VerticalCDemo";
import SideBarDemo from "../../components/dashboard/SidebarDemo";
import LineCDemo from "../../components/dashboard/LineCDemo";
import DoughCDemo from "../../components/dashboard/DoughCDemo";
import { FaVideo } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaDownload, FaPlayCircle , FaTimesCircle} from "react-icons/fa";
import Vid1 from '../../assets/video/predicted_video.mp4';

function ProfileDemo() {
  const [shotData, setShotData] = useState([]);
  const [observation, setObservation] = useState('');
  const [betterShot, setBetterShot] = useState('Cover Drive');
  const [videoData, setVideoData] = useState(null);
  const [showVideo, setShowVideo] = useState(false); 

  //spring start

  const[user,setUser]=useState({id: 1, name: "John"});
  const[totalMatches,setTotalMatches]=useState(5);
  const[totalPull,setTotalPull]=useState(15);
  const[totalCoverDrive,setTotalCoverDrive]=useState(25);
  const[totalDefence,setTotalDefence]=useState(10);
  const[totalReverseSweep,setTotalReverseSweep]=useState(8);
  const[totalBowled,setTotalBowled]=useState(2);

  const shotsData = [
    { name: 'Pull', shots: totalPull },
    { name: 'Cover Drive', shots: totalCoverDrive },
    { name: 'Bowled', shots: totalBowled },
    { name: 'Reverse Sweep', shots: totalReverseSweep},
    { name: 'Defence', shots: totalDefence },
    { name: 'Others', shots: 0 },
  ];

  useEffect(() => {
    // Simulate video data retrieval
    const demoVideoData = {
      shots_played: 6,
      shot_sequence: ["Pull", "Cover Drive", "Defence", "Cover Drive", "Reverse Sweep", "Bowled"],
      better_shot: "Cover Drive",
      weak_shot: "Reverse Sweep",
      predicted_video: "your_base64_encoded_video_here" // Placeholder for the actual video
    };
    
    const { shots_played, shot_sequence, better_shot, weak_shot, predicted_video } = demoVideoData;
    
    let observationText = `
    Based on the analysis of shots played in the current match: \n
      - Number of shots played: ${shots_played}
      - Better shot: ${better_shot} shot
      - You need to pay attention to ${weak_shot} shot.
    `;
    
    if (shot_sequence && shot_sequence.length > 0) {
      observationText += '\n\t  Shot sequence:';
      shot_sequence.forEach((shot, index) => {
        observationText += `\n   \t\t     ${index + 1}. ${shot}`;
      });
    }

    setObservation(observationText);
    setBetterShot(better_shot);
    setVideoData({ predicted_video });
  }, []);

  const handleDownload = () => {
    if (videoData) {
      const link = document.createElement('a');
      link.href = `data:video/mp4;base64,${videoData.predicted_video}`;
      link.download = 'predicted_video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const handlePlay = (event) => {
    event.preventDefault();
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  return (
    <div className="dark:bg-[#1C2222] bg-gray-100 min-h-screen">
      <div className="flex mt-20 ml-2 md:ml-20 ">
        <SideBarDemo />
        <div className="flex-grow p-8  ">
          <Welcome  userName="John"  />
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center dark:text-white">Shots Played in Current Match</h2>
              <DoughCDemo />
            </div>
            <div>
              <div className=" p-2 ">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center dark:text-white">Upload Another to Check</h2>
                <ul className="flex justify-center mt-4 space-x-4  ">
                  <li className="border-2 border-gray-500 rounded-md ">
                    <a href={null} className="text-gray-500 hover:text-green-700 flex flex-col items-center p-3 ">
                      <FaFileImage className="text-4xl  " />
                      <p className="text-sm">Image</p>
                    </a>
                  </li>
                  <li className="border-2 border-gray-500 rounded-md ">
                    <a href={null} className="text-gray-500 hover:text-green-700 flex flex-col items-center p-3">
                      <FaVideo className="text-4xl" />
                      <p className="text-sm">Video</p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-4 items-center justify-center">
                <h2 className="text-xl md:text-2xl text-center font-semibold mb-4  dark:text-white">Your Conclusions </h2>
                <textarea
                  className="w-full h-80 px-2 py-1 font-semibold text-gray-700 bg-gray-200 rounded-md resize-none"
                  value={observation}
                  readOnly
                />
              </div>
            </div>
            <div className="">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center dark:text-white">Total Shots Played</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Your shot data display */}
                {shotsData.map((shot, index) => (
                  <div key={index} className="p-4 bg-gray-200 rounded-md font-semibold text-center">
                    <h2 className="text-lg font-semibold">{shot.name}</h2>
                    <p className="text-gray-600">{shot.shots}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <ul className="flex justify-center mt-4 space-x-4">
                  {/* Total Matches and Result */}
                  <li className="p-4 bg-blue-200 rounded-md font-semibold text-center">
                    <h2 className="text-lg font-semibold">Total Matches</h2>
                    <p className="text-sm">{totalMatches}</p>
                  </li>
                  <li className="p-4 bg-green-200 rounded-md font-semibold text-center">
                    <h2 className="text-lg font-semibold">Result</h2>
                    <p className="text-sm">You have better accuracy in {betterShot} shot .</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 dark:text-white">Comparison between Last and Current Match</h2>
              <LineCDemo />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center dark:text-white">Runs scored by Shots</h2>
              <VerticalCDemo />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center  dark:text-white">Visualize Result Analysis </h2>
            <div className="flex justify-center items-center space-x-4"> {/* Added div to contain both buttons */}
              <a href={null} className="text-gray-500 hover:text-green-700 flex flex-col items-center p-4" onClick={null}>
                <FaPlayCircle className="text-5xl" />
                <p className="text-md mt-2">Play</p>
              </a>
              <a href={null} className="text-gray-500 hover:text-green-700 flex flex-col items-center p-4" onClick={null}>
                <FaDownload className="text-5xl" />
                <p className="text-md mt-2">Download</p>
              </a>
            </div>
            {showVideo && videoData && (
              <div className="mt-4 text-center">
                <div className="flex justify-center mt-2"> {/* Centered div */}
      <button onClick={handleClose} className="text-red-500 hover:text-red-700 text-lg flex items-center justify-center">
        <FaTimesCircle className="mr-2" />
        Close
      </button>
    </div>
                <video controls className="md:w-1/2 w-full mx-auto" >
                  {/* <source src={`data:video/mp4;base64,${videoData.predicted_video}`} type="video/mp4" /> */}
                  <source src={Vid1} type='video/mp4'  />
                  Your browser does not support the video tag.
                </video>
               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDemo;

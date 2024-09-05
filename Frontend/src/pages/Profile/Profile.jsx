import React, { useState, useEffect } from "react";
import Welcome from "../../components/dashboard/Welcome";
import VerticalC from "../../components/dashboard/VerticalC";
import SideBar from "../../components/dashboard/Sidebar";
import Line from "../../components/dashboard/LineC";
import DoughC from "../../components/dashboard/DoughC";
import { FaVideo } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaDownload, FaPlayCircle, FaTimesCircle } from "react-icons/fa";
import { getTotalMatches, getTotalPull, getTotalBowled, getTotalCoverDrive, getTotalDefence, getTotalReverseSweep,getCurrentMatchData } from "../../services/video_service";
import { getCurrentUserDetail } from "../../auth";
function Profile() {
  const [shotData, setShotData] = useState([]);
  const [observation, setObservation] = useState('');
  const [betterShot, setBetterShot] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  //backend start

  const [user, setUser] = useState(0)
  const [totalMatches, setTotalMatches] = useState(0)
  const [totalPull, setTotalPull] = useState(0);
  const [totalCoverDrive, setTotalCoverDrive] = useState(0)
  const [totalDefence, setTotalDefence] = useState(0)
  const [totalReverseSweep, setTotalReverseSweep] = useState(0)
  const [totalBowled, setTotalBowled] = useState(0)

  useEffect(() => {
    async function fun() {
      const currentUserDetail = await getCurrentUserDetail();
      if (currentUserDetail != undefined)
        setUser(currentUserDetail)
      }
      fun();
  }, [])
  
  const userId = user.id

  useEffect(() => {
    getTotalMatches(userId).then((data) => {
      setTotalMatches(data);
    }).catch(error => {
      console.log(error)
    })
    
  }, [userId])

  useEffect(()=>{
    getTotalPull(userId).then((data)=>{
     setTotalPull(data);
    }).catch(error=>{
      console.log(error)
    })
  },[userId])

  useEffect(()=>{
    getTotalDefence(userId).then((data)=>{
     setTotalDefence(data);
    }).catch(error=>{
      console.log(error)
    })
  },[userId])

  useEffect(()=>{
    getTotalCoverDrive(userId).then((data)=>{
     setTotalCoverDrive(data);
    }).catch(error=>{
      console.log(error)
    })
  },[userId])

  useEffect(()=>{
    getTotalBowled(userId).then((data)=>{
     setTotalBowled(data);
    }).catch(error=>{
      console.log(error)
    })
  },[userId])

  useEffect(()=>{
    getTotalReverseSweep(userId).then((data)=>{
     setTotalReverseSweep(data);
    }).catch(error=>{
      console.log(error)
    })
  },[userId])

  //backend end


  const shotsData = [
    { name: 'Pull', shots: totalPull },
    { name: 'Cover Drive', shots: totalCoverDrive },
    { name: 'Bowled', shots: totalBowled },
    { name: 'Reverse Sweep', shots: totalReverseSweep },
    { name: 'Defence', shots: totalDefence },
    { name: 'Others', shots: 0 },
    // Add more shot data as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch last match data
            const current_data = await getCurrentMatchData(userId);
            setVideoData(current_data)
            const { shots_played, shot_sequence, better_shot, weak_shot } = current_data;

            // Generate observation text based on extracted information
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

            // Set states with extracted information
            setObservation(observationText);
            setBetterShot(better_shot);
        } catch (error) {
            console.error("Error fetching last match data:", error);
        }
    };

    fetchData();
  },[ userId])


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
        <SideBar />
        <div className="flex-grow p-8  ">
          <Welcome userName={user.name} />
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center dark:text-white">Shots Played in Current Match</h2>
              <DoughC  current_match_data = {videoData}/>
            </div>
            <div>
              <div className=" p-2 ">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center dark:text-white">Upload Another to Check</h2>
                <ul className="flex justify-center mt-4 space-x-4  ">
                  <li className="border-2 border-gray-500 rounded-md ">
                    <a href="/Checkshot" className="text-gray-500 hover:text-green-700 flex flex-col items-center p-3 ">
                      <FaFileImage className="text-4xl  " />
                      <p className="text-sm">Image</p>
                    </a>
                  </li>
                  <li className="border-2 border-gray-500 rounded-md ">
                    <a href="/CheckshotVid" className="text-gray-500 hover:text-green-700 flex flex-col items-center p-3">
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
              <Line current_match_data = {videoData}/>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center dark:text-white">Runs scored by Shots</h2>
              <VerticalC current_match_data= {videoData}/>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center  dark:text-white">Visualize Result Analysis </h2>
            <div className="flex justify-center items-center space-x-4"> {/* Added div to contain both buttons */}
              <a href="#" className="text-gray-500 hover:text-green-700 flex flex-col items-center p-4" onClick={(e) => handlePlay(e)}>
                <FaPlayCircle className="text-5xl" />
                <p className="text-md mt-2">Play</p>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700 flex flex-col items-center p-4" onClick={handleDownload}>
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
                  <source src={`data:video/mp4;base64,${videoData.predicted_video}`} type="video/mp4" />
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

export default Profile;

import React from 'react';
import SideBar from '../../components/dashboard/Sidebar';
import ImageHowItWorks from '../../assets/pics/imagehow.png';
import VideoHowItWorks from '../../assets/pics/videohow.png';
import email from '../../assets/pics/email.png'


const Help = () => {
  return (
    <div className="dark:bg-[#1C2222] min-h-screen bg-gray-100">
      <div className="mt-10vh">
        <SideBar />
        <div className="max-w-6xl mx-auto px-4 py-8 mt-20 dark:text-white">
          <h1 className="text-2xl font-semibold mb-8 text-center">Welcome to CricshotAI Help</h1>
          <div className="bg-white dark:bg-[#0e161a] shadow-md rounded-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 ">Contact Us</h2>
            <p className="mb-6">Feel free to reach out to us! Whether you have a question, feedback, or a collaboration proposal, we'd love to hear from you.</p>
            <a href="mailto:abc87@gmail.com" className="flex items-center justify-center  dark:text-white  px-2 py-1  ">
              <img src={email} alt="email" className="h-6 w-6 mr-2" />
              <p className="mt-0.5 font-semibold">CONTACT - SEND US AN EMAIL</p>
            </a>
          </div>
        
          {/* Section for Image Analysis */}
          <div className="bg-white dark:bg-[#0e161a] shadow-md rounded-md p-8 mb-8">
          
            <p className="mb-4 font-semibold text-center">Welcome to CricshotAI! This help guide will walk you through the main features of our website.</p>
            <h2 className="text-2xl font-semibold mb-4">Image Analysis</h2>
            <p className="mb-6">Our image analysis tool allows you to upload cricket images and analyze them for various aspects like shot types, player positions, and more.</p>
            <h3 className="text-lg font-semibold mb-2">How to Use:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Click on the "CHECK SHOT" button in the navigation bar.</li>
              <li>Choose the "FOR IMAGE" option from the dropdown menu.</li>
              <li>Upload the cricket image you want to analyze.</li>
              <li>Wait for the analysis to complete and view the results.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">How it Works:</h3>
            <p className="mb-6">Our image analysis algorithm identifies key elements in the uploaded image such as player positions, shot types, and field placements. It then processes this information to provide detailed insights and statistics.</p>
            <div className="flex justify-center">
              <img src={ImageHowItWorks} alt="How Image Analysis Works" className="rounded-md shadow-md" />
            </div>
          </div>
          {/* Section for Video Analysis */}
          <div className="bg-white dark:bg-[#0e161a] shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Video Analysis</h2>
            <p className="mb-6">Our video analysis tool allows you to upload cricket videos and analyze them for various aspects like shot types, player movements, and more.</p>
            <h3 className="text-lg font-semibold mb-2">How to Use:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Click on the "CHECK SHOT" button in the navigation bar.</li>
              <li>Choose the "FOR VIDEO" option from the dropdown menu.</li>
              <li>Upload the cricket video you want to analyze.</li>
              <li>Wait for the analysis to complete and view the results.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">How it Works:</h3>
            <p className="mb-6">Our video analysis algorithm processes each frame of the uploaded video to detect key events such as player actions, shot types, and field movements. It then compiles these events into a comprehensive analysis report.</p>
            <div className="flex justify-center">
            <img src={VideoHowItWorks} alt="How Image Analysis Works" className="rounded-md shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
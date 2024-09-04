import React from 'react';
import SideBar from '../../components/dashboard/Sidebar';
import ActivityImg from '../../components/history/ActivityImg'; 
import ActivityVid from '../../components/history/ActivityVid';// Import the ActivityPage component

const Activity = () => {
  return (
    <div className="dark:bg-[#1C2222] min-h-screen bg-gray-100">
      <div className="mt-10vh"> {/* Adjusted margin-top */}
        <SideBar />
        <ActivityImg /> 
        <ActivityVid /> {/* Include the ActivityPage component here */}
      </div>
    </div>
  );
};

export default Activity;

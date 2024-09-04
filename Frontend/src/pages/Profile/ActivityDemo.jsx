import React from 'react';
import SideBarDemo from '../../components/dashboard/SidebarDemo';
import ActivityImgDemo from '../../components/history/ActivityImgDemo'; 
import ActivityVidDemo from '../../components/history/ActivityVidDemo';// Import the ActivityPage component

const ActivityDemo = () => {
  return (
    <div className="dark:bg-[#1C2222] min-h-screen bg-gray-100">
      <div className="mt-10vh"> {/* Adjusted margin-top */}
        <SideBarDemo />
        <ActivityImgDemo /> 
        <ActivityVidDemo /> {/* Include the ActivityPage component here */}
      </div>
    </div>
  );
};

export default ActivityDemo;

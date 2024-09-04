import React, { useState, useEffect } from 'react';
import Gif from "./bat.gif"
import Logo from "./logo.png"
// Assuming you have your Tailwind CSS imported here

const Preload = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black z-50 ${loading ? 'block' : 'hidden'}`}>
     <div class="relative flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500 relative"> </div>
        <img src={Logo} className="h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " alt="Logo" />
        </div>
      <img src={Gif} className=" h-28 w-28  mt-6" alt="Loading" />
      <p className="dark:text-white text-green-500 text-lg font-bold mt-4">cricshotAI</p>
      
    </div>
  );
};

export default Preload;

import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DemoLandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#1C2222] ">
      <div className="text-center px-6 py-8 bg-white shadow-lg rounded-lg max-w-md" data-aos="zoom-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Site is Under Maintenance</h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you an even better experience. In the meantime, feel free to explore our <span className="text-blue-500 font-bold">Demo pages</span> below!
        </p>

        <div className="space-y-4">
          <Link 
            to="/ProfileDemo" 
            className="block px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            Analysis  <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/ActivityDemo" 
            className="block px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            History <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/CheckshotVidDemo" 
            className="block px-6 py-3 bg-purple-500 text-white rounded-lg text-lg font-semibold hover:bg-purple-600 transition duration-300 flex items-center justify-center"
          >
            Video Analysis  <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/CheckshotDemo" 
            className="block px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            Image Analysis <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/SettingDemo" 
            className="block px-6 py-3 bg-purple-500 text-white rounded-lg text-lg font-semibold hover:bg-purple-600 transition duration-300 flex items-center justify-center"
          >
            Settings  <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/HelpDemo" 
            className="block px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            Help <FaArrowRight className="ml-2" />
          </Link>
        </div>
        
        <p className="text-red-500 mt-6 font-bold text-sm">
          The information displayed on these demo pages is hardcoded, ensuring that you receive consistent results every time.
        </p>
        <p className="text-gray-500 mt-4 text-sm">
          Thank you for your patience. We appreciate your understanding.
        </p>
      </div>
    </div>
  );
};

export default DemoLandingPage;
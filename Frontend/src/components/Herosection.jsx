import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaVideo } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import bgpicl from '../assets/pics/bgpic4.png'
import bgpicd from '../assets/pics/bgpic1.jpg'
import useTheme from "../context/theme";

const HeroSection = () => {
  
  const [text, setText] = useState("");
  const textArray = ['DRIVE', 'PULL', 'SWEEP', 'FLICK', 'CUT'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
 
  const bottomRef = useRef(null);
  const { theme } = useTheme();
  const pic = theme === "light" ? bgpicl : bgpicd;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);

  useEffect(() => {
    if (startTyping) {
      const currentText = textArray[currentTextIndex];

      if (textIndex < currentText.length) {
        setText(prevText => prevText + currentText[textIndex]);
        const timeoutId = setTimeout(() => {
          setTextIndex(prevIndex => prevIndex + 1);
        }, 300);

        return () => clearTimeout(timeoutId);
      } else {
        setStartTyping(false);
        setTimeout(() => setStartTyping(true), 300);
      }
    } else {
      if (text.length > 0) {
        const timeoutId = setTimeout(() => {
          setText(prevText => prevText.slice(0, -1));
        }, 300);

        return () => clearTimeout(timeoutId);
      } else {
        setCurrentTextIndex(prevIndex => (prevIndex + 1) % textArray.length);
        setTextIndex(0);
      }
    }
  }, [currentTextIndex, textIndex, startTyping]);

  useEffect(() => {
    setStartTyping(true);
  }, []);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (<div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-400 to-emerald-500" >
    
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-10  mt-20">
        <div className="text-center rounded-md">
          <p className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight mt-8 p-4">
            AI-Powered Cricshot Assistant
          </p>
          <h1 className="max-w-2xl mx-auto px-5 text-lg text-gray-800 font-inter">
            Turn every frame into a learning opportunity with CricShotAI - your ultimate cricket companion. Explore the artistry of cricketing shots like never before.
          </h1>
          <div className="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9 py-4">
            <button onClick={scrollToBottom} className="inline-flex animate-bounce items-center justify-center  px-8 py-3 text-lg font-bold"><FaAngleDown /></button>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-5vw mt-10">
        <div className="w-full items-center">
          <div className="mx-auto text-cyan-200 dark:text-cyan-100  p-14 md:w-2/3 opacity-80  rounded-md mt-5 mb-10 " style={{ backgroundImage: `url(${pic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="text-center rounded-md  " style={{ backgroundColor: 'rgba(0, 38, 0, 0.8)' }} >
            <p className="tracking-wider mb-6 lg:p-5  font-mono text-4xl font-extrabold md:pl-4 pl-2 " data-aos="zoom-in">
                  Check the shot
                </p>
              <p className="tracking-widest lg:text-4xl font-mono font-bold mb-2 py-2 " data-aos="zoom-in">Discover the Innovation</p>
            
             
              <div style={{ height: "50px", overflow: "hidden" }}>
                <p className="lg:text-4xl font-semibold text-[#f0f4f2] dark:white md:pl-4 pl-2">
                  {text}
                </p>
              </div>
            </div>
            <ul className="flex justify-center mt-4 space-x-4">
              <li className="">
                <a href="/Checkshot" className="relative  inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-black dark:text-white bg-gray-200 dark:bg-gray-800  rounded-lg group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-500"></span>
                  <span className="relative"> <FaFileImage className="text-4xl" />
                    <p className="text-sm">Image</p></span>
                </a>
              </li>
              <li className="">
                <a href="/CheckshotVid" className="relative  inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter  text-black dark:text-white bg-gray-200 dark:bg-gray-800 rounded-lg group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-400  rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-500"></span>
                  <span className="relative"> <FaVideo className="text-4xl" />
                    <p className="text-sm">Video</p> </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div ref={bottomRef} /> {/* Reference to the bottom of the component */}
    </div>
  );
};

export default HeroSection;

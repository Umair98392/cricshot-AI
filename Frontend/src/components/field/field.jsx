import React, { useState, useEffect } from 'react';
import Vid from '../../assets/video/video4.mp4';
import Vid2 from '../../assets/video/bannervideo_21_compressed.mp4';
import Vid3 from '../../assets/video/virat.mp4';
import Vid4 from '../../assets/video/mahi.mp4';
import { Link } from 'react-router-dom';
import useTheme from "../../context/theme";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Field = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [text, setText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  const { theme } = useTheme();
  const videoSource = theme === "light" ? Vid2 : Vid;

  const textArray = ['DRIVE', 'PULL', 'SWEEP', 'FLICK', 'CUT'];

  const handlePrevSlide = () => {
    const prevSlide = (currentSlide - 1 + 3) % 3;
    setCurrentSlide(prevSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = (currentSlide + 1) % 3;
    setCurrentSlide(nextSlide);
  };

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
        }, 300); // Typing speed in milliseconds

        return () => clearTimeout(timeoutId);
      } else {
        setStartTyping(false);
        setTimeout(() => setStartTyping(true), 300); // Delay before starting to backspace
      }
    } else {
      if (text.length > 0) {
        const timeoutId = setTimeout(() => {
          setText(prevText => prevText.slice(0, -1));
        }, 300); // Backspacing speed in milliseconds

        return () => clearTimeout(timeoutId);
      } else {
        setCurrentTextIndex(prevIndex => (prevIndex + 1) % textArray.length);
        setTextIndex(0);
      }
    }
  }, [currentTextIndex, textIndex, startTyping]);

  useEffect(() => {
    // Start the typing animation when the component mounts
    setStartTyping(true);
  }, []);

  return (
    <div id="carouselExampleCaptions" className="relative" data-te-carousel-init data-te-ride="carousel">
      {/* Carousel Indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0 " data-te-carousel-indicators>
        {[0, 1, 2].map(index => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${currentSlide === index && 'opacity-100'}`}
            aria-current={currentSlide === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      {/* Carousel Items */}
      <div className="relative w-full  h-[90vh]  mt-20   flex after:clear-both after:block after:content-['']">
        {/* First Carousel Item */}
        <div className={`relative float-left -mr-[100%]  w-full items-center justify-center !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`} data-te-carousel-fade data-te-carousel-item>
          <video src={videoSource} className="object-cover h-full w—full absolute -z-10" autoPlay loop muted />
          <div className="absolute inset-x-[10%] md:inset-x-[25%] bottom-5  py-5 text-center text-white md:block bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
  {/* Content */}
  <p className="lg:text-4xl font-bold mb-2 py-2 text-center " data-aos="fade-right">Discover the Innovation</p>
  <div>
    <p className="mb-6 lg:p-5  dark:text-white text-2xl font-bold md:pl-4 pl-2 text-center" data-aos="fade-left">
      Check the shot
    </p>
  </div>
  <div style={{ height: "50px", overflow: "hidden" }}>
    <p className="lg:text-4xl text-[#00df9a] md:pl-4 pl-2 text-center">
      {text}
    </p>
  </div>
  <Link to="/Checkshot" className=" ">
    <button href="#"  className='bg-[#00df9a] w-[200px] cursor-pointer rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
      Check the shot
    </button>
  </Link>
  


</div>

  
         
          
        </div>
        {/* Second Carousel Item */}
        <div className={`relative float-left -mr-[100%]  w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`} data-te-carousel-fade data-te-carousel-item>
  <video src={Vid3} className="object-cover h-full w-full absolute -z-10" autoPlay loop muted />
  <div className="absolute inset-x-[15%] bottom-5  py-5 text-center text-white md:block">
    <h5 className="text-xl">Second slide label</h5>
    <p>Some representative placeholder content for the second slide.</p>
    <Link to="/Checkshot" className="flex justify-center">
              <button href="#" data-aos="zoom-in" className='bg-[#00df9a] w-[200px] cursor-pointer rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
                Check the shot
              </button>
            </Link>
  </div>
</div>
        {/* Third Carousel Item */}
        <div className={`relative float-left -mr-[100%] w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`} data-te-carousel-fade data-te-carousel-item>
          <video src={Vid4} className="object-cover h-full w-full absolute -z-10" autoPlay loop muted />
          <div className="absolute inset-x-[15%] bottom-5  py-5 text-center text-white md:block">
            <h5 className="text-xl">Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
            <Link to="/Checkshot" className="flex justify-center">
              <button href="#" data-aos="zoom-in" className='bg-[#00df9a] w-[200px] cursor-pointer rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
                Check the shot
              </button>
            </Link>
            
          </div>
        </div>
      </div>
      {/* Carousel Controls */}
      <button className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none" type="button" onClick={handlePrevSlide} data-te-target="#carouselExampleCaptions" data-te-slide="prev">
        <span className="inline-block h-7 w-8">
          {/* SVG for Previous Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
      </button>
      <button className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none" type="button" onClick={handleNextSlide} data-te-target="#carouselExampleCaptions" data-te-slide="next">
        <span className="inline-block h-8 w-8">
          {/* SVG for Next Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
      </button>
      
    </div>
  );
}

export default Field;

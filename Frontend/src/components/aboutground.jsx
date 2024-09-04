import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopupImage from './PopupImage';
import Img from '../assets/pics/shots/shotdirection.png';
import AOS from 'aos';
import 'aos/dist/aos.css';


function AboutGround() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (
    <section className='py-20 px-4 md:px-0 bg-gray-100 dark:bg-[#1C2222]'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10'>
        <div className='md:w-1/2' 
         data-aos="zoom-in" // Existing animation direction
         >
          <h2 className='text-3xl md:text-4xl font-semibold text-center md:text-left text-gray-800 dark:text-white'>
            Cricket Shots And Ground Understandings
          </h2>
          <p className='py-6 md:text-lg  text-gray-700 dark:text-white'>
            In cricket, the type of shot a batsman plays depends on the line and length of the ball. Depending on the type of delivery and the field placement, a batsman may have to make adjustments while playing the shot.
          </p>
          
          <a href="/Shotcontent" className="inline-flex  font-medium text-blue-600 dark:text-blue-500 hover:underline items-center">
          For More About Cricket Shots
    <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</a>



          <p className='py-6 md:text-lg text-gray-700 dark:text-white'>
            The image showcases the direction in which a typical shot is played by the batsman. The image is for a right-handed batsman. For a left-handed batsman, you can use a mirror image of this image to understand the type of cricket shots.
          </p>
          <div className="card bg-white p-4 rounded-md shadow-lg my-5 md:max-w-[30rem] mx-auto  dark:bg-[#0e161a]  ">
            <p className=' md:text-lg text-gray-700 dark:text-white'>
              Fielding positions are an essential part of any cricket match, and if the captain places his or her players in the correct places, it can be key to the final outcome. Cricket is a sport with unique terminology, and many of the fielding positions come with their own idiosyncratic language. Click below to see the fielding positions.
            </p>
          
            <PopupImage />
         
          </div>
        </div>
        <img src={Img} alt="" className='md:w-1/2'  data-aos="zoom-in" // Existing animation direction
         />
      </div>
    </section>
  );
}

export default AboutGround;

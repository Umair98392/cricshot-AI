import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { FaXTwitter } from "react-icons/fa6";
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pic from '../../assets/pics/logo_3.png';
import { privateAxios} from "../../services/helper"

function Footer() {
  const [email, setEmail] = useState('');

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailRegex.test(email)) {
      try {
       
        const response = await privateAxios.post(`/subscribe`, {email});
  
        if (response.status >= 200 && response.status < 300) {
          toast.success('Thanks for subscribing!');
        }
      } catch (error) {
        toast.error(error.response.data.detail);
      }
    } else {
      // Email is not in the correct format
      toast.error('Please enter a valid email address.');
    }

    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-200 dark:bg-[#0E161A] text-center text-black dark:text-white py-6">
      <div className="container mx-auto">
        {/* Social media icons container */}
        <div className="flex justify-center mb-6">
          <h2 className="mr-2 font-bold text-2xl p-3">Social Media</h2>
          <a href="https://www.linkedin.com/in/umair98392/" className="social-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://twitter.com/umair98392" className="social-icon">
            <FaXTwitter/>
          </a>
          <a href="https://www.instagram.com/umair98392/" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        {/* Newsletter subscription form */}
        <div className="flex-col w-full md:flex-row md:justify-between gap-4 dark:text-white">
          <form onSubmit={handleFormSubmit} className="flex-col sm:flex-row items-center gap-2">
            <div className="text-center  md:text-right">
              <h1 className="mr-1 font-bold text-2xl p-5">Sign up for our Newsletter</h1>
            </div>
            
            <FontAwesomeIcon icon={faEnvelope} className='form-icon' />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-100 mt-2 dark:bg-[#1C2222] dark:text-white border rounded py-2 px-4 md:py-3 md:px-6 w-full md:w-[600px] focus:outline-none mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] py-2 md:py-3  text-xs font-medium uppercase leading-normal text-neutral-900 dark:text-white transition duration-50 ease-in-out hover:border-neutral-100 hover:text-black-600   active:border-neutral-200   "
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Toast container */}
        <ToastContainer />

        <hr className='mt-10 rounded bg-black dark:bg-gray-400 '></hr>

        {/* Contact and Quick Links */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-10 ">
          <div className="mb-6">
            <h2 className="mb-2.5 font-bold uppercase text-xl">Contact Us</h2>
            <ul className="mb-0 list-none text-center">
              <li className='mt-4 font-semibold'>
                <h4>Phone: +91 9839191428</h4>
              </li>
              <li className='mt-4 font-semibold'>
                <h4>Email: umair98392@gmail.com</h4>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="mb-2.5 font-bold uppercase text-xl ">Quick Links</h2>
            <ul className=" list-none mb-2">
              <li className='mt-4 font-semibold'>
                <a href="/" className="text-black dark:text-white ">Home</a>
              </li>
              <li className='mt-4 font-semibold'>
                <a href="/Checkshot" className="text-black dark:text-white">CheckShot</a>
              </li>
              <li className='mt-4 font-semibold'>
                <a href="/Shotcontent" className="text-black dark:text-white">LearnShot</a>
              </li>
            </ul>
          </div>
          <div className="mb-6 flex flex-col items-center">
            <img
              src={Pic} // Replace with your logo path
              alt="Website Logo"
              className="h-28"
            />
            <button onClick={scrollToTop} className="text-black dark:text-white  font-semibold mt-4">Back to top</button>
          </div>
        </div>

        {/* Footer separator */}
        <hr className='mt-10 rounded bg-black dark:bg-gray-400 '></hr>
        
        {/* Copyright */}
        <div className="mt-4 text-center">
          <p>&copy; {new Date().getFullYear()} cricshotAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

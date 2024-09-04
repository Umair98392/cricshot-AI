import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import logo from '../../assets/pics/logo.png';
import avatar from '../../assets/usera.png';
import { useNavigate } from 'react-router-dom';
import ThemeButton from '../../ThemeButton/ThemeButton';
import { isLoggedIn, getCurrentUserDetail, doLogout } from '../../auth'


function Header() {
  const [click, setClick] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSmallDropdown, setShowSmallDropdown] = useState(false);

  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setSignedIn(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [signedIn]);

  const logout = () => {
    doLogout(() => {
      setSignedIn(false);
      navigate("/");
    });
  };

  const handleAvatarClick = () => {
    setClick(false);
    setShowUserDropdown(!showUserDropdown); // Toggle the user dropdown visibility
    setShowDropdown(false);
    setShowSmallDropdown(false);
  };

  const handleClick = () => {
    setClick(!click);
    setShowDropdown(!showDropdown);
    setShowUserDropdown(false);
    setShowSmallDropdown(false); // Close the user dropdown
  };

  const handleSmallClick = () => {
    setClick(!click);
    setShowSmallDropdown(!showSmallDropdown);
    setShowDropdown(false);
    setShowUserDropdown(false); // Close the user dropdown
  };

  const handleLinkClick = () => {
    setClick(false);
    setShowDropdown(false);
    setShowUserDropdown(false);
    setShowSmallDropdown(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="h-20 flex justify-between z-50 dark:text-white text-black lg:py-2 px-5 sm:px-20 border-b bg-white dark:bg-[#0E1111]  dark:border-slate-800 border-[#00df9a]">
        <div className="flex items-center flex-1">
          <div className="text-white text-3xl font-bold flex items-center">
            <Link to="">
              <img src={logo} alt="Logo" className="h-12 w-12 mr-2 inline" />
              <h3 className="text-[18px] text-green-800 dark:text-white hidden lg:inline">cricshotAI</h3>
            </Link>
          </div>
        </div>
        <div className="lg:flex lg:flex-1 items-center justify-start font-normal hidden space-x-8">
          <div className="flex">
            <ul className="flex gap-4">
              <Link to="" onClick={handleLinkClick}>
                <button className="font-semibold text-green-800 hover:bg-green-700 hover:text-white hover:rounded-md transition-all duration-300 ease-linear cursor-pointer px-4 py-3">HOME</button>
              </Link>
              <div className="relative group">
                <button onClick={handleClick} className="font-semibold text-green-800 hover:bg-green-700 hover:text-white hover:rounded-md transition-all duration-300 ease-linear cursor-pointer text-bold px-4 py-3"> CHECK SHOT </button>
                {showDropdown && (
                  <div className="absolute bg-white dark:bg-[#0E1111] border border-green-600 dark:border-gray-900 rounded-md mt-1">
                    <Link to="/Checkshot" onClick={handleLinkClick}>
                      <button className="block w-full text-centre px-4 py-2 hover:bg-green-700 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white font-semibold">FOR IMAGE</button>
                    </Link>
                    <Link to="/CheckshotVid" onClick={handleLinkClick}>
                      <button className="block w-full text-centre px-4 py-2 hover:bg-green-700 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white font-semibold">FOR VIDEO</button>
                    </Link>
                  </div>
                )}
              </div>
              <Link to="Shotcontent" onClick={handleLinkClick}>
                <button className="font-semibold text-green-800 hover:bg-green-700 hover:text-white hover:rounded-md transition-all duration-300 ease-linear cursor-pointer text-bold px-4 py-3">LEARN SHOTS</button>
              </Link>

              {/* Add by umair on 3 Sept 2024 */}
              <Link to="ProfileDemo" onClick={handleLinkClick}>
                <button className="font-semibold text-green-800 hover:bg-green-700 hover:text-white hover:rounded-md transition-all duration-300 ease-linear cursor-pointer text-bold px-4 py-3">DEMO PROFILE</button>
              </Link>
              {/* end by umair */}
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="block lg:hidden" onClick={handleSmallClick}>
            {click ? <FaTimes className="h-6 w-5 mr-2 " /> : <RiMenu3Line className="h-8 w-5 mr-2 " />}
          </button>
          <ThemeButton />
          {signedIn ? (
            <div className="user-avatar relative" onClick={handleAvatarClick}>
              <img src={avatar} alt={user.name} className="avatar-img h-10 w-10" />
              {showUserDropdown && (
                <div className="dropdown absolute right-0 mt-2 w-40 bg-white dark:bg-[#0E1111] border border-green-600 dark:border-gray-900 rounded-md shadow-md">
                  <Link to="/Profile" onClick={handleLinkClick}>
                    <button className="block w-full text-center px-3 py-2 hover:bg-green-700 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white font-semibold">Profile</button>
                  </Link>
                  <Link to="/Setting" onClick={handleLinkClick}>
                    <button className="block w-full text-center px-3 py-2 hover:bg-green-700 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white font-semibold">Settings</button>
                  </Link>
                  <button className="block w-full text-center px-3 py-2 hover:bg-green-700 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white font-semibold" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/Signinup" onClick={handleLinkClick}>
                <button type="button" className="focus:outline-none text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log In</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Responsive menu */}
      {click && (
        <div className="lg:hidden block absolute top-16 w-full left-0 right-0 z-10 bg-white dark:bg-[#0E1111] dark:bg-opacity-85 bg-opacity-95">
          <ul className="text-center text-xl p-5">
            <Link to="" onClick={handleLinkClick}>
              <li className="dark:hover:text-[#00df9a] hover:text-[#00df9a] transition dark:text-white dark:bg-black my-4 py-4 border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                Home
              </li>
            </Link>
            <Link to="Checkshot" onClick={handleLinkClick}>
              <li className="dark:hover:text-[#00df9a] hover:text-[#00df9a] transition dark:text-white dark:bg-black my-4 py-4 border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                CheckShot [Image]
              </li>
            </Link>
            <Link to="CheckshotVid" onClick={handleLinkClick}>
              <li className="dark:hover:text-[#00df9a] hover:text-[#00df9a] transition dark:text-white dark:bg-black my-4 py-4 border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                CheckShot [Video]
              </li>
            </Link>
            <Link to="Shotcontent" onClick={handleLinkClick}>
              <li className="dark:hover-text-[#00df9a] hover:text-[#00df9a] my-4 py-4 dark:text-white dark:bg-black border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                Learn Shots
              </li>
            </Link>
            <Link to="DemoLandingPage" onClick={handleLinkClick}>
              <li className="dark:hover-text-[#00df9a] hover:text-[#00df9a] my-4 py-4 dark:text-white dark:bg-black border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                Demo Profile
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;

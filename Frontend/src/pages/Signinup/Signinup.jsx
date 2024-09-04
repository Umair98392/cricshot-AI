import React, { useState } from 'react';
import SignInForm from './../../components/forms/Signin';
import SignUpForm from './../../components/forms/Signup';
import Log from './../../assets/svg/reg.svg';
import Sign from './../../assets/svg/register.svg';
import './../../components/forms/SignInSignUpForm.css';

const Signinup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`containerr mx-auto ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container dark:bg-[#1C2222] mt-8">
        <div className="signin-signup">
          {isSignUpMode ? (
            <SignUpForm handleSignUp={handleSignUpClick} handleSignIn={handleSignInClick} />
          ) : (
            <SignInForm handleSignIn={handleSignInClick} />
          )}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content mt-20">
            <h3  className="text-2xl mb-1 font-semibold ">New here ?</h3>
            <p className="mb-4 font-semibold  ">Join us now! Signing up is quick and easy. Let's get started!</p>
            <button className="btn bg-transparent border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="sign-up-btn" onClick={handleSignUpClick}>Sign up</button>
          </div>
          <img src={Sign} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content mt-20">
            <h3  className="text-2xl mb-1 font-semibold ">One of us ?</h3>
            <p className="mb-4 font-semibold ">Welcome back! Log in now to access your account and continue your journey with us.</p>
            <button className="btn bg-transparent border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="sign-in-btn" onClick={handleSignInClick}>Sign in</button>
          </div>
          <img src={Log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signinup;

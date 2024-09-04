import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Log from '../../assets/svg/reg.svg';
import Git from '../../assets/svg/gitl.svg';
import { signUp } from "../../services/user_service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ handleSignUp, handleSignIn }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [isChecked, setIsChecked] = useState(false); 

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  });


  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!isChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}/;
    const isPasswordValid = passwordPattern.test(data.password);

    if (!isPasswordValid) {
      const requirementsMessage = "Password must contain:";
      const requirements = [
        "Minimum 6 characters with at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character."
      ];
      const errorMessage = `${requirementsMessage}\n- ${requirements.join('\n- ')}`;
      toast.error(errorMessage);
      return;
    }

    signUp(data)
      .then((resp) => {
        toast.success("User is Registered Successfully");
        setData({
          name: '',
          email: '',
          password: ''
        });
        setShowTermsModal(false);
        handleSignIn(); // Switch to sign-in mode after successful registration
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        toast.error("Email is already Registered.Please Log in");
        setError({
          errors: error,
          isError: true
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? 'password' : 'text');
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-gray-100 dark:bg-[#1C2222] ">
      <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
        <form onSubmit={submitForm} action="#" className="bg-white dark:bg-[#0e161a] border border-gray-300 dark:border-gray-700 bg-opacity-40 dark:bg-opacity-40 rounded-lg p-12 flex flex-col items-center justify-center shadow-lg">
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-6">Sign Up</h2>
          <div className="input-field flex items-center mb-6">
            <FontAwesomeIcon icon={faUser} className='form-icon mr-2 text-gray-600 dark:text-gray-400' />
            <input type="text"
              placeholder="Username"
              value={data.name}
              onChange={(e) => handleChange(e, 'name')}
              required className="border border-gray-400 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-green-500 dark:bg-gray-200 dark:text-gray-900" />
          </div>
          <div className="input-field flex items-center mb-6">
            <FontAwesomeIcon icon={faEnvelope} className='form-icon mr-2 text-gray-600 dark:text-gray-400' />
            <input type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => handleChange(e, 'email')}
              required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" className="border border-gray-400 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-green-500 dark:bg-gray-200 dark:text-gray-900" />
          </div>
          <div className="input-field flex items-center mb-6">
            <FontAwesomeIcon icon={faLock} className='form-icon mr-2 text-gray-600 dark:text-gray-400' />
            <input type={passwordType}
              placeholder="Password"
              value={data.password}
              onChange={(e) => handleChange(e, 'password')}
              required  className="border border-gray-400 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-green-500 dark:bg-gray-200 dark:text-gray-900" />
            <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
              {showPassword ? (<FaEyeSlash className="text-gray-600 dark:text-gray-400" />) : (<FaEye className="text-gray-600 dark:text-gray-400" />)}
            </button>
          </div>
          <div className="flex items-center mb-6">
            <input id="link-checkbox" type="checkbox" value={isChecked} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with the <button className="text-blue-600 dark:text-blue-500 hover:underline" onClick={toggleTermsModal}>terms and conditions</button>.
            </label>
          </div>
          <button type="submit" disabled={!isChecked} className=" mt-2 items-center justify-center bg-green-700 px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-white  hover:border-gray-400 dark:hover:border-gray-500  hover:shadow-md transition duration-300">Sign Up to your account</button>

       
          {/* <div className="inline-flex items-center justify-center w-full">
            <hr className="w-24 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="font-medium text-gray-900 dark:text-white ">or</span>
            <hr className="w-24 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          <div className="flex flex-col items-center mt-2">
            <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-400 hover:shadow-md transition duration-300">
              <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google logo" />
              <span>Sign Up with Google</span>
            </button>
            <button type="button" className="flex items-center justify-center mt-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-400 hover:shadow-md transition duration-300">
              <img className="w-6 h-6 mr-2" src={Git} loading="lazy" alt="Github logo" />
              <span>Sign Up with Github</span>
            </button>
          </div> */}

          {showTermsModal && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-14 rounded-lg bg-opacity-90">
      <h2 className="text-lg font-semibold mb-4 text-center">Terms and Conditions</h2>
      <ul className="list-disc pl-6">
        <li>By signing up, you agree to our terms and conditions.</li>
        <li>You must provide accurate information during signup.</li>
        <li>Your account credentials are for your use only.</li>
        <li>We may send you updates and promotional offers via email.</li>
        <li>We respect your privacy and will not share your information.</li>
        <li>Violation of these terms may result in account suspension.</li>
      </ul>
      <button className="mt-4 btn bg-green-500 text-white" onClick={toggleTermsModal}>Close</button>
    </div>
  </div>
)}
        </form>
      </div>
    </section>
  );
};

export default SignUp;
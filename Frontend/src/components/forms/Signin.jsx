import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Git from  '../../assets/svg/gitl.svg';
import './SignInSignUpForm.css'
import {loginUser} from "../../services/user_service";
import { doLogin } from '../../auth';
import {useNavigate} from "react-router-dom"

const Signin = () => {
  
  //backend starts
  const navigate=useNavigate()

  const[loginDetail,setLoginDetail]=useState({
    username:'',
    password:''
  })
  
  const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    });
  };

  const handleFormSubmit=(event)=>{
    event.preventDefault();

    //validation
    if(loginDetail.username.trim()==''){
      toast.error("Username is required !!!")
      return;
    }
    if(loginDetail.password.trim()==''){
      toast.error("Password is required !!!")
      return;
    }

    //submit the data to server to generate token
  loginUser(loginDetail).then((response)=>{
    if(response.status==288){
    toast.error("Invalid Credentials!!!")

    }else{

    //save the data local storage
      doLogin(response.data,()=>{
      //redirect to user dashboard page
         navigate("/");
         window.location.reload();
      })
    }
   // toast.success("Login Successfully")
  }).catch(error=>{
    console.log(error)
    // toast.error("Invalid Credentials!!!")
  })
  
  }
  
  //backend end
  
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setShow(!show);
    setPasswordType(show ? 'password' : 'text');
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center  bg-gray-100 dark:bg-[#1C2222] ">
     
      <div className="md:w-1/3 p-8 flex flex-col items-center justify-center">
        <form onSubmit={handleFormSubmit} action="#" className="bg-white dark:bg-[#0e161a] border border-gray-300 dark:border-gray-700 bg-opacity-40 dark:bg-opacity-40 rounded-lg p-8 flex flex-col items-center justify-center shadow-lg">
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-6 text-left">Welcome Back!</h2>
          <div className="input-field flex items-center mb-6">
            <FontAwesomeIcon icon={faUser} className='form-icon mr-2 text-gray-600 dark:text-gray-400' />
            <input type="text"
             placeholder="Email"
              required className="border border-gray-400 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-green-500 dark:bg-gray-200 dark:text-gray-900"
              //springboot starts
              value={loginDetail.username}
              onChange={(e)=>handleChange(e,'username')}
              />
        

          </div>
          <div className="input-field flex items-center mb-6">
            <FontAwesomeIcon icon={faLock} className='form-icon mr-2 text-gray-600 dark:text-gray-400' />
            <input type={passwordType} 
            placeholder="Password"
             //spring boot starts
             value={loginDetail.password}
             onChange={(e)=>handleChange(e,'password')}
             required className="border border-gray-400 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-green-500 dark:bg-gray-200 dark:text-gray-900" />
             <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
             {show ? (<FaEyeSlash className="text-gray-600 dark:text-gray-400" />) : (<FaEye className="text-gray-600 dark:text-gray-400" />)}
            </button>
          </div>
          <button type="submit" className=" mt-2 items-center justify-center bg-green-700 px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-white  hover:border-gray-400 dark:hover:border-gray-500  hover:shadow-md transition duration-300">Sign in to your account</button>

          
{/*           
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-24 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="font-medium text-gray-900 dark:text-white ">or</span>
            <hr className="w-24 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          <div className="flex flex-col items-center mt-2">
          
            <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-400 hover:shadow-md transition duration-300">
              <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google logo" />
              <span>Sign in with Google</span>
            </button>
            <button type="button" className="flex items-center justify-center mt-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-400 hover:shadow-md transition duration-300">
              <img className="w-6 h-6 mr-2" src={Git} loading="lazy" alt="Github logo" />
              <span>Sign in with Github</span>
            </button>
          </div>

          */}
        </form>
      </div>
    </section>
  );
};

export default Signin;

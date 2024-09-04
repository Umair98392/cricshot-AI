import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import SideBarDemo from '../../components/dashboard/SidebarDemo';
import 'react-toastify/dist/ReactToastify.css';

// Component for displaying account details
function AccountDetailsForm({ username, email }) {
  return (
    <div className="w-full mx-auto bg-green-300 dark:bg-[#0e161a] p-5 rounded-lg bg-opacity-10">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-semibold mb-2">Username:</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className='form-icon mr-2' />
          <input
            type="text"
            id="username"
            value={username}
            readOnly={true}
            className="mt-1 px-4 py-2 font-semibold border rounded-md w-full bg-white dark:text-black"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className='form-icon mr-2' />
          <input
            type="text"
            id="email"
            value={email}
            readOnly={true}
            className="mt-1 px-4 py-2 font-semibold border rounded-md w-full bg-white dark:text-black"
          />
        </div>
      </div>
    </div>
  );
}

// Component for changing password
function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setShow(!show);
    setPasswordType(show ? 'password' : 'text');
  };


  return (
    <div className="max-w-2xl w-full mx-auto mt-20 bg-green-300 dark:bg-[#0e161a] p-8 rounded-lg bg-opacity-10">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            className="mt-1 px-4 py-2 border rounded-md w-full bg-white dark:text-black"
            value={currentPassword}
            readOnly={true}
            label="currentpassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">New Password:</label>
          <div className="relative">
            <input
              type={passwordType}
              id="newPassword"
              className="mt-1 px-4 py-2 border rounded-md w-full bg-white dark:text-black"
              value={newPassword}
              readOnly={true}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="button" className="absolute right-3 top-3" onClick={togglePasswordVisibility}>
              {show ? (
                <FontAwesomeIcon icon={faEyeSlash} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 px-4 py-2 border rounded-md w-full bg-white dark:text-black"
            value={confirmPassword}
            readOnly={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={null} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Change Password</button>
      </form>
    </div>
  );
}

// Parent component that renders both forms
function SettingDemo() {
  // Hardcoded dummy user details
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div className="dark:bg-[#1C2222] bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex mt-20">
        <SideBarDemo />
        <div className="dark:text-white ml-10 p-10 max-w-3xl w-full mx-auto">
          <AccountDetailsForm username={user.name} email={user.email} />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default SettingDemo;

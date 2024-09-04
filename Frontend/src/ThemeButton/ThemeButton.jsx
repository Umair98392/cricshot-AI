import React from 'react';
import useTheme from '../context/theme';
import { FaSun } from 'react-icons/fa';
import { BsMoonStars } from 'react-icons/bs';

function ThemeButton() {
  const { theme, darkMode, lightMode } = useTheme();

  const onToggleTheme = () => {
    if (theme === 'dark') {
      lightMode();
    } else {
      darkMode();
    }
  };

  return (
    <button
      className={`relative flex items-center justify-center cursor-pointer px-4 py-2 focus:outline-none ${
        theme === 'dark' ? 'bg-gray-900 text-white rounded-lg  mr-1' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg  mr-1'
      }`}
      onClick={onToggleTheme}
    >
      {theme === 'dark' ? (
        <BsMoonStars className="h-6 w-6 ml-1" />
      ) : (
        <FaSun className="h-6 w-6 ml-1" />
      )}
    </button>
  );
}

export default ThemeButton;

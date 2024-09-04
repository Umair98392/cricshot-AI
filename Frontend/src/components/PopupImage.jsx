import React, { useState } from 'react';

function PopupImage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <a href="javascript:void(0)" onClick={openPopup} className='flex font-medium text-blue-600 dark:text-blue-500 hover:underline  hover:text-green-5items-center  '>Click to open image</a>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 " onClick={closePopup}></div>
          <div className="bg-white p-2 rounded-lg shadow-lg z-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cricket_fielding_positions2.svg/574px-Cricket_fielding_positions2.svg.png" alt="Popup" />
            <button onClick={closePopup} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupImage;

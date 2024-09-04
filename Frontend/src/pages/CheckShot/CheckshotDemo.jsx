import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Vid from '../../assets/video/load.mp4';
import defaultImage from '../../assets/pics/cam1.png';
import darkImage from '../../assets/pics/camdark.png';
import useTheme from '../../context/theme';
import { getCurrentUserDetail } from '../../auth';
import Img1 from '../../assets/pics/img_with_bboxes.jpg';
import Img2 from '../../assets/pics/img_with_keypoints.jpg';
import Img3 from '../../assets/pics/img_with_predictions.jpg';

function Checkshot() {
  const [PredictedConfidence, setPredictedConfidence] = useState('N/A');
  const [PredictedShot, setPredictedShot] = useState('N/A');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictedImages, setPredictedImages] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  useEffect(() => {
    if (getCurrentUserDetail() !== undefined) {
      setUser(getCurrentUserDetail());
    }
  }, []);

  const { theme } = useTheme();
  const videoSource = theme === 'light' ? defaultImage : darkImage;

  const handlePredictButtonClick = () => {
    setPredictedConfidence('N/A');
    setPredictedShot('N/A');
    setPredictedImages([]);
    setImageIndex(0);
    setShowAllImages(false);

    if (!uploadedImage) {
      alert('Please upload an image to predict.');
      return;
    }

    // Static predictions without backend
    const staticData = {
      confidence: '95%',
      predicted_shot: 'Pull Shot',
      result_image_1: Img1,
      result_image_2: Img2,
      result_image_3:Img3,
    };

    setLoaderVisible(true);

    setTimeout(() => {
      setPredictedConfidence(staticData.confidence);
      setPredictedShot(staticData.predicted_shot);
      setPredictedImages([
        staticData.result_image_1,
        staticData.result_image_2,
        staticData.result_image_3,
      ]);

      setImageIndex(0);
      setImageVisible(true);
      setLoaderVisible(false);
      setModalVisible(true);

      if (user.id !== 0) {
        console.log('Image Data is saved:', staticData);
      }
    }, 2000);
  };

  useEffect(() => {
    let slideshowTimer;
    const incrementImageIndex = () => {
      if (imageIndex < predictedImages.length - 1) {
        setImageIndex(imageIndex + 1);
      } else if (imageIndex === predictedImages.length - 1) {
        setShowAllImages(true);
      }
    };

    if (imageVisible) {
      slideshowTimer = setTimeout(incrementImageIndex, 3000);
    }

    return () => {
      clearTimeout(slideshowTimer);
    };
  }, [imageIndex, predictedImages, imageVisible]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    setUploadedImage(file);
    setImageVisible(true);
  };

  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const getDescriptionAndLink = (PredictedShot) => {
    let description = '';
    let link = '';

    if (PredictedShot === 'Drive') {
      description = 'Drives are straight-batted shots, played by swinging the bat in a vertical arc through the line of the ball. ';
      link = '/Shotcontent/Drive';
    } else if (PredictedShot === 'Legglance-Flick') {
      description = 'When a ball is flicked towards the leg side with the straight bat and some wrist work. ';
      link = '/Shotcontent/Legglance';
    } else if (PredictedShot === 'Pullshot') {
      description = 'Stunning back foot shots played on the leg side on short-pitched deliveries. ';
      link = '/Shotcontent/Pull';
    } else if (PredictedShot === 'Sweep') {
      description = 'The sweep shots are cross-batted shots played on the front foot, usually by kneeling on one knee.';
      link = '/Shotcontent/Sweep';
    } else if (PredictedShot === 'Cut-Shot') {
      description = 'Cuts shots are basically cross-batted shots played at a short delivery.';
      link = '/Shotcontent/Cut';
    } else {
      description = 'An unknown shot. ';
      link = 'Learn more about cricket shots';
    }

    return { description, link };
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#1C2222]">
      <main className="w-full max-w-screen-md p-2">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white" data-aos="zoom-in">Cricket PoseNet: AI Shot Recognition</h1>
        </div>

        <label
          className={`bg-gray-50 dark:bg-[#0e161a] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col justify-center items-center cursor-pointer ${
            isDragging ? 'border-blue-500' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2 className="text-xl font-bold text-center mb-4 dark:text-white"  data-aos="zoom-in" >Upload an Image</h2>
          {uploadedImage && (
            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Image" className="mt-2 max-w-xs" style={{ width: '200px' }} />
          )}
          {!uploadedImage && (
            <img src={videoSource} alt="Default Image" className="mt-2" style={{ width: '140px', height: '100px' }} />
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Drag and drop image here or click to browse</p>
        

        <div className="text-center mt-3" data-aos="zoom-in">
          <button
            onClick={handlePredictButtonClick}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
          >
            Predict
          </button>

          <button
            onClick={handleRefreshButtonClick}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-2"
          >
            Refresh
          </button>
        </div>

        </label>


        <div id="loader" className={`text-center ${loaderVisible ? 'block' : 'hidden'}`}>
          {loaderVisible ? (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 flex items-center justify-center">
              <div style={{ width: '30%', height: '30%', position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
                <video autoPlay loop muted className="w-full h-full rounded-lg" style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                  <source src={Vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal */}
        {modalVisible && (
  <>
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-95 z-40"></div>
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <div className="text-white bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-md p-1 shadow-md max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-3">
          <svg
            className="animate-spin h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.293-2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L6 12.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4z"
            ></path>
          </svg>
          <h2 className="text-xl ">Processing..</h2>
        </div>
        <div className="flex justify-center">
          {predictedImages.map((image, index) => (
            <img
              key={index}
              style={{ maxWidth: '250px' }}
              className={`predicted-image max-w-xs mx-auto absolute p-4 duration-1000 ease-in-out border-dashed border-2 rounded-md border-indigo-500 shadow-lg shadow-cyan-500/50 ... ${
                index === imageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={image}
              alt={`Predicted ${index}`}
              onLoad={() => {
                if (index === predictedImages.length - 1) {
                  setTimeout(() => {
                    handleCloseModal();
                  }, 9000); // Close the modal after 9 seconds (9000 milliseconds)
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </>
)}


        <section className="mt-4 text-center relative">
          {showAllImages && (
            <div className="bg-gray-100 dark:bg-[#0e161a] border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4" data-aos="fade-up">
               <div className="bg-green-100 border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4 inline-block" >
              <h2 className="text-xl font-bold text-center text-green-800 mb-4" data-aos="zoom-in" >Prediction Result</h2>
              <p className="text-md text-gray-700">
                Confidence: <span id="predicted-age" className="font-bold text-green-700 text-center">
                  {PredictedConfidence}
                </span>
              </p>
              <p className="text-md text-gray-700">
                Predicted Shot: <span id="predicted-gender" className="font-bold text-green-700 text-center">
                  {PredictedShot}
                </span>
              </p>
              </div>
              <div className="bg-white-100 border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4 block">
              <p className="text-md text-gray-700 italic dark:text-white" data-aos="fade-right" >
              {getDescriptionAndLink(PredictedShot).description}
              </p>
              <p className="text-md text-gray-700 font-bold dark:text-white dark:hover:text-cyan-900 hover:text-green-900"  data-aos="fade-right">
              <Link to={getDescriptionAndLink(PredictedShot).link}>
              Know more
                </Link>

                </p>

                </div>


              <div className="flex flex-wrap justify-center" data-aos="fade-left" >
                {predictedImages.map((image, index) => (
                  <div key={index} className="w-full md:w-1/3 lg:w-1/2 p-2">
                    <img className="predicted-image max-w-xs mx-auto mb-2" src={image} style={{ maxWidth: '200px' }} alt={`Predicted ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Checkshot;

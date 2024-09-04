import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Checkshot from "./pages/CheckShot/Checkshot.jsx";
import Shotcontent from "./pages/AboutShot/Shotcontent.jsx";
import Defense from "./pages/AboutShot/Shotinfo/defense.jsx";
import Cut from "./pages/AboutShot/Shotinfo/Cut.jsx";
import Pull from "./pages/AboutShot/Shotinfo/Pull.jsx";
import Sweep from "./pages/AboutShot/Shotinfo/Sweep.jsx";
import Drive from "./pages/AboutShot/Shotinfo/Drive.jsx";
import Legglance from "./pages/AboutShot/Shotinfo/Legglance.jsx";
import Inno from "./pages/AboutShot/Shotinfo/Inno.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Setting from "./pages/Profile/Setting.jsx";
import Activity from "./pages/Profile/Activity.jsx";
import Help from "./pages/Profile/Help.jsx";
import CheckshotVid from "./pages/CheckShotVid/CheckshotVid.jsx";
import Signinup from "./pages/Signinup/Signinup.jsx";
import NotFound from './components/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add by umair on 23 aug 2024
import DemoLandingPage from "./pages/home/DemoLandingPage.jsx";
import CheckshotDemo from "./pages/CheckShot/CheckshotDemo.jsx";
import CheckshotVidDemo from "./pages/CheckShotVid/CheckshotVidDemo.jsx";
import ProfileDemo from "./pages/Profile/ProfileDemo.jsx"; 
import SettingDemo from "./pages/Profile/SettingDemo.jsx";
import ActivityDemo from "./pages/Profile/ActivityDemo.jsx";
import HelpDemo from "./pages/Profile/HelpDemo.jsx";
//end by umair


ReactDOM.render(
  
    <Router>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/Checkshot" element={<Checkshot />} />
          <Route path="/CheckshotVid" element={<CheckshotVid />} />
          <Route path="/Shotcontent" element={<Shotcontent />} />
          <Route path="/Shotcontent/Defense" element={<Defense />} />
          <Route path="/Shotcontent/Cut" element={<Cut />} />
          <Route path="/Shotcontent/Pull" element={<Pull />} />
          <Route path="/Shotcontent/Sweep" element={<Sweep />} />
          <Route path="/Shotcontent/Drive" element={<Drive />} />
          <Route path="/Shotcontent/Legglance" element={<Legglance />} />
          <Route path="/Shotcontent/Inno" element={<Inno />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Signinup" element={<Signinup/>}/>
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          
          {/*  Add by umair on 23 aug 2024 */}
          <Route path="/DemoLandingPage" element={<DemoLandingPage />} />
          <Route path="/CheckshotDemo" element={<CheckshotDemo />} />
          <Route path="/CheckshotVidDemo" element={<CheckshotVidDemo  />} />
          <Route path="/ProfileDemo" element={<ProfileDemo />} />
          <Route path="/ActivityDemo" element={<ActivityDemo />} />
          <Route path="/SettingDemo" element={<SettingDemo />} />
          <Route path="/HelpDemo" element={<HelpDemo />} /> 
          {/* end by umair */}
        </Route>
      </Routes>
    </Router>
  ,
  document.getElementById("root")
);

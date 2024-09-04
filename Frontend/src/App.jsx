import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/theme";
import {VideoProvider} from './context/videodata.jsx';

function App() {
  // Load the theme from local storage or use the default theme "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  useEffect(() => {
    // Update the HTML class and save the theme to local storage when it changes
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // State variable to track whether certain components are used
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Logic to determine if the footer should be hidden based on the current route
    if (location.pathname === "/Setting"
     ||
    location.pathname === "/Profile" ||
    location.pathname === "/Help" ||
    location.pathname === "/Activity" 
  ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);

  const darkMode = () => {
    setTheme("dark");
  };

  const lightMode = () => {
    setTheme("light");
  };

  return (
    <VideoProvider>
    <ThemeProvider value={{ theme, darkMode, lightMode }}>
      <Header />
      <Outlet />
      {showFooter && <Footer />}
    </ThemeProvider>
    </VideoProvider>
  );
}

export default App;

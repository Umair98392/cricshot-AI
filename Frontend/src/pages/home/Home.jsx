// Home.jsx

import React, { useState, useEffect } from 'react';

import Herosection from '../../components/Herosection'
import Aboutcheck from '../../components/aboutckeck';
import Aboutground from '../../components/aboutground';
import Team from '../../components/team/team';
import Field from '../../components/field/field';
import Quote from '../../components/Quote';
import Accordion from '../../components/Accordian';
import Preloader from '../../components/preload';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading for demonstration
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Herosection />
          <Aboutcheck />
          <Quote />
          <Aboutground />
          <Accordion />
          <Team />
        </>
      )}
    </div>
  );
}

export default Home;

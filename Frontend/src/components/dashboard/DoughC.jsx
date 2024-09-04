import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getLastMatchData, getCurrentMatchData } from '../../services/video_service';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughC = ({ current_match_data }) => {
  const [shotCounts2, setShotCounts2] = useState({ bowled_count: 0, cover_drive_count: 0, defence_count: 0, pull_count: 0, reverse_sweep_count: 0 });
  

  useEffect(() => {
    if (current_match_data) {
      
      const { bowled_count, cover_drive_count, defence_count, pull_count, reverse_sweep_count } = current_match_data;

      setShotCounts2({ bowled_count, cover_drive_count, defence_count, pull_count, reverse_sweep_count });
    }
  }, [current_match_data]);
  
 
  const data = {
    labels: ['Bowled', 'Cover Drive', 'Defence', 'Pull', 'Reverse Sweep'],
    datasets: [
      {
        label: 'No.of Shots',
        data: Object.values(shotCounts2),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughC;

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCurrentUserDetail } from '../../auth';
import { getLastMatchData } from '../../services/video_service';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['Bowled', 'Cover Drive','Defence', 'Pull',  'Reverse Sweep'];

const LineCDemo = () => {
  const [shotCounts, setShotCounts] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });
  const [videodata, setVideoData] = useState({});

  //spring start
  const[user,setUser]=useState(0);
  const[lastMatchData,setLastMatchData]=useState({})
  const [shotCounts1, setShotCounts1] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Last Match',
        data: [0.65, 0.7, 0.6, 0.48, 0.6], // Hardcoded values for last match
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Current Match',
        data: [0.7, 0.88, 0.6, 0.51, 0.5], // Hardcoded values for current match
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default LineCDemo;

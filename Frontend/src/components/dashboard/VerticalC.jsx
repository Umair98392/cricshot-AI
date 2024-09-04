import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
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
  scales: {
    x: {
      display: false, // Hide x-axis values
    },
  },
};

const labels = ['Cover Drive', 'Pull', 'Defence', 'Reverse Sweep',];

const VerticalC = ({current_match_data}) => {
  const [shotCounts4, setShotCounts4] = useState({
    cover_drive_shot_runs: 0,
    pull_shot_runs: 0,
    defence_shot_runs: 0,
    reverse_sweep_shot_runs: 0,
    
  });

  useEffect(() => {
    if (current_match_data) {

      const { cover_drive_shot_runs, pull_shot_runs, defence_shot_runs, reverse_sweep_shot_runs} = current_match_data;
    
      setShotCounts4({ cover_drive_shot_runs, pull_shot_runs, defence_shot_runs, reverse_sweep_shot_runs});
    }
  }, [current_match_data]);


  const data = {
    labels,
    datasets: [
      {
        label: '% of runs',
        data: Object.values(shotCounts4),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default VerticalC;

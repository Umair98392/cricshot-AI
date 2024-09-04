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

const labels = ['Cover Drive', 'Pull', 'Defence', 'Reverse Sweep'];

const VerticalC = () => {
  // Remove useEffect and state since we're using hardcoded values
  const shotCounts = {
    cover_drive_shot_runs: 10,  // Hardcoded values
    pull_shot_runs: 6,         // Hardcoded values
    defence_shot_runs: 1,      // Hardcoded values
    reverse_sweep_shot_runs: 4,// Hardcoded values
  };

  const data = {
    labels,
    datasets: [
      {
        label: '% of runs',
        data: [
          shotCounts.cover_drive_shot_runs,
          shotCounts.pull_shot_runs,
          shotCounts.defence_shot_runs,
          shotCounts.reverse_sweep_shot_runs,
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default VerticalC;

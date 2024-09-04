import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCurrentUserDetail } from '../../auth';
import { getLastMatchData} from '../../services/video_service';
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

const LineC = ({current_match_data}) => {
  const [shotCounts, setShotCounts] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });
  const [videodata, setVideoData] = useState({});

  //spring start
  const[user,setUser]=useState(0);
  const[lastMatchData,setLastMatchData]=useState({})
  const [shotCounts1, setShotCounts1] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });
  
  useEffect(() => {
    async function fun() {
      const currentUserDetail = await getCurrentUserDetail();
      if (currentUserDetail != undefined)
        setUser(currentUserDetail)
      }
      fun();
  }, [])
  
  const userId=user.id;

  
  useEffect(() => {
    const fetchData = async () => {
        if (current_match_data) {
          
          const { bowled_avg_prob, cover_drive_avg_prob, defence_avg_prob, pull_avg_prob, reverse_sweep_avg_prob } = await current_match_data;

          setShotCounts({ bowled_avg_prob, cover_drive_avg_prob, defence_avg_prob, pull_avg_prob, reverse_sweep_avg_prob });
        }
    }
    fetchData();
  }, [current_match_data]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch last match data
            const data = await getLastMatchData(userId);

            // Destructure the data
            const { bowled_avg_prob, cover_drive_avg_prob, defence_avg_prob, pull_avg_prob, reverse_sweep_avg_prob } = data ;

            // Update state
            setShotCounts1({ bowled_avg_prob, cover_drive_avg_prob, defence_avg_prob, pull_avg_prob, reverse_sweep_avg_prob });

        } catch (error) {
            console.error("Error fetching last match data:", error);
        }
    };

    fetchData();
  },[ userId])


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Last Match',
       // backend start
       data: Object.values(shotCounts1),//setting last match data
       //backend end
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Current Match',
        data: Object.values(shotCounts), // Changed to Object.values(shotCounts)
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default LineC;

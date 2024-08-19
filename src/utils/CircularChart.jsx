import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CircularChart = ({ value,color}) => {
  const accuracy = Math.max(1, Math.min(value, 100));

  const data = {
    datasets: [
      {
        data: [accuracy, 100 - accuracy],
        backgroundColor: [color, '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Accuracy: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '120px', height: '120px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CircularChart;

// VerticalBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const HorizontalBarChart = ({ value, color }) => {
  const normalizedValue = Math.max(1, Math.min(value, 10));

  const data = {
    labels: ['Value'],
    datasets: [
      {
        label: 'Value',
        data: [normalizedValue],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        min: 0,
        max: 10,
        stacked: true
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2">
      <div className="h-54 sm:h-75 md:h-90 lg:h-100 xl:h-120">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;


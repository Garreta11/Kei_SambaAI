'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const Graph = ({ dataset }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines on x-axis
        },
        ticks: {
          display: true, // Remove labels on x-axis
        },
      },
      y: {
        grid: {
          display: false, // Remove gridlines on y-axis
        },
        ticks: {
          display: false, // Remove labels on y-axis
        },
        min: 0, // Force y-axis to start at 0
        //suggestedMax: 100, // Optional: you can set a max value if you want
      },
    },
  };

  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: 'First dataset',
        data: dataset.data,
        fill: true,
        radius: 0,
        showLine: false,
        backgroundColor: (context) => {
          const bgColor = ['rgba(235, 210, 222, 1)', 'rgba(255, 0, 255, 0)'];
          if (!context.chart.chartArea) return;
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Graph;

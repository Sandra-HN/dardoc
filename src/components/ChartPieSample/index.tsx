import React from 'react';
import { Chart, Tooltip, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(Tooltip, ArcElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ChartPieSample = ({ data }) => {
  return <Pie options={options} data={data} className="h-60 w-full" />;
};

export default ChartPieSample;

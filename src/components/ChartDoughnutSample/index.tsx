import { ArcElement, Chart, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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

const ChartDoughnutSample = ({ data }) => {
  return <Doughnut options={options} data={data} className="h-60 w-full" />;
};

export default ChartDoughnutSample;

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ILineChartProps {
	label: string;
	labels: string[];
	data: any[];
}

const LineChart: React.FC<ILineChartProps> = props => (
	<div>
		<Line
			options={{
				responsive: true,
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
			data={{
				labels: props.labels,
				datasets: [
					{
						label: props.label,
						data: props.data,
						borderColor: 'rgb(255, 99, 132)',
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
					},
				],
			}}
		/>
	</div>
);

export default LineChart;

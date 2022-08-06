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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

interface IBarChartProps {
	labels: string[];
	label: string;
	data: any[];
}

const BarChart: React.FunctionComponent<IBarChartProps> = props => (
	<div>
		<Bar
			options={options}
			data={{
				labels: props.labels,
				datasets: [
					{
						label: props.label,
						data: props.data,
						backgroundColor: 'rgba(0, 147, 245, 0.856)',
					},
				],
			}}
		/>
	</div>
);

export default BarChart;

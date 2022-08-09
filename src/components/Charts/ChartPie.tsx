import { faker } from '@faker-js/faker';
import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getRandomColor } from '@/utils/randomColors';
ChartJS.register(ArcElement, Tooltip, Legend);

/* const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
}; */

export const USERS: Array<{
	userId: any;
	username: any;
	email: any;
	avatar: any;
	password: any;
	birthdate: any;
	registeredAt: any;
}> = [];

export function createRandomUser() {
	return {
		userId: faker.datatype.uuid(),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		avatar: faker.image.avatar(),
		password: faker.internet.password(),
		birthdate: faker.date.birthdate(),
		registeredAt: faker.date.past(),
	};
}

Array.from({ length: 10 }).forEach(() => {
	USERS.push(createRandomUser());
});

interface IAppProps {
	label: string;
	data: number[];
	labels: string[];
}

const ChartPie: React.FC<IAppProps> = props => (
	<div>
		<Doughnut
			data={{
				//@ts-ignore
				labels: props.labels,
				datasets: [
					{
						label: props.label,
						data: props.data,
						backgroundColor: props.data.map(() =>
							getRandomColor()
						),
						borderWidth: 1,
					},
				],
			}}
			width={300}
			height={300}
			options={{
				maintainAspectRatio: false,
				responsive: true,
			}}
		/>
	</div>
);

export default ChartPie;

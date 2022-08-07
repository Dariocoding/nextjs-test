import * as React from 'react';
import { SearchDatePicker, Tile } from '../@common';
import BarChart from '../Charts/BarChart';
import { USERS } from '../Charts/ChartPie';

interface IBarChartUsuariosProps {}

// eslint-disable-next-line
const BarChartUsuarios: React.FunctionComponent<IBarChartUsuariosProps> = props => {
	const [dateSelected, setDateSelected] = React.useState(new Date());

	async function handleChangeDate(date: Date) {
		setDateSelected(date);

		/* 		const year = date.getFullYear();
		const month = date.getMonth() + 1;

		try {
			const url = tipoPagoConfig.endpoints.findTiposPagoByCohorteActualMes(
				year,
				month
			);
			const request = await clienteAxios.get(url);

			setDataChartMetodosPago(request.data);
		} catch (error) {
			console.log(error);
		} */
	}

	return (
		<Tile headerColor="var(--secondary-color)">
			<SearchDatePicker
				selected={dateSelected}
				onChange={handleChangeDate}
				dateFormat="yyyy"
				showYearDropdown
				showYearPicker
			/>
			<BarChart
				data={USERS.map(u => u.birthdate)}
				labels={USERS.map(u => u.username)}
				label={'Test'}
			/>
		</Tile>
	);
};

export default BarChartUsuarios;

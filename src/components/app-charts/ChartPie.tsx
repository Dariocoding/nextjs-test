import * as React from 'react';
import { SearchDatePicker, Tile } from '../@common';
import ChartPie, { USERS } from '../Charts/ChartPie';

interface IChartPieUsuariosProps {}

// eslint-disable-next-line
const ChartPieUsuarios: React.FunctionComponent<IChartPieUsuariosProps> = props => {
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
		<Tile headerColor="var(--primary-color)">
			<h1 className="text-center text-xl font-semibold">Usuarios Registrados</h1>
			<SearchDatePicker
				selected={dateSelected}
				onChange={handleChangeDate}
				dateFormat="MM/yyyy"
				showMonthYearPicker
				showFullMonthYearPicker
				showFourColumnMonthYearPicker
			/>
			<ChartPie
				label="Usuarios Registrados"
				data={USERS.map(() => Math.random() * 11)}
				labels={USERS.map(u => u.username)}
			/>
		</Tile>
	);
};

export default ChartPieUsuarios;

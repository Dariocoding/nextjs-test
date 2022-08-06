import * as React from 'react';
import clienteAxios from '../../../config/axios';
import { StatusCard } from '../../@common';
import ChartPieUsuarios from '../../app-charts/ChartPie';
import BarChartUsuarios from '../../app-charts/BarChart';
import { usersConfig } from '../../../config/users';
import { pagosConfig } from '../../../config/pagos';
import DashboardLoader from '../../@placeholders/DashboardPlaceholder';
import { tipoPagoConfig } from '../../../config/tipospago';
import TablePagoDashboardAdmin from './TblPagos';
import TableUsuariosDashboardAdmin from './TblUsuarios';
import LineChartUsuarios from '../../app-charts/LineChart';
import NextHead from '../../@common/next-head';

const today = new Date();
const yearActual = today.getFullYear();
const mesActual = today.getMonth() + 1;

const DashboardAdministrador = () => {
	const [totalUsuarios, setTotalUsuarios] = React.useState(0);
	const [totalAdministradores, setTotalAdministradores] = React.useState(0);
	const [totalPagos, setTotalPagos] = React.useState(0);
	const [dataChartMetodosPago, setDataChartMetodosPago] = React.useState({});
	const [dataLineVentasMes, setDataLineVentasMes] = React.useState({});
	const [dataVentasYear, setDataVentasYear] = React.useState({});
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function getDatos() {
			const urlTotalAdministradores = usersConfig.administrador.endpoints.count;
			const urlTotalUsuarios = usersConfig.usuarios.endpoints.count;
			const urlTotalPagos = pagosConfig.endpoints.getCountPagos;
			const urlTiposPagoByCohorteActualMes =
				tipoPagoConfig.endpoints.findTiposPagoByMes(yearActual, mesActual);
			const urlVentasMes = pagosConfig.endpoints.findVentasMesCohorteActual(
				yearActual,
				mesActual
			);

			const urlVentasAnio =
				pagosConfig.endpoints.findVentasAnioCohorteActual(yearActual);

			const [
				responseTotalAdministradores,
				responseTotalUsuarios,
				responseTotalPagos,
				responseTiposPagoMes,
				responseVentasMes,
				responseVentasYear,
			] = await Promise.all([
				// WIDGETS
				clienteAxios(urlTotalAdministradores),
				clienteAxios(urlTotalUsuarios),
				clienteAxios(urlTotalPagos),
				clienteAxios(urlTiposPagoByCohorteActualMes),
				clienteAxios(urlVentasMes),
				clienteAxios(urlVentasAnio),
			]);

			setTotalAdministradores(responseTotalAdministradores.data.total);
			setTotalUsuarios(responseTotalUsuarios.data.total);
			setTotalPagos(responseTotalPagos.data.total);
			setDataChartMetodosPago(responseTiposPagoMes.data);
			setDataLineVentasMes(responseVentasMes.data);
			setDataVentasYear(responseVentasYear.data);
			setLoading(false);
		}

		getDatos();
		// eslint-disable-next-line
	}, []);

	if (loading) return <DashboardLoader />;

	return (
		<React.Fragment>
			<NextHead
				title={'Dashboard Administrador'}
				description={'Dashboard Administrador'}
			/>
			<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
				<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
					<StatusCard
						to={'/usuarios'}
						Icon={usersConfig.administrador.Icon}
						title={usersConfig.administrador.upperCasePlural}
						count={totalAdministradores}
						hoverBackgroundColor={'#00b894'}
					/>
					<StatusCard
						to={'/usuarios'}
						Icon={usersConfig.usuarios.Icon}
						title={usersConfig.usuarios.upperCasePlural}
						count={totalUsuarios}
						hoverBackgroundColor={'#1d4ed8'}
					/>
					<StatusCard
						to={'/pagos'}
						Icon={pagosConfig.Icon}
						title={'Pagos'}
						count={totalPagos}
						hoverBackgroundColor={'#00cec9'}
					/>
				</div>
				<ChartPieUsuarios />
			</div>
			<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 md:gap-12 mb-8">
				<TableUsuariosDashboardAdmin />
				<div className="col-span-2">
					<TablePagoDashboardAdmin />
				</div>
			</div>
			<LineChartUsuarios />
			<BarChartUsuarios />
		</React.Fragment>
	);
};

export default DashboardAdministrador;

import * as React from 'react';
import { FaHome } from 'react-icons/fa';
import PageContentAdmin from '../components/layout-dashboard/PageContent';
import { NextPage } from 'next';
import { useAuthContext } from '../context/AuthState';
import { RADMIN, RUSUARIO } from '../utils';
import DashboardAdministrador from '../components/app-dashboards/DashboardAdmin';
import DashboardEstudiante from '../components/app-dashboards/DashboardEstudiante';

const Dashboard: NextPage = () => {
	const { usuario } = useAuthContext();
	return (
		<PageContentAdmin
			Icon={FaHome}
			titulo={'Dashboard'}
			descripcion={'Bienvenido a TUCRM'}
		>
			{usuario.rol?.idrol === RADMIN && <DashboardAdministrador />}

			{usuario.rol?.idrol === RUSUARIO && <DashboardEstudiante />}
		</PageContentAdmin>
	);
};

Dashboard;

export default Dashboard;

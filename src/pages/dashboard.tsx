import * as React from 'react';
import { NextPage } from 'next';
import { useAuthContext } from '../context/AuthState';
import dynamic from 'next/dynamic';
import DashboardLoader from '@/components/@placeholders/DashboardPlaceholder';
import { RADMIN, RUSUARIO } from '@/utils/consts';
import { FaTachometerAlt } from 'react-icons/fa';

const PageContentAdmin = dynamic(() => import('../components/layout-dashboard/PageContent'), {
	ssr: false,
});

const DashboardAdministrador = dynamic(
	() => import('../components/app-dashboards/DashboardAdmin'),
	{
		ssr: false,
		loading: () => <DashboardLoader />,
	}
);

const DashboardEstudiante = dynamic(() => import('../components/app-dashboards/DashboardUsuario'), {
	ssr: false,
});

const Dashboard: NextPage = () => {
	const { usuario } = useAuthContext();
	return (
		<PageContentAdmin
			Icon={FaTachometerAlt}
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

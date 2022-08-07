import * as React from 'react';
import { pagosConfig } from '../../config/pagos';
import { NextPage } from 'next';
import NextHead from '../../components/@common/next-head';
import { useAuthContext } from '../../context/AuthState';
import { RADMIN, RUSUARIO } from '../../utils';
import dynamic from 'next/dynamic';
import TitleAdminPlaceholder from '@/components/@placeholders/TitleAdminPlaceholder';
import TableLoader from '@/components/@placeholders/DataTablePlaceholder';

const PageContentAdmin = dynamic(() => import('../../components/layout-dashboard/PageContent'), {
	ssr: false,
	loading: () => <TitleAdminPlaceholder />,
});

const DataTablePagos = dynamic(() => import('../../components/app-datatables/TablePagos'), {
	ssr: false,
	loading: () => <TableLoader />,
});

const Pagos: NextPage = () => {
	const { usuario } = useAuthContext();

	let description = '';

	if (usuario.rol?.idrol === RADMIN) description = 'Pagos del sistema';

	if (usuario.rol?.idrol === RUSUARIO) description = 'Pagos realizados';

	return (
		<PageContentAdmin
			Icon={pagosConfig.Icon}
			titulo={'Pagos'}
			btnBackText={'Ir a Dashboard'}
			btnBackUrl={'/dashboard'}
			descripcion={description}
		>
			<NextHead title={'Pagos'} description={description} />
			<DataTablePagos urlRequest={pagosConfig.endpoints.getAll} />
		</PageContentAdmin>
	);
};

export default Pagos;

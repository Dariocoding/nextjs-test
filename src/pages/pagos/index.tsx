import * as React from 'react';
import { pagosConfig } from '../../config/pagos';
import PageContentAdmin from '../../components/layout-dashboard/PageContent';
import DataTablePagos from '../../components/app-datatables/TablePagos';
import { NextPage } from 'next';
import NextHead from '../../components/@common/next-head';
import { useAuthContext } from '../../context/AuthState';
import { RADMIN, RUSUARIO } from '../../utils';

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

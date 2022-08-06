import * as React from 'react';
import { tipoPagoConfig } from '../../config/tipospago';
import PageContentAdmin from '../../components/layout-dashboard/PageContent';
import TableTiposPago from '../../components/app-datatables/TableTipoPagos';
import { NextPage } from 'next';
import NextHead from '../../components/@common/next-head';
import useValidarPermisosPagina from '../../hooks/useValidarPermisosPagina';
import { RADMIN } from '../../utils';

const TiposPago: NextPage = props => {
	useValidarPermisosPagina({ rolesPermisos: [RADMIN], urlReturn: '/dashboard' });
	return (
		<PageContentAdmin
			Icon={tipoPagoConfig.Icon}
			titulo={'Tipos Pago'}
			descripcion={'Tipos pago del sistema'}
			breadCrumb={[
				{ titulo: 'Settings', link: '/settings' },
				{ titulo: 'Tipos Pago' },
			]}
			btnBackText={'Ir a Configuración'}
			btnBackUrl={'/settings'}
		>
			<NextHead title={'Tipos Pago'} description={'Tipos pago del sistema'} />
			<TableTiposPago />
		</PageContentAdmin>
	);
};

export default TiposPago;

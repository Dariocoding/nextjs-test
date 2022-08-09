import * as React from 'react';
import { tipoPagoConfig } from '../../config/tipospago';
import NextHead from '../../components/@common/next-head';
import useValidarPermisosPagina from '../../hooks/useValidarPermisosPagina';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import TableLoader from '@/components/@placeholders/DataTablePlaceholder';
import { RADMIN } from '@/utils/consts';

const PageContentAdmin = dynamic(() => import('../../components/layout-dashboard/PageContent'), {
	ssr: false,
});

const TableTiposPago = dynamic(() => import('../../components/app-datatables/TableTipoPagos'), {
	ssr: false,
	loading: () => <TableLoader />,
});

const TiposPago: NextPage = () => {
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

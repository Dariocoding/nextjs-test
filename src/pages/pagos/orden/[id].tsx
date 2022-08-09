import { Button } from '@/components/@common/Buttons';
import { NextLink } from '@/components/@common/Link';
import { Tile } from '@/components/@common/Tile';
import { FaArrowLeft } from '@/components/Icons/fa/arrows/FaArrowLeft';
import { FaBox } from '@/components/Icons/fa/FaBox';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';
import Tile404 from '../../../components/@common/404Tile';
import NextHead from '../../../components/@common/next-head';
import DashboardLoader from '../../../components/@placeholders/DashboardPlaceholder';
import { pagosConfig } from '../../../config/pagos';
import { PagoType } from '../../../config/pagos/interfaces';
import useFetch from '../../../hooks/useFetch';

const PageContentAdmin = dynamic(() => import('../../../components/layout-dashboard/PageContent'), {
	ssr: false,
});

const InvoicePago = dynamic(() => import('../../../components/app-invoices/InvoicePago'), {
	ssr: false,
});

const Orden: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, loading } = useFetch<PagoType>(pagosConfig.endpoints.getOne(id), null);

	if (loading) return <DashboardLoader />;

	if (!data)
		return (
			<Tile404>
				<h1 className="text-center text-5xl font-bold  text-danger">
					Error 404
				</h1>
				<h4 className="text-center text-2xl mb-4">
					No se ha encontrado ninguna orden
				</h4>
				<div className="flex justify-center">
					<NextLink href={'/pagos'}>
						<Button
							variant="success"
							className="animate-bounce-left"
							large
						>
							<FaArrowLeft className="mr-1" /> Ir a Pagos
						</Button>
					</NextLink>
				</div>
			</Tile404>
		);

	return (
		<PageContentAdmin
			Icon={FaBox}
			titulo={'Orden'}
			descripcion={'Descripción del producto'}
			breadCrumb={[{ titulo: 'Pagos', link: '/pagos' }, { titulo: 'Orden' }]}
			btnBackText={'Ir a Pagos'}
			btnBackUrl={'/pagos'}
		>
			<NextHead
				title={`Orden - ${id}`}
				description={`Información de la orden - ${id}`}
			/>
			<Tile>
				<InvoicePago pago={data} />
			</Tile>
		</PageContentAdmin>
	);
};

export default Orden;

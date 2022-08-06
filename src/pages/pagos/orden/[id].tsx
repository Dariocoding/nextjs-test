import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaArrowLeft, FaBox } from 'react-icons/fa';
import { Button, NextLink, Tile } from '../../../components/@common';
import Tile404 from '../../../components/@common/404Tile';
import NextHead from '../../../components/@common/next-head';
import DashboardLoader from '../../../components/@placeholders/DashboardPlaceholder';
import InvoicePago from '../../../components/app-invoices/InvoicePago';
import PageContentAdmin from '../../../components/layout-dashboard/PageContent';
import { pagosConfig } from '../../../config/pagos';
import { PagoType } from '../../../config/pagos/interfaces';
import useFetch from '../../../hooks/useFetch';

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
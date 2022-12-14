import * as React from 'react';
import FormUpdateConfig from '../../components/@forms-app/config-update';
import CardSetting from '../../components/@common/settings-card';
import { tipoPagoConfig } from '../../config/tipospago';
import { NextPage } from 'next';
import NextHead from '../../components/@common/next-head';
import useValidarPermisosPagina from '../../hooks/useValidarPermisosPagina';
import dynamic from 'next/dynamic';
import { Tile } from '@/components/@common/Tile';
import { RADMIN } from '@/utils/consts';
import { FaCogs } from 'react-icons/fa';

const PageContentAdmin = dynamic(() => import('../../components/layout-dashboard/PageContent'), {
	ssr: false,
});

const Settings: NextPage = () => {
	useValidarPermisosPagina({ urlReturn: '/dashboard', rolesPermisos: [RADMIN] });
	return (
		<PageContentAdmin
			Icon={FaCogs}
			titulo={'Configuración'}
			btnBackText={'Ir a Dashboard'}
			btnBackUrl={'/dashboard'}
			descripcion={'Configuraciones del sistema'}
			breadCrumb={[{ titulo: 'Settings' }]}
		>
			<NextHead
				title={'Configuración'}
				description={'Configuración del sistemas'}
			/>
			<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 lg:gap-16 mb-8">
				<Tile>
					<h4 className="text-center text-xl font-medium flex space-x-2 justify-center items-center mb-2">
						<span>Configuración General</span> <FaCogs />
					</h4>
					<FormUpdateConfig />
				</Tile>
				<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 col-span-2 gap-8">
					<div>
						<CardSetting
							color="primary"
							Icon={tipoPagoConfig.Icon}
							titulo={'Tipos Pago'}
							link={'/settings/tipos-pago'}
							description={
								'¡Empieza añadiendo tipos pago para tu sistema!'
							}
						/>
					</div>
				</div>
			</div>
		</PageContentAdmin>
	);
};

export default Settings;

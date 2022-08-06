import { NextPage } from 'next';
import * as React from 'react';
import { Tab, TabSet } from '../../components/@common';
import NextHead from '../../components/@common/next-head';
import TableLoader from '../../components/@placeholders/DataTablePlaceholder';
import DataTableUsuario from '../../components/app-datatables/TableUsuarios';
import PageContentAdmin from '../../components/layout-dashboard/PageContent';
import { usersConfig } from '../../config/users';
import { UserConfigInterface } from '../../config/users/interfaces';
import useValidarPermisosPagina from '../../hooks/useValidarPermisosPagina';
import { RADMIN } from '../../utils';

const Usuarios: NextPage = () => {
	useValidarPermisosPagina({ rolesPermisos: [RADMIN], urlReturn: '/dashboard' });
	const [userConfigActual, setUserConfigActual] = React.useState('administrador');
	const keys = Object.keys(usersConfig).filter(u => u !== 'endpoints');
	const configuracion = usersConfig[userConfigActual] as UserConfigInterface;

	return (
		<PageContentAdmin
			Icon={configuracion.Icon}
			titulo={configuracion.upperCasePlural}
			fallback={<TableLoader />}
			descripcion={'Usuarios del sistema'}
			breadCrumb={[{ titulo: 'Usuarios' }]}
			btnBackText={'Ir a Dashboard'}
			btnBackUrl={'/dashboard'}
		>
			<NextHead
				title={configuracion.upperCasePlural}
				description={`${configuracion.upperCasePlural} del sistemas`}
			/>
			<DataTableUsuario
				urlRequest={configuracion.endpoints.getAll}
				userConfig={configuracion}
				titulo={
					<TabSet
						activeTabName={userConfigActual}
						onSelect={setUserConfigActual}
						className={'mb-6'}
					>
						{keys.map(k => {
							const config = usersConfig[
								k
							] as UserConfigInterface;
							return (
								<Tab value={k} key={k}>
									<span className="flex items-center">
										<config.Icon className="mr-1" />{' '}
										{
											config.upperCasePlural
										}
									</span>
								</Tab>
							);
						})}
					</TabSet>
				}
			/>
		</PageContentAdmin>
	);
};

export default Usuarios;

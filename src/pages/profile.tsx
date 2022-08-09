import * as React from 'react';
import FormChangePaswword from '../components/@forms-app/user-change-password';
import FormPerfilUser from '../components/@forms-app/user-perfil';
import ProfileLoader from '../components/@placeholders/ProfileLoader';
import { useAuthContext } from '../context/AuthState';
import { usersConfig } from '../config/users';
import { NextPage } from 'next';
import NextHead from '../components/@common/next-head';
import { Tab, TabSet } from '@/components/@common/Tabs';
import { Tile } from '@/components/@common/Tile';
import { FaCogs } from '@/components/Icons/fa/FaCogs';
import { FaUserCircle } from '@/components/Icons/fa/users/FaUserCircle';
import { FaLock } from '@/components/Icons/fa/FaLock';
import dynamic from 'next/dynamic';
import TitleAdminPlaceholder from '@/components/@placeholders/TitleAdminPlaceholder';

const PageContentAdmin = dynamic(() => import('../components/layout-dashboard/PageContent'), {
	ssr: false,
});

const PhotoProfile = dynamic(() => import('../components/@forms-app/user-perfil-photo'), {
	ssr: false,
	loading: () => <TitleAdminPlaceholder />,
});

const Profile: NextPage = () => {
	const [selected, setSelected] = React.useState('configuracion');
	const { usuario } = useAuthContext();

	return (
		<PageContentAdmin showTitle={false} fallback={<ProfileLoader />} paddingX={false}>
			<NextHead title={'Perfil'} description={'Perfil del usuario'} />
			<div className="flex justify-center items-end h-32 bg-slate-300 relative bg-banner-profile bg-cover mb-10">
				<PhotoProfile />
			</div>

			<div className="h-full bg-slate-300 transition">
				<h3 className="text-center text-3xl">
					{usuario.nombres} {usuario.apellidos}
				</h3>
				<h5 className="text-center  text-xl">{usuario.rol?.nombrerol}</h5>

				<div className="px-7 mb-5 mt-3">
					<TabSet activeTabName={selected} onSelect={setSelected}>
						<Tab value={'configuracion'}>
							<span className="flex items-center">
								<FaCogs className="mr-1" />
								Configuración
							</span>
						</Tab>
					</TabSet>
				</div>

				<div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-2 gap-12 mb-8 px-7">
					{selected === 'configuracion' ? (
						<React.Fragment>
							<Tile>
								<h3 className="text-center flex m-auto items-center space-x-3 justify-center text-xl">
									<span>
										Datos Personales
									</span>{' '}
									<FaUserCircle />
								</h3>

								<FormPerfilUser
									url={
										usersConfig
											.endpoints
											.putPerfil
									}
									method={'put'}
									user={usuario}
									reautenticar
								/>
							</Tile>
							<Tile>
								<h3 className="text-center flex m-auto items-center space-x-3 justify-center text-xl mb-4">
									<span>
										Cambiar contraseña
									</span>{' '}
									<FaLock />
								</h3>
								<FormChangePaswword
									url={
										usersConfig
											.endpoints
											.changePasswordPerfil
									}
								/>
							</Tile>
						</React.Fragment>
					) : null}
				</div>
			</div>
		</PageContentAdmin>
	);
};

export default Profile;

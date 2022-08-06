import * as React from 'react';
import { FaCogs, FaLock, FaUserCircle } from 'react-icons/fa';
import { Tab, TabSet, Tile } from '../components/@common';
import FormChangePaswword from '../components/@forms-app/user-change-password';
import FormPerfilUser from '../components/@forms-app/user-perfil';
import ProfileLoader from '../components/@placeholders/ProfileLoader';
import PrivateRoute from '../components/routes/PrivateRoute';
import { useAuthContext } from '../context/AuthState';
import { usersConfig } from '../config/users';
import PhotoProfile from '../components/@forms-app/user-perfil-photo';
import { NextPage } from 'next';
import NextHead from '../components/@common/next-head';

const Profile: NextPage = () => {
	const [selected, setSelected] = React.useState('configuracion');
	const { usuario } = useAuthContext();

	return (
		<PrivateRoute fallback={<ProfileLoader />}>
			<NextHead title={'Perfil'} description={'Perfil del usuario'} />
			<main className="py-4">
				<div className="flex justify-center items-end h-32 bg-slate-300 dark:bg-slate-700 relative bg-banner-profile bg-cover mb-10">
					<PhotoProfile />
				</div>

				<div className="h-full bg-slate-300 dark:bg-slate-900 transition">
					<h3 className="text-center text-3xl">
						{usuario.nombres} {usuario.apellidos}
					</h3>
					<h5 className="text-center  text-xl">
						{usuario.rol?.nombrerol}
					</h5>

					<div className="px-7 mb-5 mt-3">
						<TabSet
							activeTabName={selected}
							onSelect={setSelected}
						>
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
											Datos
											Personales
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
											Cambiar
											contraseña
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
			</main>
		</PrivateRoute>
	);
};

export default Profile;

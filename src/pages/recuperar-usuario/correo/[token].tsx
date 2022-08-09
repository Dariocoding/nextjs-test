import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import Header from '../../../components/Header';
import LandingAuth from '../../../components/landing-auth';
import clienteAxios from '../../../config/axios';
import { usersConfig } from '../../../config/users';
import Swal from 'sweetalert2';
import validarPasswordUser from '../../../components/@forms-app/user-change-password/validation';
import { UserType } from '../../../config/users/interfaces';
import { InputFormik } from '@/components/@forms/Input';
import { ButtonFormik } from '@/components/@forms/Button';
import { FotoPerfilUser } from '@/utils/foto-perfil';
import { handleError } from '@/utils/handleError';
import { FaLock, FaUnlock } from 'react-icons/fa';

interface IRecuperarUsuarioProps {
	user: UserType;
	token: string | string[];
	correo: string | string[];
}

const RecuperarUsuario: NextPage<IRecuperarUsuarioProps> = props => {
	const router = useRouter();
	const { user } = props;
	const INITIAL_VALUES = {
		iduser: user?.iduser,
		password: '',
		passwordConfirm: '',
		email_user: props.correo,
		token: props.token,
	};

	async function cambiarPassword(values: typeof INITIAL_VALUES) {
		try {
			const url = usersConfig.endpoints.recoverPass;
			const response = await clienteAxios.put(url, values);
			Swal.fire(response.data.msg, '', 'success');
			router.push('/');
		} catch (error) {
			handleError(error, true);
		}
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<LandingAuth
				titulo={
					<React.Fragment>
						<span className="flex items-center justify-center tracking-wider">
							Recuperar contraseña{' '}
							<FaLock className="ml-1" />
						</span>

						<div className="mt-4">
							<div>
								<FotoPerfilUser
									user={user}
									width={50}
									height={50}
								/>
							</div>

							<span>
								{user?.nombres} {user?.apellidos}
							</span>
						</div>
					</React.Fragment>
				}
				descriptionTitle={'Bienvenido a TUCRM'}
				descriptionParagraph={<span>- El mejor CRM jamás hecho</span>}
				background={'hero'}
			>
				<Formik
					onSubmit={cambiarPassword}
					initialValues={INITIAL_VALUES}
					validate={validarPasswordUser}
				>
					<Form>
						<InputFormik
							label="Contraseña"
							type="password"
							name="password"
							placeholder="Ingrese la nueva Contraseña"
							autoFocus
						/>

						<InputFormik
							label="Confirmar Contraseña"
							type="password"
							name="passwordConfirm"
							placeholder="Confirme la Contraseña"
						/>

						<ButtonFormik large>
							Recuperar contraseña{' '}
							<FaUnlock className="ml-1" />
						</ButtonFormik>
					</Form>
				</Formik>
			</LandingAuth>
		</div>
	);
};

export default RecuperarUsuario;

RecuperarUsuario.getInitialProps = async context => {
	const { query, res } = context;
	try {
		const { correo, token } = query;
		const url = usersConfig.endpoints.verificarUsuarioCorreoAndToken({ token, correo });
		const req = await clienteAxios(url);
		const usuario = req.data.usuario;

		if (!usuario) res.writeHead(301, { location: '/' }).end();

		return { user: usuario, correo, token };
	} catch (error) {
		res.writeHead(301, { location: '/' }).end();
	}
};

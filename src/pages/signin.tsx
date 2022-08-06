import { Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FaGithub, FaGoogle, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { NextLink } from '../components/@common';
import { ButtonFormik, InputFormik } from '../components/@forms';
import FormOlvidarPassword from '../components/@forms-app/auth-olvidar-password';
import Header from '../components/Header';
import LandingAuth from '../components/landing-auth';
import { authConfig } from '../config/auth';
import clienteAxios from '../config/axios';
import { useAuthContext } from '../context/AuthState';
import { useModal } from '../context/ModalState';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import { handleError } from '../utils';

const SignIn: NextPage = () => {
	const { usuarioAutenticado } = useAuthContext();
	const { setModal } = useModal();
	const router = useRouter();
	const INITIAL_VALUES = { username: '', password: '' };

	const onSubmit = async (data: typeof INITIAL_VALUES) => {
		try {
			if (data.username.trim() === '') {
				return toast.error('Por favor introduce un nombre de usuario');
			}
			if (data.password.trim() === '') {
				return toast.error('Por favor introduce una contraseña...');
			}
			const req = await clienteAxios.post(authConfig.endpoints.signin, data);
			localStorage.setItem('at', req.data.access_token);
			localStorage.setItem('rt', req.data.refresh_token);
			await usuarioAutenticado();
			router.push('/');
		} catch (error) {
			handleError(error, true);
		}
	};

	const handleOlvidarPassword = () => {
		setModal({
			size: 'sm',
			content: <FormOlvidarPassword />,
			titulo: 'Recuperar contraseña',
		});
	};

	useIsAuthenticated();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<LandingAuth
				titulo={
					<span className="flex items-center justify-center">
						Inicio de Sesión <FaUserCircle className="ml-1" />
					</span>
				}
				descriptionTitle={'Bienvenido a TUCRM'}
				descriptionParagraph={<span>- El mejor CRM jamás hecho</span>}
				background={'hero'}
			>
				<Formik onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
					<Form>
						<InputFormik
							name="username"
							placeholder="Ingresa el correo"
							label="Correo"
						/>
						<InputFormik
							type={'password'}
							name="password"
							label="Contraseña"
							placeholder="Ingrese la contraseña"
							labelEnd={
								<span
									onClick={
										handleOlvidarPassword
									}
									className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
								>
									¿Olvidaste la contraseña?
								</span>
							}
						/>

						<ButtonFormik large className="mt-6">
							Iniciar Sesión
						</ButtonFormik>

						<div className="text-gray-600 dark:text-gray-300 text-center mt-6 text-lg">
							¿Todavía no posees una cuenta?{' '}
							<NextLink
								href="/signup"
								className="text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300 transition duration-150 ease-in-out"
							>
								Registrarse
							</NextLink>
						</div>

						<div className="flex flex-wrap -mx-3 my-3">
							<div className="w-full px-3">
								<button
									type="button"
									className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center"
								>
									<FaGithub />
									<span className="flex-auto pl-16 pr-8 -ml-16">
										Continue with GitHub
									</span>
								</button>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3">
							<div className="w-full px-3">
								<button
									type="button"
									className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
								>
									<FaGoogle />
									<span className="flex-auto pl-16 pr-8 -ml-16">
										Continue with Google
									</span>
								</button>
							</div>
						</div>
					</Form>
				</Formik>
			</LandingAuth>
		</div>
	);
};

export default SignIn;

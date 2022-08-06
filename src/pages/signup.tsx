import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { NextLink } from '../components/@common';
import {
	ButtonFormik,
	InputFormik,
	PhoneInputFormik,
	SelectDefaultFormik,
} from '../components/@forms';
import { INITIAL_VALUES_USER_PROFILE } from '../components/@forms-app/user-perfil/initial-values';
import Header from '../components/Header';
import LandingAuth from '../components/landing-auth';
import { authConfig } from '../config/auth';
import clienteAxios from '../config/axios';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import { handleError, PaisesOptions, RUSUARIO } from '../utils';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserType } from '../config/users/interfaces';

const SignUp: NextPage = () => {
	const router = useRouter();
	const INITIAL_VALUES = {
		...INITIAL_VALUES_USER_PROFILE({}, RUSUARIO),
		password: '',
		passwordConfirm: '',
	};

	const onSubmit = async (data: typeof INITIAL_VALUES) => {
		try {
			const req = await clienteAxios.post(authConfig.endpoints.signup, data);
			toast.success(req.data.msg);
			Swal.fire(req.data.msg, '', 'success');
			router.push('/signin');
		} catch (error) {
			handleError(error, true);
		}
	};

	useIsAuthenticated();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<LandingAuth
				titulo={
					<span className="flex items-center justify-center tracking-wider">
						Registro
					</span>
				}
				descriptionTitle={'Bienvenido a TUCRM'}
				descriptionParagraph={<span>- El mejor CRM jamás hecho</span>}
				background={'hero'}
			>
				<Formik
					onSubmit={onSubmit}
					initialValues={INITIAL_VALUES}
					validate={valores => {
						let errores: UserType = {};

						if (valores.password?.trim() === '') {
							errores.password =
								'La contraseña no puede ir vacía';
						}

						if (!valores.nombres) {
							errores.nombres =
								'El nombre es obligatorio';
						}

						if (!valores.apellidos) {
							errores.apellidos =
								'El apellido es obligatorio';
						}

						if (!valores.email_user) {
							errores.email_user =
								'El correo es obligatorio';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
								valores.email_user.trim()
							)
						) {
							errores.email_user = 'Email no válido';
						}

						if (!valores.identificacion) {
							errores.identificacion =
								'La cedula es obligatoria';
						}

						if (!valores.pais) {
							errores.pais = 'El pais es obligatorio';
						}

						if (!valores.codigo_pais) {
							errores.telefono =
								'El codigo es obligatorio';
						}

						if (!valores.telefono) {
							errores.telefono =
								'El telefono es obligatorio';
						}

						if (!valores.password) {
							errores.password =
								'La contraseña es obligatoria';
						} else {
							if (
								valores.password !==
								valores.passwordConfirm
							) {
								errores.password =
									'Las contraseñas no coinciden';
							}

							if (valores.password.length < 4) {
								errores.password =
									'La contraseña debe ser mayor o igual a 5 caractéres';
							}
						}

						return errores;
					}}
				>
					<Form>
						<InputFormik
							name="identificacion"
							placeholder="Cédula"
							label="Cédula"
						/>
						<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4">
							<InputFormik
								name="nombres"
								placeholder="Ingresa su nombre"
								label="Nombres"
							/>
							<InputFormik
								name="apellidos"
								placeholder="Ingresa su apellido"
								label="Apellidos"
							/>
						</div>
						<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4">
							<InputFormik
								name="email_user"
								placeholder="Ingresa el correo"
								label="Correo"
							/>
							<InputFormik
								name="direccion"
								placeholder="Ingresa su dirección"
								label="Dirección"
							/>
						</div>
						<PhoneInputFormik
							label="Teléfono"
							nameInput="telefono"
							nameIsoCode="isoCodeCountry"
							nameSelect="codigo_pais"
							placeholder="Ingresa el telefono"
							required
						/>

						<InputFormik
							type={'password'}
							name="password"
							label="Contraseña"
							placeholder="Ingrese la contraseña"
						/>
						<InputFormik
							type={'password'}
							name="passwordConfirm"
							label="Contraseña"
							placeholder="Confirme la contraseña"
						/>

						<SelectDefaultFormik
							label="Pais"
							name="pais"
							required
						>
							<PaisesOptions />
						</SelectDefaultFormik>

						<ButtonFormik large className="mt-6">
							Registrarse
						</ButtonFormik>

						<div className="text-gray-600 dark:text-gray-300 text-center mt-6 text-lg">
							¿Ya posees una cuenta?{' '}
							<NextLink
								href="/signin"
								className="text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300 transition duration-150 ease-in-out"
							>
								Iniciar Sesión
							</NextLink>
						</div>
					</Form>
				</Formik>
			</LandingAuth>
		</div>
	);
};

export default SignUp;

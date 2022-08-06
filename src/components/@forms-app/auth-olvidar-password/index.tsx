import { Form, Formik } from 'formik';
import * as React from 'react';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { usersConfig } from '../../../config/users';
import { useModal } from '../../../context/ModalState';
import { ButtonFormik } from '../../@forms/Button';
import { InputFormik } from '../../@forms/Input';

interface IFormOlvidarPasswordProps {}

const FormOlvidarPassword: React.FC<IFormOlvidarPasswordProps> = props => {
	const { cerrarModal } = useModal();
	const INITIAL_VALUES = { email_user: '' };

	const onSubmit = async (data: typeof INITIAL_VALUES) => {
		const url = usersConfig.endpoints.recuperarPassword;
		const req = await clienteAxios.put(url, data);
		toast.success(req.data.msg);
		cerrarModal();
	};

	return (
		<Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
			<Form>
				<InputFormik
					name="email_user"
					placeholder="Introduzca su correo"
					label={'Correo'}
				/>

				<ButtonFormik>
					Recuperar Contraseña <FaLock className="ml-1" />
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormOlvidarPassword;

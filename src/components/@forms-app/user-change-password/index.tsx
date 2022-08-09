import { ButtonFormik } from '@/components/@forms/Button';
import { InputFormik } from '@/components/@forms/Input';
import { FaLock } from '@/components/Icons/fa/FaLock';
import { handleError } from '@/utils/handleError';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import validarPasswordUser from './validation';

interface IFormChangePaswwordProps {
	url: string;
}

const FormChangePaswword: React.FunctionComponent<IFormChangePaswwordProps> = props => {
	const INITIAL_VALUES = { password: '', passwordConfirm: '' };

	const onSubmit = async (data: typeof INITIAL_VALUES, actions: FormikHelpers<any>) => {
		try {
			const response = await clienteAxios.put(props.url, data);
			toast.success(response.data.msg);
			actions.resetForm();
		} catch (e) {
			handleError(e);
		}
	};

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={onSubmit}
			validate={validarPasswordUser}
		>
			<Form>
				<InputFormik
					type={'password'}
					name="password"
					label={'Contraseña'}
					placeholder={'Contraseña'}
				/>
				<InputFormik
					type={'password'}
					name="passwordConfirm"
					label={'Confirmar contraseña'}
					placeholder={'Confirmar contraseña'}
				/>
				<ButtonFormik>
					Actualizar contraseña <FaLock className="ml-1" />
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormChangePaswword;

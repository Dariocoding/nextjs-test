import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { SettingsConfig } from '../../../config/settings';
import { useConfigContext } from '../../../context/ConfigState';
import { handleError } from '../../../utils';
import { ButtonFormik } from '../../@forms/Button';
import { InputFormik } from '../../@forms/Input';

interface IFormUpdateConfigProps {}

const FormUpdateConfig: React.FC<IFormUpdateConfigProps> = props => {
	const { configuracion, obtenerConfiguracion } = useConfigContext();

	const INITIAL_VALUES = {
		nombre: configuracion.nombre,
		correo: configuracion.correo,
		telefono: configuracion.telefono,
		direccion: configuracion.telefono,
		web: configuracion.web,
	};

	const onSubmit = async (data: typeof INITIAL_VALUES) => {
		try {
			const req = await clienteAxios.put(SettingsConfig.endpoints.update, data);
			await obtenerConfiguracion();
			toast.success(req.data.msg);
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
			<Form>
				<InputFormik
					name="nombre"
					label={'Nombre de la app'}
					placeholder={'Nombre de la app'}
				/>
				<InputFormik
					name="correo"
					label={'Correo'}
					placeholder={'Correo'}
				/>
				<InputFormik
					name="telefono"
					label={'Teléfono'}
					placeholder={'Teléfono'}
				/>

				<InputFormik
					name="direccion"
					label={'Dirección'}
					placeholder={'Dirección'}
				/>
				<InputFormik
					name="web"
					label={'Dirección Web'}
					placeholder={'Dirección Web'}
				/>

				<ButtonFormik>Actualizar Configuración</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUpdateConfig;

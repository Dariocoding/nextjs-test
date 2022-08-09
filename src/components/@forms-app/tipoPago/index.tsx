import { handleError } from '@/utils/handleError';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { TipoPagoType } from '../../../config/tipospago/interfaces';
import { useLoader } from '../../../context/LoaderPageState';
import { ButtonFormik } from '../../@forms/Button';
import { CheckboxToggleFormik } from '../../@forms/checkbox-toggle';
import { InputFormik } from '../../@forms/Input';
import validarMetodosPago from './validations';

interface ITipoPagoFormProps {
	tipopago: TipoPagoType;
	method: 'post' | 'put';
	url: string;
	done?(value: TipoPagoType): void;
}

const TipoPagoForm: React.FunctionComponent<ITipoPagoFormProps> = props => {
	const { setLoader } = useLoader();
	const { tipopago } = props;

	const INITIAL_VALUES = {
		nombre: tipopago.nombre ? tipopago.nombre : '',
		titular: tipopago.titular ? tipopago.titular : '',
		telefono: tipopago.telefono ? tipopago.telefono : '',
		identificacion: tipopago.identificacion ? tipopago.identificacion : '',
		nro_cuenta: tipopago.nro_cuenta ? tipopago.nro_cuenta : '',
		correo: tipopago.correo ? tipopago.correo : '',
		showreferencia: tipopago.showreferencia ? tipopago.showreferencia : false,
	};

	const onSubmit = async (data: typeof INITIAL_VALUES) => {
		try {
			const req = await clienteAxios[props.method](props.url, data);

			toast.success(req.data.msg);

			if (props.done) props.done(req.data.tipopago);
		} catch (error) {
			handleError(error);
		} finally {
			setLoader(false);
		}
	};

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={onSubmit}
			validate={validarMetodosPago}
		>
			<Form>
				<InputFormik
					label="Método de Pago"
					name="nombre"
					placeholder="Inserte el método de pago"
					required
				/>

				<InputFormik
					label="Títular"
					name="titular"
					placeholder="Inserte el titular"
				/>

				<InputFormik
					label="Teléfono"
					name="telefono"
					placeholder="Inserte el método de pago"
				/>

				<InputFormik
					label="Identificación"
					name="identificacion"
					placeholder="Inserte la cedula o indetificación"
				/>

				<InputFormik
					label="Nro de cuenta"
					name="nro_cuenta"
					placeholder="Inserte el nro de cuenta"
				/>

				<InputFormik
					label="Correo"
					name="correo"
					placeholder="Inserte el correo"
				/>

				<CheckboxToggleFormik
					label="Esconder Referencias-Comprobante"
					name="showreferencia"
				/>
				<ButtonFormik
					variant={props.method === 'post' ? 'primary' : 'secondary'}
				>
					{props.method === 'post'
						? 'Crear Tipo Pago'
						: 'Actualizar Tipo Pago'}
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default TipoPagoForm;
